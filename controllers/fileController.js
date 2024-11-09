const multer = require('multer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

// Create the uploads folder if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

exports.fileUpload =  (req, res) => {
    console.log(req.body)
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send({ message: 'File uploaded successfully', file: req.file });
}

exports.getFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
}

exports.deleteFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send('Error deleting file');
      }
      res.send({ message: 'File deleted successfully' });
    });
  } else {
    res.status(404).send('File not found');
  }
}
