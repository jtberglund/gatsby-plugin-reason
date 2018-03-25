# gatsby-plugin-reason

Gatsby plugin so you can write your site in ReasonML!

```
npm i gatsby-plugin-reason
```

or

```
yarn add gatsby-plugin-reason
```

## Setup

1.  After installing, add `'gatsby-plugin-reason'` to `gatsby-config.js`.

```js
// gatsby-config.js
module.exports = {
    // ...
    plugins: ['gatsby-plugin-reason']
    // ...
};
```

2.  Create a `bsconfig.json` file at the root of your gatsby app with the following contents:

```json
{
    "reason": { "react-jsx": 2 },
    "bs-dependencies": ["reason-react"],
    "sources": [
        {
            "dir": "src",
            "subdirs": true
        }
    ],
    "package-specs": {
        "module": "commonjs"
    },
    "suffix": ".bs.js",
    "refmt": 3
}
```

For more configuration options refer to the [BuckleScript docs](https://bucklescript.github.io/docs/en/installation.html) or the [bsconfig.json spec](https://bucklescript.github.io/bucklescript/docson/#build-schema.json)

3.  That's it! Create your `.ml` files and they'll automatically be compiled to javascript when you run `gatsby develop`.
