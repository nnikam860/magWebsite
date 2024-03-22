// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(cors());

// In-memory storage for image URLs
let imageUrls = [];

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const imageId = uuidv4();
    cb(null, file.fieldname + '-' + imageId + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/uploads', upload.single('image'), async (req, res) => {
  const imageUrl = 'http://localhost:3000/' + req.file.path;

  // Store the image URL in memory
  imageUrls.push(imageUrl);

  res.json({ imageUrl: imageUrl });
});

// Endpoint to fetch image URLs
app.get('/images', (req, res) => {
  res.json({ imageUrls: imageUrls });
});

// Serve uploaded files statically
app.use("/uploads", express.static('uploads'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
