# gatsby-plugin-reason

Gatsby plugin so you can write your site in ReasonML!

Check out [gatsby-starter-reason](https://github.com/jtberglund/gatsby-starter-reason) for an in-depth example of how to use this plugin with your site.

## Setup

1.  Install `gatsby-plugin-reason`

    ```
    npm i gatsby-plugin-reason
    ```

    or

    ```
    yarn add gatsby-plugin-reason
    ```

2.  You'll need `bs-platform` to compile Reason -> BuckleScript.

    You can either

    a) install globally and link to the binary

    ```
        npm i -g bs-platform
        npm link bs-platform
    ```

    or b) Install as a dependency

    ```
        npm i bs-platform
    ```

3.  Add `'gatsby-plugin-reason'` to `gatsby-config.js`.

    ```js
    // gatsby-config.js
    module.exports = {
        // ...
        plugins: ['gatsby-plugin-reason']
        // ...
    };
    ```

4.  Create a `bsconfig.json` file at the root of your gatsby app with the following contents:

    ```json
    {
        "name": "my-gatsby-app",
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

5.  That's it! Create your `.ml`/`.re` files and they'll automatically be compiled to javascript when you run `gatsby develop`.

## Usage

### Creating ReasonReact components

1.  Create your ReasonReact component (e.g. `Paragraph.re` shown below)

    ```ml
    let component = ReasonReact.statelessComponent("Paragraph");

    let make = children => {
        ...component,
        render: _self => <p> children </p>
    };

    let default = ReasonReact.wrapReasonForJs(~component, jsProps => make(jsProps##children));
    ```

2.  Import the reason file from your JavaScript components

    ```jsx
    import React from 'react';
    import Paragraph from './Paragraph.re';

    const Component = () => {
        return <Paragraph>Hello world!</Paragraph>;
    };
    ```
