---
title: "Debugging Production: The Vanishing Email"
desc: "An automatic email worked fine locally and on sandbox. On production, the client said it wasn't sending at all."
published: 2026-07-01T14:00:00-06:00
authors:
  - Kaniel Kirby
draft: false
featured: false
---

## Situation Report

**Report:** vendor remittance emails aren't sending on production.

**Evidence:** chatter is empty. No `mail.mail` record. Looks like nothing happened.

**Also evidence:** the remittance PDF is sitting right there on the payment, attached.

These facts don't agree with each other. If nothing sent, where did the PDF come from?

## First Theory

The cron job finds eligible vendor payments, renders a remittance PDF, attaches it, and adds the email to the send queue.
 
```python
template.send_mail(payment.id, force_send=False, raise_exception=False)
payment.write({"remittance_email_sent": True})
```
 
While poking around, I noticed something. The `force_send=False` argument pushes emails to the email queue, instead of immediately sending. That means we're not marking payments after the email is sent, but after we queue the email (a subtle, but important difference).
 
Worth fixing, but it doesn't explain the chatter being empty, or the `mail.mail` record not existing at all.

## The Break

Then I noticed there was an attachment on the payment record, hidden away since it wasn't referenced in the chatter like it should be - there were 0 messages/emails. For a PDF to exist on the payment, the flow had to get pretty far - payment selected, lines resolved, PDF rendered, attachment created. That's most of the pipeline, successfully run.

That sent me into `mail.mail` internals instead of our own code. And there it was - Odoo's post-send cleanup:

```python
def _postprocess_sent_message(self, success_pids, success_emails, ...):
    # ...
    if not failure_type or failure_type in [...]:
        self.sudo().filtered(lambda mail: mail.auto_delete).unlink()
```

Mail templates have an `auto_delete` field. New templates (like our Remittance template) default to `True`. Nobody on our team knew that.

So the story flips entirely. It's not "the email didn't send." It's "the email sent successfully, and Odoo cleaned up after itself."

## Why Local Never Caught It

This is the part that actually made me laugh.

Local and sandbox don't have SMTP configured the way production does. Emails there get created and queued, but never actually go out. Which means they never reach the success path. Which means `auto_delete` never fires. Which means the `mail.mail` records, and chatter messages, just... sit there, looking perfectly healthy.

## Resolution

Two changes. First, stop deleting the emails after sending them:

```xml
<record id="mail_template_vendor_remittance" model="mail.template">
    <!-- ... -->
    <field name="auto_delete" eval="False"/>
    <!-- ... -->
</record>
```

Second, stop trusting `send_mail()` as confirmation of anything. The "sent" flag now gets written inside `_postprocess_sent_message()` itself - the actual success hook - instead of immediately after the call that merely queues the attempt. That meant tagging the mail so I could find it later (the remittance can cover a group of payments, and `send_mail` only attaches `res_id` to the first one).

## Lesson

Honestly, that's just how it goes when you use a big, prepackaged, turnkey system: The system is going to provide defaults that seem logical internally, but a naive developer couldn't possibly have guessed. Go us, I guess.
