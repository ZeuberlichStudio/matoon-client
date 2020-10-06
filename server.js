const express = require('express');
require("@babel/polyfill");

const app = express();

app.use( express.static("dist") );

app.get('/*', (req, res) => {
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(generateHtml());
});

function generateHtml() {
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

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`client is running on port ${server.address().port}`));
