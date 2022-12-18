const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

// Set up a connection to the MongoDB database
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a route handler for the /feed endpoint
app.get('/feed', (req, res) => {
  // Connect to the MongoDB database
  client.connect((err) => {
    if (err) {
      console.error(err);
      res.status(500).send();
      return;
    }

    // Connected successfully
    console.log('Connected to MongoDB');

    // Retrieve the feed data from the database
    const collection = client.db('my_database').collection('feed');
    collection.find({}).toArray((err, docs) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      }

      // Send the results as a JSON response
      res.json(docs);
    });

    // Disconnect from the database
    client.close();
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
