const express = require("express");
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(cors()); // Enable CORS for all routes

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

// Handle POST request to /api/articles
app.post('/api/articles', upload.single('file'), (req, res) => {
  const { title, author, content } = req.body;
  const file = req.file;

  // Process form data and file upload here
  console.log('Received form data:', { title, author, content });
  console.log('Received file:', file);

  // Send a response
  res.status(200).json({ message: 'Article created successfully' });
});


// Serve uploaded files statically
app.use("/uploads", express.static('uploads'));

app.get("uploads/", (req, res)=>{
  res.send({imageURL: imageId })
 res.json( {imageId})
} )

// Define a simple route
app.get("/api/message", (req, res) => {
  res.send({ message: "Hello from the server!" });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
