# Demo Component

A simple demo component.

## Table of Contents

- [Usage](#usage)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building The Project](#building-the-project)
- [Running The Project](#running-the-project)
- [Additional Scripts](#additional-scripts)
- [Naming Conventions](#conventions)
  - [File Names](#file-names)
- [Unit Testing](#unit-testing)
  - [Testing Plain JavaScript](#testing-plain-js)
  - [Testing Custom Elements](#testing-custom-elements)
- [Sandbox Environment](#sandbox)
- [Recommended Workflow](#workflow)
- [Maintaining The Bundler](#bundler-maintenance)

<a id="usage"></a>
## Usage

Add the following to your project's `package.json`:
```json
dependencies: {
  "@vhl/intranav": "github:vhl/intranav#<desired-tag>"
}
```

```
$ yarn install @vhl/intranav
```

As a standalone JavaScript dependency in the browser:
```html
<script type="text/javascript src="<path to intranav.js>"></script>
<script type="text/javascript">
  import {V3 as Intranav} from '@vhl/intranav';
  customElement.define('vhl-intranav', Intranav);
</script>
```

As a module in a larger JavaScript application:
```javascript
import {V3 as Intranav} from '@vhl/intranav';
customElement.define('vhl-intranav', Intranav);
```

<a id="prerequisites"></a>
## Prerequisites

- Node v12.20.0
- Yarn v1.22.10

<a id="installation"></a>
## Installation

```
$ yarn install
```

<a id="building-the-project"></a>
## Building The Project

The project supports two build methods, one for development and one for
distribution.  The development build includes development features like
sourcemaps with the compilation output.  These features are stripped in
distribution builds to reduce the final bundle size.

Build the project for distribution, output is placed in `./dist/`:
```
$ yarn run build:dist
```

Building the project for development, output is placed in
`./sandbox/public/assets/bundle/`:
```
$ yarn run build:dev
```

Watch files for changes when developing:
```
$ yarn run build:dev -- --watch
```

> All builds include linting and type checking, which will fail the build if
> not adhered to.  It's recommended to run the build command in a secondary
> terminal to provide early feedback on the build status.

<a id="running-the-project"></a>
## Running The Project

The project includes a development server with a test bed for use in the
browser.  By default, the project will run on port 3003, but this can be changed
by passing in a "port" argument.  See [the sandbox section](#sandbox) for more
information.

```
$ yarn start --port <port number> // defaults to 3003
```

The `./sandbox/public` directory contains the code rendered in the browser.

<a id="additional-scripts"></a>
## Additional Scripts

Linting:
```
$ yarn run lint
```

Type checking:
```
$ yarn run typecheck
```

<a id="naming-conventions"></a>
## Naming Conventions

Naming conventions within the code are enforced with
[ESLint](https://eslint.org/).  Lint checks are run as part of various builds,
but can be run as a standalone process by running:
```
$ yarn lint
```

### File Names

- File names should be URL friendly, using a `-` for compound words and a `_`
  for separate words.  (Essentially "snake case").
- Specs **must** end with the suffix `_spec.js` for Jest to find them.
- Custom elements must end with the suffix `_element.js` to prevent the file
  from producing a false negative when code coverage reports are gathered.

> At the time of this writing, Jest does not include first class support for
> gathering coverage on tests that run using Puppeteer.

<a id="unit-testing"></a>
## Unit Testing

Unit tests are run via the [Jest](https://jestjs.io/) testing library.  Custom
elements rely on the DOM however, and are best tested via a headless browser.

<a id="testing-plain-js"></a>
### Testing Plain JavaScript

The project deviates from typical Jest testing conventions in that unit tests
are kept in a separate directory from the code that they're testing.  Unit tests
are located in the `./spec` directory and end with the prefix `_spac.js`.  This
prefix is required for Jest to pick automatically find and run the test.

<a id="testing-custom-elements"></a>
### Testing Custom Elements (Web Components)

This project includes [Puppeteer](https://developers.google.com/web/tools/puppeteer),
a library for controlling headless Chrome.  This allows developers to run
automated unit tests on custom elements by loading them into static HTML files,
"fixtures", and leveraging Puppeteer's API to test assertions.  See Jest's
example on [using Jest with Puppeteer](https://jestjs.io/docs/puppeteer).

> Fixtures can also be served in browser.  Start the sandbox server by running
> `$ yarn start` and navigate to `<project URL>/fixtures/<fixture>.html`.  A
> common workflow is to write an assertion on a given fixture via the browser's
> JavaScript console, then transcribe the assertion into Jest/Puppeteer as a
> unit test.  See below for more information on the
> [sandbox environment](#sandbox).

### Running Tests

To run the unit tests:
```
$ yarn test
```

The test command will compile the project's source code and place the output in
`./spec/fixtures/assets/bundle/`.  Fixtures should reference the the bundled
output from this directory.  The bundler is run in "development" mode to aid in
debugging fixtures via the browser console.

<a id="sandbox"></a>
## Sandbox Environment

The project contains a lightweight Express server for manually browser testing.

To run the sandbox environment, use the following command and navigate to local
host under the relevant port:
```
$ yarn start --port <port number> // defaults to 3003
```

The page is rendered via a static HTML file in `./sandbox/public`, which loads
assets from the development bundle under the `./sandbox/public/assets/bundle`
directory.  The `./sandbox/public/assets/static` directory should be reserved
for assets that should NOT change with the build, e.g. images used for testing.

> The sandbox environment is for manual testing only.  It is not involved in
> running automated unit tests, feel free to edit `index.html` as you see fit.

<a id="workflow"></a>
## Recommended Workflow

The following is only a recommendation.

1) Clone this repository to your development environment.
2) Install the required dependencies.
3) Run a development build in watch mode, this will run all of the required
   checks and compilations whenever a source file is saved.
4) In a separate terminal, start the sandbox environment on a port of your
   choice.  Go to the relevant localhost URL to view the static HTML file
   within the sandbox environment.
5) Make changes to the source code and sandbox HTML file as needed, the
   development build should continuously update the compiled source as needed.
6) Write/update unit tests as needed.  This command is not included in the
   development build, but _is_ included in a distribution build.
7) When finished, run a distribution build.
8) If all checks pass and the distribution build completes, commit your work
   to the repo.

### Tips

- Use a language server for instantaneous feedback in your editor.  Most editors
  have plugins or build-in options for this.
- The source code is statically typed via JSDoc, you can leverage this for code
  navigation and viewing documentation within your editor if it supports
  TypeScript.
- Have the development watcher running in a pane that is visible alongside your
  source code, this provides feedback for the entire source, not just the files
  open in your editor.

<a id="bundler-maintenance"></a>
## Maintaining The Bundler

At the time of this writing, [Webpack 5](https://webpack.js.org/concepts/) is
used as the bundler.  See
[webpack's official documentation](https://webpack.js.org/configuration/) for
more information on its configuration API.  The configuration is designed to be
project agnostic so that it can be a drop-in solution for building other
projects.

In general:
- All bundle commands should be runnable via `package.json`.
- The bundler config should be as project agnostic as possible for easy re-use.
  * Webpack expects an absolute path for the output directory, this is resolved
    via a helper function.
- The API for a given tool, e.g. Webpack or TypeScript, should not be
  obfuscated.

> Webpack supports arbitrary parameters via the "--env" parameter.  See the
> configuration documentation on
> [environment variables](https://webpack.js.org/guides/environment-variables/)
> for more details.

The bundler outputs JS files as a namespaced UMD library, this allows it to be
consumed as a standalone script in an HTML page.  The same output can also be
consumed by other JavaScript applications.  In addition, TypeScript is used to
transform JSDocs into type definition headers to enforce interfaces between the
library and consuming applications.  For more information on type checking
JavaScript, see
[TypeScript's Documentation](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html).

> TypeScript is used for type checking and generating type definition headers
> on compilation.  It is not used for transpiling the project to other formats.

