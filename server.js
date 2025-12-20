import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

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

    db.get("SELECT count(*) as count FROM pets", (err, row) => {
        if (row.count === 0) {
            db.run(`INSERT INTO pets (name, age, bio, image) VALUES 
      ('Barsik', 2, 'Expert in night running', 'https://placedog.net/400/500?random=1'),
      ('Rex', 5, 'Knows where the slippers are', 'https://placedog.net/400/500?random=2')`);
        }
    });

});

app.get('/api/pets', (req, res) => {
    db.all("SELECT * FROM pets", [], (err, rows) => {
        if(err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.listen(3001, () => console.log('Server is running on http://localhost:3001'));