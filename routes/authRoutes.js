const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/myFirstDb'; // Update the database name here
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// ... (other code)

// Register route
router.post('/register', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('myFirstDb'); // Update the database name here
    const collection = database.collection('users');

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      password: hashedPassword,
    };

    await collection.insertOne(user);

    // Redirect to the dashboard after successful registration
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  } finally {
    await client.close();
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    await client.connect();

    const database = client.db('myFirstDb'); // Update the database name here
    const collection = database.collection('users');

    const user = await collection.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send('User not found');
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      // Redirect to the dashboard after successful login
      res.redirect('/dashboard');
    } else {
      res.send('Login failed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  } finally {
    await client.close();
  }
});

module.exports = router;
