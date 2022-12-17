const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public', {
  setHeaders: function (res, path) {
    if (path.indexOf('.js') !== -1) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
