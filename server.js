const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// When using react-router.browserHistory, handle every other route with index.html
// which will contain a script tag to application's JavaScript
app.get('*', function(req, res) {
  //res.sendFile(path.join(__dirname, 'index.html'));
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, function() {
  console.log('Server is up and running on port: ' + PORT);
});
