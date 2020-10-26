const express = require('express');

const app = express();

app.use('/static', express.static(__dirname + '/dist/public'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/public/index.html');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log( 'started' ));