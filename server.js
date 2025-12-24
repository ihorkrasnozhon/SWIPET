import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';


const app = express();
const db = new sqlite3.Database('./swipet.db');

app.use(cors());
app.use(express.json());

db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    bio TEXT,
    image TEXT
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

});

app.get('/api/pets', (req, res) => {
    db.all("SELECT * FROM pets", [], (err, rows) => {
        if(err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.post('/api/register', async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        const salt = 10;
        const password_hash = await bcrypt.hash(password, salt);

        const sql = "INSERT INTO users(full_name, email, password_hash) VALUES (?, ?, ?)";
        db.run(sql, [fullName, email, password_hash], function (err) {
            if(err) {
                if(err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({
                        message: "This email is already registered"
                    });
                }
                return res.status(500).json({
                    message: "Internal database error"
                });
            }
            res.status(201).json({
                message: "Account created succesfully!",
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error" + error
        });
    }
});

app.listen(3001, () => console.log('Server is running on http://localhost:3001'));