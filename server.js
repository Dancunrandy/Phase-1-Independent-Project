const express = require("express");
const app = express();

// Define a route handler for the /feed endpoint
app.get("/feed", (req, res) => {
  // Get the feed data from the database
  const feedData = getFeedDataFromDb();

  // Send the feed data as a JSON response
  res.json(feedData);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
