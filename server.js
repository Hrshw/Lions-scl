require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./src/middleware/authentication');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const Event = require('./src/models/evenModel');
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200000 // Limit file size to 300 KB
    }
});
// Set up middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'hbs');
// Set the path for views
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.DBSTRING);

// Check if MongoDB is connected successfully
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully!');
});

// Fetch carousel images from MongoDB
const fetchCarouselImages = async () => {
  try {
      const carouselImages = await CarouselImage.find();
      return carouselImages.map(image => image.filename);
  } catch (error) {
      console.error('Error fetching carousel images:', error);
      return [];
  }
};

// Middleware to fetch carousel images and pass them to res.locals
app.use(async (req, res, next) => {
  const carouselImages = await fetchCarouselImages();
  res.locals.carouselImages = carouselImages;
  next();
});

app.get('/', (req, res) => {
  res.render('home', { carouselImages: res.locals.carouselImages });
});
app.get('/team', (req, res) => {
  res.render('team'); 
});
app.get('/projects', (req, res) => {
  res.render('project'); 
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
  if (username === 'User@gmail.com' && password === 'example') {
    const user = { username: 'User@gmail.com' };

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



// POST endpoint to handle form submission and file uploads
app.post('/uploadEvent', upload.array('eventImage', 5), async (req, res) => {
  
    try {
        // Handle form data
        const eventData = {
            eventTitle: req.body.eventTitle,
            conductedOn: req.body.conductedOn,
            conductedAt: req.body.conductedAt,
            totalCost: req.body.totalCost,
            totalBeneficiaries: req.body.totalBeneficiaries,
            images: []
        };


        // Process each uploaded file
        for (const file of req.files) {
            // Resize image using sharp
            const resizedImageBuffer = await sharp(file.buffer)
                .resize({ width: 800, height: 600, fit: 'inside' }) // Resize image to fit within 800x600 dimensions
                .toBuffer();

            // Generate unique filename
            const filename = `${Date.now()}-${file.originalname}`;
            const imagePath = path.join(__dirname, 'public', 'uploads', filename);

            // Write resized image to disk
            await fs.promises.writeFile(imagePath, resizedImageBuffer);

            // Add filename to eventData
            eventData.images.push(filename);
        }

        // Save eventData to MongoDB
        const event = new Event(eventData);
        await event.save();

        // Send response
        res.status(200).json({ message: 'Event data received and saved successfully', eventData });
    } catch (error) {
        console.error('Error uploading event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Render events page with event data fetched from MongoDB
app.get('/events', async (req, res) => {
  try {
    // Fetch events from MongoDB
    const events = await Event.find();
    
    // Render event.hbs template and pass events data to it
    res.render('event', { events: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST endpoint to handle carousel image uploads
app.post('/uploadCarouselImage', upload.array('carouselImage', 5), async (req, res) => {
  try {
      // Process each uploaded file
      for (const file of req.files) {
          // Check if the file size exceeds 200 KB
          if (file.size > 200000) {
              return res.status(400).json({ error: 'File size exceeds the limit of 200 KB.' });
          }

          // Resize image using sharp
          const resizedImageBuffer = await sharp(file.buffer)
              .resize({ width: 800, height: 600, fit: 'inside' }) // Resize image to fit within 800x600 dimensions
              .toBuffer();

          // Generate unique filename
          const filename = `${Date.now()}-${file.originalname}`;
          const imagePath = path.join(__dirname, 'public', 'uploads', 'carouselimages', filename);

          // Write resized image to disk
          await fs.promises.writeFile(imagePath, resizedImageBuffer);
      }

      // Send success response
      res.status(200).json({ message: 'Carousel images uploaded successfully' });
  } catch (error) {
      console.error('Error uploading carousel images:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
