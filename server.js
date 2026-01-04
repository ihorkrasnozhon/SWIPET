import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';
import session from 'express-session';
import sqliteStore from 'connect-sqlite3';

const app = express();
const db = new sqlite3.Database('./swipet.db');
const SQLiteStore = sqliteStore(session);


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(session({
    store: new SQLiteStore({db: 'sessions.db', dir: './'}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true
    }
}));


db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    bio TEXT,
    image TEXT,
    owner_id INTEGER,
    FOREIGN KEY(owner_id) REFERENCES users(id)
  )`);


});


app.get('/api/pets', (req, res) => {
    db.all("SELECT * FROM pets", [], (err, rows) => {
        if(err) return res.status(500).json(err);
        res.json(rows);
    });
});

app.get('/api/islogged', (req, res) => {
    if (req.session.user) {
        res.json({
            loggedIn: true,
            user: req.session.user
        });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.json({ message: "Logged out!" });
});


app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Internal database error" });
        }

        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(isMatch) {
            req.session.user = {
                id: user.id,
                fullName: user.full_name
            };
            res.json({
                message: "Successfully logged in!",
                user: req.session.user
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
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

app.post('/api/pets', (req, res) => {
    if(!req.session || !req.session.user) {
        return res.status(401).json({message: "Unauthorized user"});
    }

    const {name, age, bio, image} = req.body;
    const ownerId = req.session.user.id;

    const sql = "INSERT INTO pets (name, age, bio, image, owner_id) VALUES (?, ?, ?, ?, ?)";

    db.run(sql, [name, age, bio, image, ownerId], function(err) {
        if (err) {
            return res.status(500).json({message: "Error while saving"});
        }
        res.status(201).json({message: "Pet posted succesfully", petId: this.lastID});
    });
});

app.listen(3001, () => console.log('Server is running on http://localhost:3001'));
