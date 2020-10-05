import express from 'express';
import "@babel/polyfill";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import MasterComponent from './dist/app';

const app = express();

app.use( express.static("dist") );

app.get('/*', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(generateHtml());
});

function generateHtml(domRender) {
    return (`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Document</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div id="app"></div>
            <script src="/index.js"></script>
        </body>
        </html>
    `);
}

app.listen(3000, () => console.log(`app is running on ${3000}`));