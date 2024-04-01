---
title: 'The "Open Source" Web'
description: "I've been invested in the web development communnity for nearly 2 years now, and I was always under the impression that the web was pretty locked-down in terms of access. Here, we'll explore the open-source web that exists underneath."
date: 2024-03-29T14:00:00-06:00
image: "https://images.pexels.com/photos/12081252/pexels-photo-12081252.jpeg"
image_alt: "Photo by Markus Winkler from Pexels"
categories: ["web-scraping"]
authors: ["Kaniel Kirby"]
tags: ["apis", "web", "security", "web-scraping", "puppeteer", "cheerio", "javascript", "typescript"]
draft: false
---

## Introduction

I've been invested in the web development community for nearly 2 years now, and I was always under the impression that the web was pretty locked-down in terms of access. Here, we'll explore the open-source web that exists underneath.

## APIs

When most people think of APIs, they think of things like the OpenAI API, Google's APIs, OpenWeatherMap's APIs, all of which require authentication via API tokens. It would make sense to assume that you would require similar authentication for accessing APIs that weren't exactly meant for the user-side. Things like Instagram's API for getting images and posts, or Runbox's API for getting information about your account.

However, many of these APIs are freely accessible, with as little as a cookie for your "authenticated session". For example, Runbox's API, not publicly advertised whatsoever, can be accessed via a basic HTTPie request:

```bash
$ http https://runbox.com/api/v1/rest 'Cookie:user_session=my_cookie_not_yours!'
```

```json
{
    "status": "success",
    "result": {
        "aliases": [
            ...,
            {
                "id": 0000001,
                "uid": 0000001,
                "domainid": 0,
                "count": 1,
                "created": "Sun, 26 Feb 2023 20:30:08 +0000 (UTC)",
                "forward_to": "example@runbox.com",
                "localpart": "subdomain_here",
                "domain": "runbox.*"
            },
            ...
        ],
        "counter": {
            "total": 100,
            "current": 81
        }
    }
}
```

This also applies to sites like Discord, where their API is accessible with a simple `Authorization` header passed in from the browser:

```bash
$ http 'https://discord.com/api/v9/message?limit=50' 'Authorization:sneaky_token_here'
```

```json
[
  ...,
  {
    "id": "0000000000000000001",
    "type": 19,
    "content": "Hi",
    "channel_id": "0000000000000000001",
    "author": {},
    "attachments": [],
    "embeds": [],
    "mentions": [],
    "mention_roles": [],
    "pinned": false,
    "mention_everyone": false,
    "tts": false,
    "timestamp": "2024-03-27T14:00:00.000000+00:00",
    "edited_timestamp": null,
    "flags": 0,
    "components": [],
    "message_reference": {},
    "referenced_message": {}
  },
  ...
]
```

An absolutely massive amount of information is returned, which just speaks to how useful this could be for personal automations. Handling all of the secrets might get a bit annoying and can easily become insecure, which is why I've talked about [SOPS](/how-i-use-sops-nix-and-gopass) in the past, for securely saving secrets.

This can also help with discovering APIs you didn't know about at first. For example, the `geocode.arcgis.com/arcgis/rest` API can be used to get the latitude and longitude of an address, get weather for a location, among other things, without a single API token. I didn't find this by Googling for it, or asking ChatGPT, but by looking up weather sites, finding `weather.gov`, and seeing what API service they use under the hood via the network tab.

```bash
# Returns weather for Dallas, TX
$ http GET 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=Dallas,TX,USA&f=json'

# Returns basic layer information
$ http GET 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3?f=json'
```

## Using External Hosting

Another interesting thing is that services like Pexels allow you to directly host images from them on your website, without downloading. This means you can easily do the following for example:

```html
<img src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Cat">
```

Or for videos:

```html
<video src="https://www.youtube.com/watch?v=S_7SE_Uzk-I" controls></video>
```

While this isn't exactly "secret", it's a very useful thing to understand that these services are available to you as a developer.

## Web Scraping

Sometimes, the APIs aren't a great resource, as companies are wise to these methods, and many people take great advantage of them. When this happens, we sometimes have to resort to good ol' web scraping. So what's that?

Essentially, this involves using a library of sorts, and downloading the public webpage with an HTTP request. These are rarely guarded as securely, with the only real setback being services like Cloudflare and Google Captcha that prevent these options from being ***as*** effective.

An example of a fully-fledged application that runs like this is `ytdlp`, which essentially loads the YouTube webpage and scrapes the video off of it.

Here's a real-world example, provided by `libgen-cli` (by [Ciehanski](https://github.com/ciehanski/libgen-cli)):

```go
// Search sends a query to the search.php page hosted by gen.lib.rus.ec(or any
// similar mirror) and then provides the web page's contents provided from the
// resulting http request to the parseHashes() function to extract the specific
// hashes of matches found from the search query provided.
func Search(options *SearchOptions) ([]*Book, error) {

...

b, err := getBody(options.SearchMirror.String())
if err != nil {
    return nil, err
}

// Get hashes from raw webpage and store them in hashes
hashes := parseHashes(b, options.Results)

books, err := GetDetails(&GetDetailsOptions{
    Hashes:        hashes,
    SearchMirror:  options.SearchMirror,
    Print:         options.Print,
    RequireAuthor: options.RequireAuthor,
    Extension:     options.Extension,
    Year:          options.Year,
    Publisher:     options.Publisher,
    Language:      options.Language,
    SortBy:        options.SortBy,
})
if err != nil {
    return nil, err
}

return books, nil

...
```

All done through some simple web scraping. The API supports a lot, but doesn't support searching, so the rest of the functionalities are provided through the API, while web scraping is leaned on for this functionality.

*Side note: I know this much about the LibGen API and possibilities, because I tried implementing it myself using the old-school webpage, `libgen.is`, until realizing the awesome maintainers of LibGen offer a better website (`libgen.li`), and an updated [API](https://libgen.li/json.php), not to mention the community coming together a bit for the work on this [CLI tool and API](https://github.com/ciehanski/libgen-cli). Massive respect to all these awesome people!*

## Full-Blown Web Emulation

Web scraping is great, but this doesn't always cover all the use-cases needed by developers with complex needs. Enter: [Puppeteer](https://github.com/puppeteer/puppeteer). From their [README](https://github.com/puppeteer/puppeteer/README.md):

<blockquote>
<h4>What can I do?</h4>

Most things that you can do manually in the browser can be done using Puppeteer!
Here are a few examples to get you started:

- Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e.
  "SSR" (Server-Side Rendering)).
- Automate form submission, UI testing, keyboard input, etc.
- Create an automated testing environment using the latest JavaScript and
  browser features.
- Capture a
  [timeline trace](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
  of your site to help diagnose performance issues.
- [Test Chrome Extensions](https://pptr.dev/guides/chrome-extensions).
</blockquote>

Some awesome examples:

- [Awesome Puppeteer](https://github.com/transitive-bullshit/awesome-puppeteer):
- [URL-to-PDF](https://github.com/alvarcarto/url-to-pdf-api).

Summarized code example from [ScrapingBee](https://www.scrapingbee.com/webscraping-questions/puppeteer/how-to-take-a-screenshot-with-puppeteer/);
```js
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto('https://scrapingbee.com');
await page.screenshot({ path: `./scrapingbee_homepage.jpg` });
```

## Conclusion

I think the open nature of the web provides us developers with a lot of ***power*** that we often forget about. We can do just about ***anything*** with some time. Automate anything.

Hope this opened your mind to the possibilities of the web. Happy coding!
