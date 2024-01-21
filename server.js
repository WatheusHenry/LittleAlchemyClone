const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/list-images', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'img');

  fs.readdir(imagePath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(files);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
