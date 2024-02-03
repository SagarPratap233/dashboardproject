const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/myFirstDb';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html');
  });

// Example dashboard route
app.get('/dashboard', (req, res) => {
  
    res.sendFile(__dirname + '/views/index.html');
  
  });
  
app.get('/logout', (req, res)=> {
 
  res.sendFile(__dirname + '/views/logout.html')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


