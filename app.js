const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

app.listen(PORT, () => {
  console.log("app listening at http://localhost:" + PORT);
});
