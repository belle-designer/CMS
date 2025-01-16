const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');


const app = express();
const PORT = 5005;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data from requests

const db = mysql.createConnection({
  host: 'localhost',        // Your database host
  user: 'root',             // Your database user
  password: '',     // Your database password
  database: 'cms'        // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Routes
app.get('/', (req, res) => {
  res.send('CMS Backend is Running! 🚀');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Hash a password
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Compare the password during login
const comparePassword = async (password, hashedPassword) => {
  console.log(password, hashedPassword)
  return await bcrypt.compare(password, hashedPassword);
};

app.post('/api/getAllUsers', async (req, res) => {
  const email = req.body;
  const query = 'SELECT * FROM `users` WHERE email = ?';
  db.query(query,  [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error!' });
    }
    if (results.length > 0) {
      const user = results[0];
        res.status(200).json({
          success: true,
          message: 'Email found',
          role: user.role,
        });}
    else {
      res.status(401).json({
        success: false,
        message: 'Email not found on our server!',
      });
    }
  })
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM `users` WHERE email = ?';
  console.log(email);
  db.query(query,  [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error!' });
    }
    if (results.length > 0) {
      const user = results[0];
      // Compare hashed password in database with entered password
      console.log(password, email, user.password);
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (passwordMatch) {
          res.status(200).json({
            success: true,
            message: 'Login successful!',
            role: user.role,
          });
        } else {
          res.status(401).json({
            success: false,
            message: 'Invalid credentials!22',
          });
        }
      } catch (compareErr) {
        res.status(500).json({ success: false, message: 'Error comparing passwords!' });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials!',
      });
    }
  });
});





