---
title: "SCSS - For The Experienced Developer"
description: "Sometimes, you just want to speed through the \"what's different\" and \"the gotchas\", and don't want to be explained how a variable/for-loop works for 2 paragraphs. This is that guide."
date: 2023-10-20T03:21:56Z
image: "/images/posts/scss-for-the-experienced-developer/pexels-olia-danilevich-4974915.jpg"
image_alt: "Photo by olia danilevich: https://www.pexels.com/photo/man-sitting-in-front-of-three-computers-4974915/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "SCSS", "sass", "CSS", "preprocessor", "mixins", "partials", "control directives", "nesting"]
draft: false
---

Sometimes, you just want to speed through the "what's different" and "gotchas", and don't want to be explained how a variable/for-loop works for 2 paragraphs. This is that guide.

## Table of Contents

* [Setup](#setup)
* [Comments](#comments)
* [Variables](#variables)
* [Nesting](#nesting)
* [Mixins](#mixins)
* [Inheritance](#inheritance)
* [Partials](#partials)
* [Operators](#operators)
* [Functions](#functions)
* [Control Directives](#control-directives)
* [Built-in Modules](#built-in-modules)
* [Conclusion](#conclusion)

## Setup

For starters, there's SCSS and Sass. SCSS is most popular, so we'll go through using that here. It's just a superset of CSS. **The only real difference is that Sass doesn't use curly braces or semicolons.**

``` scss
// style.scss
body {
  background-color: red;
}

// style.sass
body
  background-color: red
```

Also, you shouldn't use VSCode extensions, it's bad practice to limit contributors to a specific IDE just to work on your project effectively. If you're still going to use one, use the updated one [here](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass).

For the rest of us, I'll provide cheatsheets for the most popular build tools in dropdowns below.

<details>

  ---

  <summary>Vite</summary>

  ```bash
  npm install --save-dev sass
  ```

  That's it. You're done.

  ---

</details>

<details>

  ---

  <summary>Webpack (Development Server)</summary>

  ```bash
  npm install --save-dev css-loader style-loader
  ```

  ```js
  // webpack.config.js
  module.exports = {
     ...
     module: {
          rules: [
              {
                  test: /\.(css)$/,
                  use: ['style-loader','css-loader']
              }
          ]
      },
      ...
  }
  ...
  ```

  ---

</details>

<details>

  ---

  <summary>Webpack (Production Build)</summary>

  ```bash
  npm install --save-dev mini-css-extract-plugin
  ```

  ```js
  // webpack.config.js

  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  module.exports = {
    ...
    module: {
      rules: [
        ...
        {
           test: /\.css)$/,
           use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        ...
      ],
    },
    ...
    plugins: [
      new MiniCssExtractPlugin(),
    ],
    ...
  }
  ```

  ---

</details>

<details>

  ---

  <summary>Parcel</summary>

  There's nothing to do, it's built-in. If you want to reference it, just import it. If you want to customize it, use a `.sassrc` file.

  ---

</details>

<details>

  ---

  <summary>Rollup</summary>

  ```bash
  npm install --save-dev rollup-plugin-scss
  ```

  ```js
  // rollup.config.js

  import scss from 'rollup-plugin-scss'

  export default {
    ...
    plugins: [
      scss({
        // options...
      }),
    ],
    ...
  }
  ```

  ---

</details>

<details>

  ---

  <summary>Gulp</summary>

  ```bash
  npm install --save-dev gulp-sass sass
  ```

  ```js
  // gulpfile.js

  const sass = require('gulp-sass')(require('sass'));

  function buildStyles() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
  };

  exports.buildStyles = buildStyles;
  exports.watch = function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
  };
  ```

  ---

</details>

<details>

  ---

  <summary>Snowpack</summary>

  ```bash
  npm install --save-dev @snowpack/plugin-sass
  ```

  ```js
  // snowpack.config.js
  // snowpack.config.mjs
  export default {
    ...
    plugins: [
      '@snowpack/plugin-sass',
    ],
    ...
  };
  ```

  ---

</details>

<details>

  ---

  <summary>Grunt</summary>

  ```bash
  npm install --save-dev grunt-sass node-sass
  ```

  ```js
  // Gruntfile.js

  const sass = require('node-sass');

  grunt.initConfig({
    ...
    sass: {
      options: {
        implementation: sass,
        sourceMap: false,
      },
      dist: {
        files: {
          'main.css': 'main.scss',
        }
      }
    }
    ...
  });

  grunt.registerTask('default', ['sass']);
  ```
  ---

</details>

## Comments

```scss
// Single-line comment

/*
Multi-line comment
*/
```

## Variables

CSS and SCSS variables are different. SCSS variables are compiled, so they cannot be changed at runtime. They are also imperative.

```scss
$my-variable: 10px; // 10px
$my-other-variable: $my-variable + 10px; // 20px
$my-variable: 20px; // 20px
$my-other-variable // still 20px
$my_other_variable // also 20px
```

## Nesting

Nesting should be used sparingly. Try to keep it to 2-3 levels or less, as it can get out of hand quickly, and make your code hard to follow.

```scss
// Bad
.parent {
  .child {
    .grandchild {
      .great-grandchild {
        ...
      }
    }
  }
}

// Good
.parent {
  .great-grandchild {
    ...
  }
}
```

SCSS nesting is different from the nesting that CSS is getting in the future, in both syntax and functionality. The standard way of writing BEM in SCSS won't work in CSS. This is one reason why SCSS is still preferred by some, over just using CSS Next functionality.

```scss
// SCSS
.parent {
  .child {
    color: red;
  }
  &:hover {
    color: blue;
  }
  &_item {
    color: green;
  }
}

// CSS
.parent {
  & .child {
    color: red;
  }
  &:hover {
    color: blue;
  }
}
.parent_item {
  color: green;
}
```

## Mixins

Mixins are just functions. They can take arguments, and return values. They can also be used to create custom control directives, which we'll get into later.

```scss
@mixin my-mixin($arg1, $arg2, $arg3, $arg4) {
  color: $arg1;
  background-color: $arg2;
  width: $arg3 + $arg4;
}

.my-class {
  @include my-mixin(red, blue, 10px, 10px);
}
```

```css
/* Output */
.my-class {
  color: red;
  background-color: blue;
  width: 20px;
}
```

## Inheritance

Inheritance is just like it is in OOP. You can extend a class, and it will inherit all of the properties of the class you're extending.

```scss
%my-class {
  color: red;
  background-color: blue;
  width: 20px;
}

.my-other-class {
  @extend %my-class;
}
```

```css
/* Output */
.my-other-class {
  color: red;
  background-color: blue;
  width: 20px;
}
```

The difference between inheritance and mixins is that mixins can take arguments, and return values, while inheritance cannot. Inheritance is also more performant, as it doesn't have to be compiled.

Inheritance is a bit tricky, and I would honestly recommend avoiding it, as it can cause some unexpected behavior. It transplants itself into *every* selector that it's used in, so if you use it in a nested selector, it will still be transplanted into the parent selector. Here's a simple example, provided by the great Harry Roberts in his article [Extending silent classes in Sass](https://csswizardry.com/2014/01/extending-silent-classes-in-sass/) which showcasese this perfectly.

```scss
// SCSS
.foo {
    color: red;
}

.footer .foo {
    font-weight: bold;
}

.bar {
    @extend .foo;
}
```

```css
/* Output */
.foo, .bar {
    color: red;
}

.footer .foo, .footer .bar {
    font-weight: bold;
}
```
In short, it doesn't matter *where* you use it, it matters that you used it on that specific selector at all, and SCSS is going to make sure that it's applied to every selector that it can be. Or, in another way, **don't use inheritance in places that mixins would be more appropriate.** Which is most places.

## Partials

Partials are just files that start with an underscore. They are not compiled into CSS, and are used to store variables, mixins, functions, you name it. They are imported into other files, and are used to keep your code DRY. It's important to note that this is a different concept than in CSS, as most of us have been told (or at least, *should have been* told) that importing multiple stylesheets in CSS makes the page load slower, as the browser need to load each stylesheet. This is not the case with SCSS, as it's compiled into a single stylesheet, so that's not a concern.

```scss
// _variables.scss
$my-variable: 10px;

// _mixins.scss
@mixin my-mixin($arg1, $arg2, $arg3, $arg4) {
  color: $arg1;
  background-color: $arg2;
  width: $arg3 + $arg4;
}

// _index.scss
@forward 'variables';
@forward 'mixins';

// style.scss
@use 'index';

.my-class {
  @include my-mixin(red, blue, 10px, 10px);
}
```

```css
/* Output */
.my-class {
  color: red;
  background-color: blue;
  width: 20px;
}
```

Now, many of you may be wondering, "What's all this talk about `@forward` and `@use`? Why not `@import`?" Well, `@import` is simply deprecated. So, here's how it works:

```scss
// _index.scss
@forward 'variables';
@forward 'mixins';
@forward 'colors';

// main.scss
@use '../variables';
@use '../mixins' as m;
@use '../colors' as *;
@use '../index' as i;

.my-class {
  width: variables.$my-variable;
  @include m.my-mixin(red, blue, 10px, 10px);
  color: $red;
}

// OR all from the same index

.my-class {
  width: i.$my-variable;
  @include i.my-mixin(red, blue, 10px, 10px);
  color: i.$red;
}
```
Here's the key takeaways:

- `@use` is scoped to the current file, so if the variable/mixin/function is not at the top of the file you're using it in, then you don't have access to that variable/mixin/function.
- `@use` is not hoisted, so you can't use it before it's declared.
- The string passed to `@use` is the relative path to the file you're importing, removing any extensions or underscores.
- `@use` only imports the file once, so if you import it multiple times, it will only be imported once.
- `@forward` is essentially importing and exporting at the same time, to make importing multiple files easier.
- Importing is, by default, namespaced to the file name. You can reassign this to anything using `as <name>`, or remove the namespace entirely using `as *`.

## Operators

Operators are pretty standard. They can be used to perform arithmetic operations, and can be used in mixins, functions, and control directives. Just remember, they're compiled, so they cannot be changed at runtime.

```scss
// SCSS
$my-variable: 10px;
$my-other-variable: 20px;

.my-class {
  width: ($my-variable + $my-other-variable) / 2;
}

@if $my-variable == 10px {
  .my-color-condition {
    color: red;
  }
}
```

```css
/* Output */
.my-class {
  width: 15px;
}

.my-color-condition {
  color: red;
}
```

## Functions

Functions are just functions, used usually for utility purposes (e.g., `lighten()` and `darken()`). They can take arguments, and return values.

```scss
@function double($number) {
  @return $number * 2;
}

.my-class {
  height: 10px;
  width: double(10px);
}
```

```css
/* Output */
.my-class {
  height: 10px;
  width: 20px;
}
```

## Control Directives

Control directives are just like control directives in any other language. They can be used to create custom control directives, like `@if`, `@for`, `@each`, and `@while`.

```scss
@each $item in $list {} //iterates through a list
@if ($condition) {} // compile time conditional
@else {} // compile time else
@for $number from $start to $end {} // iterates through a range of numbers
@while $condition {} // compile-time while loop
@warn ""; // compile-time warning
@error ""; // compile-time error
@debug ""; // compile-time console log
@at-root {} // move selector outside of current nesting level
```

```scss
@each $color in red, blue, green {
  .#{$color}-class {
    color: $color;
  }
}

@if $my-variable == 10px {
  .my-color-condition {
    color: red;
  }
} @else {
  .my-color-condition {
    color: blue;
  }
}

@for $i from 1 through 3 {
  .numbered-#{$i} {
    color: red;
  }
}

$my-variable: 3px;
@while $my-variable < 10px {
  .scale-of-three {
    width: $my-variable;
  }
  $my-variable: $my-variable + 3px;
}

/* Will error on compile */
@if $my-variable > 8px {
  @error "That variable is too big!";
} else {
/* Will warn you on compile, but still compiles */
  @warn "That variable is too small!";
}

/* Will print to console on compile, with a line number */
@debug "Something important happened!";

@media print {
  .my-print-class {
    color: red;
    .my-nested-print-class {
      color: blue;
      @at-root (without: media) {
        .my-print-class {
          color: blue;
        }
      }
    }
  }
}
```

```css
/* Output */
.red-class {
  color: red;
}
.blue-class {
  color: blue;
}
.green-class {
  color: green;
}

.my-color-condition {
  color: red;
}

.numbered-1 {
  color: red;
}
.numbered-2 {
  color: red;
}
.numbered-3 {
  color: red;
}

.scale-of-three {
  width: 9px;
}

.my-print-class {
  color: red;
}

@media print {
  .my-print-class .my-nested-print-class {
    color: blue;
  }
  .my-print-class {
    color: blue;
  }
}
```

## Built-in Modules

SCSS has a few built-in modules that are imported into your file using `@use`. Here's some short guides on each of them.

<details>

  ---

  <summary>`sass:math` (`sin()`, `cos()`, `pow()`)</summary>

  ```scss
  @use 'sass:math';

  .my-class {
    width: math.div(10px, 2px);
  }
  ```

  ```css
  /* Output */
  .my-class {
    width: 5;
  }
  ```

  ---

</details>

<details>

  ---

  <summary>`sass:string` (`str-length()`, `str-insert()`, `str-slice()`)</summary>

  ```scss
  @use 'sass:string';

  @debug string.length('Hello, world!'); // 13
  @debug string.quote(Helvetica); // "Helvetica"
  @debug string.unquote("Helvetica"); // Helvetica
  @debug string.insert("Roboto Bold", " Mono", 7); // "Roboto Mono Bold"
  @debug string.slice("Roboto Bold", 7); // "Bold"
  @debug string.split("Roboto Mono Bold", " ", $limit: 1); // "Roboto", "Mono Bold"
  @debug string.to-upper-case("Roboto Mono Bold"); // "ROBOTO MONO BOLD"
  @debug string.to-lower-case("Roboto Mono Bold"); // "roboto mono bold"
  @debug strings.unique-id(); // "u1b3d7f6"

  ```

  ---

</details>

<details>

  ---

  <summary>`sass:color` (`lighten()`, `darken()`, `mix()`)</summary>
  
  ```scss
  @use 'sass:color';

  // Adjusters
  @debug color.scale(#036, $lightness: -30%); // #002447, scales lightness by -30%
  @debug color.adjust(#6b717f, $red: 15); // #7a717f, increase red by 15
  @debug color.adjust(#d2e1dd, $red: -10, $blue: 10); // #c8e1e7, decrease red by 10, increase blue by 10
  @debug color.adjust(#998099, $lightness: -30%, $alpha: -0.4); // rgba(71, 57, 71, 0.6), decrease lightness by 30%, decrease alpha by 0.4

  @debug color.invert(#550e0c, 20%); // #663b3a, inverts color, with optional threshold
  @debug color.adjust-hue(#6b717f, 60deg); // #796b7f, rotate hue by 60 degrees
  @debug color.adjust-hue(#d2e1dd, -60deg); // #d6e1d2, rotate hue by -60 degrees
  @debug color.adjust-hue(#036, 45); // #1a0066, rotate hue by 45 degrees
  @debug color.change(#6b717f, $red: 100); // #64717f, changes red value to 100
  @debug color.mix(#036, #d2e1dd); // #698aa2, mixes colors together
  @debug color.invert(#b37399); // #4c8c66, inverts color

  @debug color.lighten(#6b717f, 20%); // #a1a5af, lightens color by 20%
  @debug color.darken(#b37399, 20%); // #7c4465, darkens color by 20%

  @debug color.saturate(#0e4982, 30%); // #004990, saturates color by 30%
  @debug color.desaturate(#036, 20%); // #0a335c, desaturates color by 20%

  @debug color.opacify(rgba(#036, 0.7), 0.3); // #036, sets alpha to 1
  @debug color.transparentize(#036, 0.3); // rgba(0, 51, 102, 0.7), sets alpha to 0.7
  @debug color.fade-in(#036, 0.3); // rgba(0, 51, 102, 0.3), fades in alpha by 0.3
  @debug color.fade-out(rgba(#e1d7d2, 0.5), 0.4);  // rgba(225, 215, 210, 0.1), fades out alpha by 0.4

  @debug color.ie-hex-str(#b37399); // #FFB37399, converts to IE hex string

  // Getters
  @debug color.hwb(210, 0%, 60%); // #036
  @debug color.red(#6b717f); // 107, get red value
  @debug color.alpha(#6b717f80); // 0.5, get alpha value
  @debug color.hue(#6b717f); // 240deg, get hue value
  @debug color.saturation(#e1d7d2); // 20%, get saturation value
  @debug color.lightness(#e1d7d2); // 85.2941176471%, get lightness value
  @debug color.whiteness(#e1d7d2); // 82.3529411765%, get how white a color is
  @debug color.blackness(#e1d7d2); // 17.6470588235%, get how black a color is
  @debug color.complement(#6b717f); // #7f796b, get complement of color
  ```

  ---

</details>

<details>

  ---

  <summary>`sass:list` (`length()`, `nth()`, `append()`, `join()`, `zip()`)</summary>

  ```scss
  @use 'sass:list';

  @debug list.length(1 2 3); // 3, get length of list
  @debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px, set nth item in list
  @debug list.nth(1 2 3, 2); // 2, get nth item in list
  @debug list.append(1 2 3, 4); // 1 2 3 4, append item to list
  @debug list.join(1 2 3, 4 5 6); // 1 2 3 4 5 6, join lists together
  @debug list.zip(1 2 3, 4 5 6); // (1 4) (2 5) (3 6), "zip", or interweave, lists together
  @debug list.index(1 2 3, 2); // 2, get index of item in list
  @debug list.is-bracketed(1 2 3); // false, check if list is bracketed
  @debug list.separator(1 2 3); // space, get separator of list
  @debug list.slash(1px, 50px, 100px); // 1px / 50px / 100px
  ```

  ---

</details>

<details>

  ---

  <summary>`sass:map` (`keys()`, `values()`, `has-key()`, `merge()`, `remove()`)</summary>

  ```scss
  @use 'sass:map';

  @debug map.keys((key1: value1, key2: value2)); // (key1, key2), get keys of map
  @debug map.values((key1: value1, key2: value2)); // (value1, value2), get values of map
  @debug map.has-key((key1: value1, key2: value2), key1); // true, check if map has key
  @debug map.merge((key1: value1, key2: value2), (key3: value3)); // (key1: value1, key2: value2, key3: value3), merge maps together
  @debug map.remove((key1: value1, key2: value2), key1); // (key2: value2), remove key from map
  @debug map.deep-merge((key1: (key2: value2)), (key1: (key3: value3))); // (key1: (key2: value2, key3: value3)), deep merge maps together
  @debug map.deep-remove((key1: (key2: value2, key3: value3)), key1, key2); // (key1: (key3: value3)), deep remove key from map
  @debug map.get((key1: value1, key2: value2), key1); // value1, get value of key in map
  @debug map.set((key1: value1, key2: value2), key1, value3); // (key1: value3, key2: value2), set value of key in map
  ```

  ---

</details>

<details>

  ---

  <summary>`sass:meta` (`type-of()`, `inspect()`, `call()`)</summary>

  ```scss
  @use 'sass:meta';

  @debug meta.type-of(100px); // number, get type of value
  @debug meta.inspect($value) // unquoted string, get string representation of value
  @debug meta.keywords($args); // (string: #080, comment: #800, variable: #60b), get keywords of arguments
  @debug meta.apply($my-mixin, 1 2 3); // 1 2 3, call mixin with arguments
  @debug meta.call($my-function, 1 2 3); // 1 2 3, call function with arguments

  @debug meta.content-exists(); // check if @content exists in mixin
  @debug meta.feature-exists('at-error'); // check if feature exists
  @debug meta.mixin-exists($name, $module: null) // check if mixin exists
  @debug meta.variable-exists($name, $module: null) // check if variable exists

  @debug meta.get-function($name, $css: false, $module: null) // get function by name
  @debug meta.get-mixin($name, $module: null) // get mixin by name

  @debug meta.module-functions("functions"); // ("pow": get-function("pow")), get functions of module
  @debug meta.module-variables("variables"); // ("hopbush": #c69, "midnight-blue": #036, "wafer": #e1d7d2), get variables of module
  ```

  ---

</details>

<details>

  ---

  <summary>`sass:selector` (`is-superselector()`, `simple-selectors()`, `selector-nest()`, `selector-append()`, `selector-replace()`)</summary>

  ```scss
  @use 'sass:selector';

  @debug selector.is-superselector("a", "a.disabled"); // true, check if selector is superselector of another selector
  @debug selector.is-superselector("a.disabled", "a"); // false

  @debug selector.append("a", ".disabled"); // a.disabled, append selector to another selector
  @debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled, extends selector to other selectors
  @debug selector.nest("ul", "li"); // ul li, nest selectors together
  @debug selector.parse(".main aside:hover, .sidebar p"); // ((unquote(".main") unquote("aside:hover")), (unquote(".sidebar") unquote("p"))), parse selectors into list of lists
  @debug selector.replace("a.disabled", "a", ".link"); // .link.disabled, replace selector with another selector
  @debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing, combines two selectors together
  @debug selector.simple-selectors("a.disabled"); // a, .disabled, get simple selectors of selector
  ```

  ---

</details>

## Conclusion

I probably didn't cover *everything* there is to know about SCSS, as it's an old, constantly evolving language and preprocessor. But, I hope this guide was helpful to you, and that it helped you skip the few tutorials that you'd probably have to go through otherwise.
