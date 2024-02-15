require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./src/middleware/authentication');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
// Set the path for views
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://rahul:RSsmy11ssm@formbuilder.t0jplog.mongodb.net/formbuilder');

// Check if MongoDB is connected successfully
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully!');
});


app.get('/', (req, res) => {
  res.render('home');
});
app.get('/team', (req, res) => {
  res.render('team'); 
});
app.get('/projects', (req, res) => {
  res.render('project'); 
});
app.get('/events', (req, res) => {
  res.render('event'); 
});
app.get('/contact', (req, res) => {
  res.render('contact'); 
});

app.get('/login', (req, res) => {
  res.render('admin/login'); 
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Received credentials:', username, password);

  // Dummy authentication logic (replace with your actual authentication logic)
  if (username === 'exampleUser@gmail.com' && password === 'examplePassword') {
    const user = { username: 'exampleUser@gmail.com' };

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token as a cookie
    res.cookie('accessToken', accessToken, { httpOnly: true });

    // Return the token as JSON
    res.json({ token: accessToken });
  } else {
    // Return an error as JSON
    res.status(401).json({ message: 'Unauthorized - Invalid credentials' });
  }
});


app.get('/admin', authenticateToken, (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  res.render('admin/admin', { user: req.user });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
