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

app.delete('/api/deleteDataRepo/:id', (req, res) => {
  const repoId = req.params.id;
  console.log(repoId);
  db.query(
    `DELETE FROM data_repo WHERE id = ?`,
    [repoId],
    (err, deleteResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting Repository', details: err });
      }

      res.status(200).json({
        message: 'Repository successfully',
        DataRepoDeleted: deleteResult.affectedRows,
      });
    }
  );
})

app.delete('/api/deleteCourseWithHistory/:id', (req, res) => {
  const courseId = req.params.id;
  // First, delete dependent rows from course_history
  db.query(
    `DELETE FROM course_history WHERE course_id = ?`,
    [courseId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting dependent rows', details: err });
      }

      // Then, delete the parent row from courses
      db.query(
        `DELETE FROM courses WHERE id = ?`,
        [courseId],
        (err, deleteResult) => {
          if (err) {
            return res.status(500).json({ error: 'Error deleting course', details: err });
          }

          res.status(200).json({
            message: 'Course and dependent data deleted successfully',
            courseHistoryDeleted: result.affectedRows,
            courseDeleted: deleteResult.affectedRows,
          });
        }
      );
    }
  );
});

app.get('/api/getDataRepo', async (req, res) => {
  try {
    db.query('SELECT * FROM data_repo', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/api/sendDataToRepo', async (req, res) => {
  const course = req.body.user.id; // Assuming `req.body.user` contains the course object
  console.log(course);
  // First, insert the data into the data_repo table
  db.query(
    `INSERT INTO data_repo (course_name, topic, objective, type) values (?,?,?,?)`,
    [course.course_name, course.course_topics, course.objectives, course.type],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error during insert' });
      }

      // If insertion is successful, proceed with deletion
      db.query(
        `DELETE FROM course_history WHERE course_id = ?`,
        [course.id],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error deleting dependent rows', details: err });
          }
      
          // Then, delete the parent row from courses
          db.query(
            `DELETE FROM courses WHERE id = ?`,
            [course.id],
            (err, deleteResult) => {
              if (err) {
                return res.status(500).json({ error: 'Error deleting course', details: err });
              }
              res.status(200).json({
                message: 'Course and dependent data deleted successfully',
                deleteResult: deleteResult,
              });
            }
          );
        }
      );
    }
  );
});


app.post('/api/getHistory', async (req, res) => {
  const historyId = req.body.user.id;
  console.log(historyId);
  db.query(
    `SELECT * FROM course_history where course_id = ?`,
    [historyId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No user found with the given ID' });
      }
      res.status(200).json({result});
      console.log(result);
    }
  );
});

app.get('/api/getAssesments', (req, res) => {

  const query = `SELECT * FROM assesments`;  // Use ?? to safely insert table name to prevent SQL injection

  // Query the database
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.status(200).json(result); // Send the result as a JSON response
  });
});

app.get('/api/getCourses', async (req, res) => {
  try {
    db.query('SELECT * FROM courses', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Or use diskStorage for saving files to disk
const upload = multer({ storage });

// Route to handle form submission
app.post('/api/addCourses', upload.single('attachment'), async (req, res) => {
  const { topics, course, description, objectives, educator} = req.body;
  const attachments = req.file ? req.file.originalname : null; // Use req.file for the uploaded file

  console.log("Form Data:", req.body); // Text fields
  console.log("Uploaded File:", req.file); // File details

  try {
    db.query(
      'INSERT INTO courses (course_name, course_topics, status, educator_name, description, objectives, attachment, type) VALUES (?, ?, "In Progress", ?, ?, ?, ?, "Material")',
      [course, topics, educator, description, objectives, attachments],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result);
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/deleteCourse', async (req, res) => {
  const { course_name } = req.body; // Get course_name from the body
  console.log(course_name);
  try {
    // Use parameterized query to prevent SQL injection
    db.query(
      `DELETE FROM courses WHERE course_name = ?`,
      [course_name], // This array will prevent SQL injection
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Course deleted successfully', result });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});



app.put('/api/updateUser', async (req, res) => {
  const { name, email, username, password, role, id } = req.body; // Get user ID and new role from the request body
  hashedPass = await hashPassword(password);
  // Check if required data is provided
  if (!name || !email || !username || !password || !role || !id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Update query
  db.query(
    'UPDATE users SET name = ?, email = ?, username = ?, password = ?, role = ? WHERE id = ?',
    [name, email, username, hashedPass, role, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No user found with the given ID' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    }
  );
});
// const y = async (pass) => {
//   x = await hashPassword(pass);
//   return x;
// }

const queryAsync = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        reject(err);  // Reject on error
      } else {
        resolve(results);  // Resolve with results
      }
    });
  });
};

app.post('/api/addUsers', async (req, res) => {
  const { user } = req.body;
  console.log(user.name);
  const hashedPass = await hashPassword(user.password);
  
  const query = `INSERT INTO users (name, email, username, password, role) VALUES (?, ?, ?, ?, ?)`;

  try {
    // Await the database query inside the try-catch block
    const results = await queryAsync(query, [user.name, user.email, user.username, hashedPass, user.role]);
    res.status(200).json({ message: 'User added successfully', results });
  } catch (err) {
    // Catch any errors, including those from the query
    console.error("Database error:", err);
    res.status(500).json({ error: 'Database error' });
  }
});


app.get('/api/getCourseManagement', (req, res) => {
  const query = 'SELECT * FROM course_management';  // Adjust this query as per your database schema
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


app.post('/api/deleteUsers', (req, res) => {
  const userId = req.body.userId;

  // Use parameterized queries to avoid SQL injection
  const query = 'DELETE FROM users WHERE id = ?';
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Send back the result of the deletion
    res.status(200).json({ message: 'User deleted successfully', result });
  });
});


app.get('/api/getUsers', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

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
            message: 'no match',
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





