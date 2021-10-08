/**
 * @fileoverview
 * Sets up a skeletal Express server for local development.
 * To run the server, run `node server.js --port <port number>`
 */

const path = require('path');
const express = require('express');
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const app = express();
const port = argv.port ?? 3003;

app.use(
    '/docs',
    express.static(path.resolve(__dirname, '..', 'docs')),
);

app.use(
    '/sandbox',
    express.static(path.resolve(__dirname, 'public')),
);

app.use(
    '/spec',
    express.static(path.resolve(__dirname, '..', 'spec')),
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

