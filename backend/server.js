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

app.get('/api/getNumberofUsers', async (req, res) => {
  query = 'select count(*) from users where role = ?';
  let numOfAdmins = 0;
let numOfEducators = 0;

// Query for admins
db.query('SELECT COUNT(*) as count FROM users WHERE role = ?', ['admin'], (err, adminResults) => {
  if (err) {
    return res.status(500).json({ error: 'Error fetching admin data' });
  }
  numOfAdmins = adminResults[0].count;

  // Query for educators
  db.query('SELECT COUNT(*) as count FROM users WHERE role = ?', ['educator'], (err, educatorResults) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching educator data' });
    }
    numOfEducators = educatorResults[0].count;

    // Send combined response
    res.status(200).json({
      users: {
        admins: numOfAdmins,
        educators: numOfEducators,
      },
    });
  });
});
});

app.put('/api/resetPassword', async (req, res) => {
  const {password, email} = req.body;
  const query = 'UPDATE users SET `password` = ? WHERE email = ?';
  hashedPass = await hashPassword(password);
  console.log(hashedPass, email);
  db.query(query, [hashedPass, email], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error updating data' });
    } else if (results.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'User updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
})

app.post('/api/getAllUsers', async (req, res) => {
  const {email} = req.body;
  const query = 'SELECT * FROM `users` WHERE email = ?';
  db.query(query,  email, async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Server error!' });
    }
    console.log(results, email);
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





