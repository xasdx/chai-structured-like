
# chai-structured-like

[![Build Status](https://travis-ci.org/xasdx/chai-structured-like.svg?branch=master)](https://travis-ci.org/xasdx/chai-structured-like) [![Coverage Status](https://coveralls.io/repos/github/xasdx/chai-structured-like/badge.svg?branch=master)](https://coveralls.io/github/xasdx/chai-structured-like?branch=master)

> A Chai plugin with chainable helper assertions, comparing the structure of two objects

## What it does

Asserts that two objects has the same stucture. The structure of objects are equal when:

- The objects have the same number of properties
- The properties match by name
- The properties match by type

So `{ a: 0, b: true, c: "hi" }` and `{ a: 0, b: false, c: "hello" }` are considered structurally equal

## How to install it

    npm install chai-structured-like --save

## How to use it

You can compare the structure of two objects:

```js
expect({ n: 0, m: true, s: "hi" }).to.be.structuredLike({ n: 1, m: false, s: "hey" })
```

Or even compare the structure of nested objects:

```js
expect({ a: 1, b: { c: "" }}).to.be.structuredLike({ a: 123, b: { c: "str" }})
```

Or use the shorter `stuctured` alias

```js
expect({ a: 1, b: [] }).to.be.structured({ a: 0, b: [true] })
```
