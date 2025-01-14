const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5005;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data from requests

// Routes
app.get('/', (req, res) => {
  res.send('CMS Backend is Running! 🚀');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
