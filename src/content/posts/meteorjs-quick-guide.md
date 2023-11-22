---
title: "MeteorJS Quick Guide"
description: "I've been wondering... Why use this framework over Next, Gatsby, Astro, etc.? Well, today, I'm going to do my best to find a decent answer to that question!"
date: 2023-11-22T14:00:00Z
image: "/images/posts/meteorjs-quick-guide/pexels-alex-andrews-5086477.jpg"
image_alt: "Photo by Alex Andrews: https://www.pexels.com/photo/comet-in-space-5086477/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "meteorjs", "javascript", "react", "fullstack", "framework", "web"]
draft: false
---

When researching this, I realized this is definitely an... *older* framework. Not because it's not as new or fancy as Next and Gatsby, or not as popular, but because while trying to use this framework, I realized that we can't even use modern Node. We're stuck on Node 14, which is a bit of a bummer. Sure, it's in active development, version 3 will be coming out either Q4 of 2023, or Q1 of 2024 (I hope), but I digress.

## What is MeteorJS?

With that (I think valid) complaint out of the way, there are some good things.

- We can still use React, Vue, or even Svelte.
- We have instant propogation from the database (without WebSockets).
- Database is built in, and we can use MongoDB, PostgreSQL, or MySQL (MongoDB is the default).
- Everything is JavaScript. No need to learn a new templating language, or a new language entirely.
- Mobile apps are supported through React Native or Cordova.

And, on the bright side, we have ES2015 syntax, meaning no more `var`, `require`, or `module.exports`.

<blockquote>
  "There's so much documentation though, where do I start?"
</blockquote>

Well, I'll be conducting a quick rundown on all the basics here, today.

## Table of Contents

- [Setup](#setup)
- [File Structure](#file-structure)
- [Templates](#templates)
- [Collections](#collections)
- [Routing](#routing)
- [Accounts](#accounts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

## Setup

First, we need to install MeteorJS. This is super easy, just run the following command:

```bash
curl https://install.meteor.com/ | sh
```

Or, if you're on Windows, you can download the installer from [here](https://www.meteor.com/install).

Now we can create a new React, Node, and MongoDB project with the following command:

```bash
meteor create my-app # react is the default, use --vue or --svelte if you'd like
```

## File Structure

```bash
imports/
    startup/
        client/
            index.js          # import client startup through a single entry point
            routes.js         # set up all routes in the app
            useraccounts-configuration.js # configure login templates
        server/
            fixtures.js       # fill the DB with example data on startup
            index.js          # import server startup through a single entry point

    api/
        lists/                # a unit of domain logic
            server/
                publications.js           # all list-related publications
                publications.tests.js     # tests for the list publications
            lists.js          # definition of the Lists collection
            lists.tests.js    # tests for the behavior of that collection
            methods.js        # methods related to lists
            methods.tests.js  # tests for those methods

    ui/
        components/           # all reusable components in the application
                              # can be split by domain if there are many
        layouts/              # wrapper components for behaviour and visuals
        pages/                # entry points for rendering used by the router

client/
    main.js                   # client entry point, imports all client code

server/
    main.js                   # server entry point, imports all server code
```

You'll notice that there's already a defined structure for your application, you just need to follow it.

- `imports/` is where all your application code goes.
- `server/` code will never be seen by the client, and vice versa.
- `api/` is where all your collections go.
- `ui/` is where all your templates go.
- `startup/` is specifically for code that needs to run on startup, like routes, or user accounts.

## Templates

Templates are pretty simple, and work fairly similar to Handlebars, just with a slight difference.

```html
<!-- Define a template -->
<template name="hello">
  <h1>Hello World!</h1>
</template>

<!-- Use a template -->
{{> hello}}
```

You can also pass data to a template, like so:

```html
<!-- Define a template -->
<template name="hello">
  <h1>Hello {{name}}!</h1>
</template>

<!-- Use a template -->
{{> hello name="World"}}
```

Or even reactivity:

```js
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
Template.hello.onCreated(function helloOnCreated() {
  // Create a reactive variable
  this.counter = new ReactiveVar(0);
})

// Define a helper to get the updated value within the template
Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  }
})

// Define an event handler to update the value on click
Template.hello.events({
  // this is the same as `document.querySelector('button').addEventListener('click', () => {})`
  'click button'(event, instance) {
    instance.counter.set(instance.counter.get() + 1);
  }
})
```

```html
<template name="hello">
  <button>Click Me</button>

  <!-- Use the helper here -->
  <p>You've pressed the button {{counter}} times.</p>
</template>
```

We can also use `if`, `else`, and `each` statements.

```html
<template name="hello">
  {{#if currentUser}}
    <p>Hello {{currentUser.profile.name}}!</p>
  {{else}}
    <p>Hello World!</p>
  {{/if}}
</template>

<template name="person">
  <li>
    <p>Name: {{name}}</p>
    <p>Age: {{age}}</p>
  </li>
</template>

<template name="people">
  <ul>
    {{#each people}}
      {{> person}}
    {{/each}}
  </ul>
</template>
```

Lastly, there's the `with` statement, which is similar to `each`, but only for a single item.

```html
<template name="person">
  <p>Name: {{name}}</p>
  <p>Age: {{age}}</p>
</template>

<template name="person-with">
  {{#with person}}
    {{> person}}
  {{/with}}
</template>
```

## Collections

Collections are the way we interact with the database. It's super quick to create a collection.

```js
import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

// Now we can use Tasks.find() and Tasks.insert()
const tasks = Tasks.find({
  checked: false,
}).fetch();
const task = Tasks.insert({
  text: 'Hello world!', createdAt: new Date()
});

// We can also use Tasks.update() and Tasks.remove()
Tasks.update(task._id, {
  $set: { checked: true },
});
Tasks.remove(task._id);
```

To add fields to a collection easily, we can use `SimpleSchema`.

```js
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Tasks = new Mongo.Collection('tasks');

Tasks.attachSchema(new SimpleSchema({
  text: {
    type: String,
    max: 200,
    label: 'The text of the task',
  },
  createdAt: {
    type: Date,
    label: 'The date this task was created',
  },
  checked: {
    type: Boolean,
    defaultValue: false,
    label: 'Whether this task has been checked',
  },
}));
```

Now we have a schema for our collection, which is mostly for type checking, but also for documentation.

We can combine these ideas of collections and templating to create a simple application.

```html
<template name="body">
  <!-- form to insert tasks -->
  <form class="new-task">
    <input type="text" name="text" placeholder="Type to add new tasks" />
  </form>

  <!-- list of tasks -->
  <ul>
    {{#each tasks}}
      {{> task}}
    {{/each}}
  </ul>
</template>
```

```js
import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';

Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});

Template.body.events({
  'submit .new-task'(e) {
    // Prevent default browser form submit
    e.preventDefault();

    // Get value from form element
    const target = e.target;
    const text = target.text.value;

    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    // Clear form
    target.text.value = '';
  },
});
```
Now we have a simple application that allows us to add tasks to a list, that is persisted in the database. Super simple. I think this is where MeteorJS shines. Getting a lot done fast.

## Routing

Routing in Meteor is typically either done with Iron Router, or Flow Router. I'll be using Flow Router, as it's the more modern of the two.

```bash
meteor add ostrio:flow-router-extra
```

Then we just need to define a route.
  
```js
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/lists/:_id', {
  name: 'Lists.show',
  action(params, queryParams) {
    console.log("Looking at a list?");
  }
});

// We can also get the current route
const currentRoute = FlowRouter.current();
console.log(currentRoute.path); // "/lists/123"
console.log(currentRoute.params); // { _id: "123" }
console.log(currentRoute.queryParams); // { q: "foo" }
```

## Accounts

Accounts are super easy to set up, and can be done with just a few commands.

```bash
meteor add accounts-ui
# pick one or more of the below for login options
meteor add accounts-password
meteor add accounts-facebook
meteor add accounts-google
meteor add accounts-github
meteor add accounts-twitter
meteor add accounts-meetup
meteor add accounts-meteor-developer

# if you use any of the OAuth providers, you'll need this package too
meteor add service-configuration
```
  
Then we just need to add the login buttons to our template.

```html
{{> loginButtons}}
```

Here's each one, in a quick tutorial.

<details>

  ---

  <summary>Password Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-password
  ```

  To create a new user, we can use the following:

  ```js
  import { Accounts } from 'meteor/accounts-base';
  const accountSchema = new SimpleSchema({
    _id: { type: String },
    emails: { type: Array },
    'emails.$': { type: Object },
    'emails.$.address': { type: String },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true }
  })

  Accounts.validateNewUser((user) => {
    accountSchema.validate(user);

    // Return true to allow user creation to proceed
    return true;
  });
  ```

  To login or logout, we can use the following:

  ```js
  Meteor.loginWithPassword('username', 'password', (err) => {
    if (err) {
      console.log(err);
    }
  });
  Meteor.logout((err) => {
    if (err) {
    console.log(err);
    }
  });
  ```

  ---

</details>

<details>

  ---

  <summary>Facebook Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-facebook
  ```

  Then, we need to configure the service.

  ```js
  import { ServiceConfiguration } from 'meteor/service-configuration';

  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        appId: 'your-app-id',
        secret: 'your-app-secret',
        loginStyle: 'popup',
      },
    }
  );
  ```

  Then, we can login with the following:

  ```js
  Meteor.loginWithFacebook({
    requestPermissions: ['user_friends', 'public_profile'],
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  ```

  ---

</details>

<details>

  ---

  <summary>Google Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-google
  ```

  Then, we need to configure the service.

  ```js
  import { ServiceConfiguration } from 'meteor/service-configuration';

  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        clientId: 'your-app-id',
        secret: 'your-app-secret',
        loginStyle: 'popup',
      },
    }
  );
  ```

  Then, we can login with the following:

  ```js
  Meteor.loginWithGoogle({
    requestPermissions: ['email'],
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  ```

  ---

</details>

<details>

  ---

  <summary>GitHub Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-github
  ```

  Then, we need to configure the service.

  ```js
  import { ServiceConfiguration } from 'meteor/service-configuration';

  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        clientId: 'your-app-id',
        secret: 'your-app-secret',
        loginStyle: 'popup',
      },
    }
  );
  ```

  Then, we can login with the following:

  ```js
  Meteor.loginWithGithub({
    requestPermissions: ['user:email'],
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  ```

  ---

</details>

<details>

  ---

  <summary>Twitter Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-twitter
  ```

  Then, we need to configure the service.

  ```js
  import { ServiceConfiguration } from 'meteor/service-configuration';

  ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
      $set: {
        consumerKey: 'your-app-id',
        secret: 'your-app-secret',
        loginStyle: 'popup',
      },
    }
  );
  ```

  Then, we can login with the following:

  ```js
  Meteor.loginWithTwitter((err) => {
    if (err) {
      console.log(err);
    }
  });
  ```

  ---

</details>

<details>

  ---

  <summary>Meetup Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-meetup
  ```

  Then, we need to configure the service.

  ```js
  import { ServiceConfiguration } from 'meteor/service-configuration';

  ServiceConfiguration.configurations.upsert(
    { service: 'meetup' },
    {
      $set: {
        clientId: 'your-app-id',
        secret: 'your-app-secret',
        loginStyle: 'popup',
      },
    }
  );
  ```

  Then, we can login with the following:

  ```js
  Meteor.loginWithMeetup((err) => {
    if (err) {
      console.log(err);
    }
  });
  ```

  ---

</details>

<details>

  ---

  <summary>Meteor Developer Authentication</summary>

  First, we need to add the package.

  ```bash
  meteor add service-configuration
  meteor add accounts-meteor-developer
  ```

  Then, we need to configure the service.

  ```js
  import { ServiceConfiguration } from 'meteor/service-configuration';

  ServiceConfiguration.configurations.upsert(
    { service: 'meteor-developer' },
    {
      $set: {
        clientId: 'your-app-id',
        secret: 'your-app-secret',
        loginStyle: 'popup',
      },
    }
  );
  ```

  Then, we can login with the following:

  ```js
  Meteor.loginWithMeteorDeveloperAccount((err) => {
    if (err) {
      console.log(err);
    }
  });
  ```

  ---

</details>

Some other useful methods are:

```js
Accounts.forgotPassword({ email: 'email@example.com' }, (err) => {
  if (err) {
    console.log(err);
  }
});

Accounts.resetPassword('token', 'newPassword', (err) => {
  if (err) {
    console.log(err);
  }
});

// Must be logged in
Accounts.changePassword('oldPassword', 'newPassword', (err) => {
  if (err) {
    console.log(err);
  }
});

Accounts.verifyEmail('token', (err) => {
  if (err) {
    console.log(err);
  }
});
```

## Testing

Typically, we use `mocha` for testing, and `quave:testing` for mocking.

```bash
meteor add meteortesting:mocha
meteor npm install --save-dev chai
meteor add quave:testing
```

Then, we can create a test file.

```js
// imports/api/tasks.tests.js
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        TasksCollection.remove({});
        taskId = TasksCollection.insert({
          text: 'Test Task',
          createdAt: new Date(),
          userId,
        });
      });

      it('can delete owned task', () => {
        mockMethodCall('tasks.remove', taskId, { context: { userId } });

        assert.equal(TasksCollection.find().count(), 0);
      });
    });
  });
}


// tests/main.js
import '/imports/api/tasks.tests.js';
```

And use it like so:

```bash
TEST_WATCH=1 meteor test --driver-package meteortesting:mocha
```

## Deployment

Deployment is pretty quick too. First, make sure you have an account with [Meteor](https://cloud.meteor.com/). Then, run the following command, changing the domain to your own:

```bash
meteor deploy my-special-domain.meteorapp.com --free --mongo
```

And that's it, just like that, you have a live application. Super simple.

## Conclusion

I think MeteorJS's main selling point is that it's easy to get started, with rapid development, and a lot of features out of the box. However, it's not as modern as other frameworks, and it's not as popular. I think it's great for certain circumstances, like a quick prototype, or a small application, but I don't think it's the best choice for a long term project, at least for me.

With that said, I hope you enjoyed this quick intro to MeteorJS, and I hope you learned something new today!
