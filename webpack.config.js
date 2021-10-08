/**
 * @fileoverview
 * This config is intended to be generalized enough to be used in multiple
 * projects, while specific enough to meat our JS bundler needs.  Please take
 * note of the environment variables used in the example below.
 *
 * @example
 * The following command runs a build for development.
 * ```
 * $ npx webpack\
 *    --config=<relative path to this file>
 *    --mode='development'\
 *    --env entryPath='./src/app.js'\
 *    --env name='App'\
 * ```
 */

const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const helpers = require('./scripts/webpack_helpers');

/**
 * @see https://webpack.js.org/guides/environment-variables/
 *
 * @description
 * Environment variables expected by the build script.
 *
 * @typedef Env
 * @property {string} name - The name of the module being built.
 * @property {string} entryPath - A relative path to the file that should be
 * considered the root of the dependency graph.
 * @property {string} outputDir - A relative path to the directory in which to
 * write the bundled output.
 */

/**
 * @see https://webpack.js.org/configuration/mode/
 *
 * @description
 * The expected arguments passed into the build command.
 *
 * @typedef Argv
 * @property {'production' | 'development'} mode - The overall mode in which to
 * run the build.
 */

/**
 * @see https://webpack.js.org/configuration/
 *
 * @param { Env } env - Environment variables passed into the
 * build command.
 * @param { Argv } argv - Arguments passed into the command.
 * @return { Record<string, any> } A valid Webpack configuration object.
 */
function buildWebpackConfig(env, argv) {
  const mode = argv.mode;
  const lowercaseName = env.name.toLowerCase();
  const pascalName = helpers.toPascal(env.name);

  const config = {
    mode: mode,
    devtool: 'inline-source-map',
    stats: {
      all: false,
      assets: true,
      colors: true,
      errors: true,
      errorDetails: true,
      errorStack: true,
      builtAt: true,
      warnings: true,
    },
    entry: {
      [pascalName]: path.resolve(__dirname, env.entryPath),
    },
    output: {
      path: path.resolve(__dirname, env.outputDir),
      filename: mode === 'production' ?
          lowercaseName + '.js' :
          lowercaseName + '.dev.js',
      library: {
        name: ['VHL', pascalName],
        type: 'umd',
      },
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: [
            /**
             * Transpiles newer JS features down to older ones to increase
             * browser support.
             * @see https://www.npmjs.com/package/babel-loader
             */
            {
              loader: 'babel-loader',
              options: {
                sourceMaps: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ESLintWebpackPlugin(),
    ],
  };

  helpers.logBuildSettings(argv, config.output.path);

  return config;
}

module.exports = buildWebpackConfig;

