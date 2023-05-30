const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

// Connect to SQLite database
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// Create table
db.run('CREATE TABLE counter (count INTEGER)');

// Initialize counter
db.run('INSERT INTO counter(count) VALUES(?)', [0]);

app.use(cors());

// Get counter value
app.get('/counter', (req, res) => {
    db.get('SELECT count FROM counter', [], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(row);
    });
});

// Update counter value
app.post('/counter/:newCount', (req, res) => {
    const newCount = req.params.newCount;
    db.run(`UPDATE counter SET count = ?`, [newCount], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ message: 'Counter updated!' });
    });
});

app.listen(3000, () => console.log('Server started on port 3000'));