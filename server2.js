import cors from "cors";
import express from "express";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mt_accounts"
});

db.connect(err => {
    if (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    const sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).send("Database error");
        }

        if (results.length === 0) {
            return res.status(401).send("User not found");
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(401).send("Incorrect password");
        }

        res.send("success");
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


app.post("/submit", (req, res) => {
    const { mood, reason, journal_entry, playlist_url, playlist_name } = req.body;

    if (!mood || !journal_entry) {
        return res.status(400).json({ message: "Mood and journal entry are required." });
    }

    const sql = `
        INSERT INTO entries (mood, reason, journal_entry, playlist_url, playlist_name)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [mood, reason, journal_entry, playlist_url, playlist_name], (err, result) => {
        if (err) {
            console.error("Error inserting entry:", err);
            return res.status(500).json({ message: "Database error." });
        }

        const insertedId = result.insertId;
        const selectSql = `SELECT * FROM entries WHERE id = ?`;
        db.query(selectSql, [insertedId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching inserted entry." });
            }
            res.status(200).json(results[0]);
        });
    });
});


app.get("/entries", (req, res) => {
  const sql = `SELECT * FROM entries ORDER BY created_at DESC LIMIT 10`;

    db.query(sql, (err, results) => {
        if (err) {
        console.error("Error fetching entries:", err);
        return res.status(500).json({ message: "Database error." });
        }
        res.json(results);
    });
});

app.delete("/entries/:id", (req, res) => {
    const entryId = req.params.id;

    const sql = `DELETE FROM entries WHERE id = ?`;
    db.query(sql, [entryId], (err, result) => {
        if (err) {
            console.error("Error deleting entry:", err);
            return res.status(500).json({ message: "Database error." });
        }

        res.status(200).json({ message: "Entry deleted successfully!" });
    });
});

app.put("/entries/:id", (req, res) => {
    const entryId = req.params.id;
    const { mood, reason, journal_entry, playlist_url, playlist_name } = req.body;

    const sql = `
        UPDATE entries
        SET mood = ?, reason = ?, journal_entry = ?, playlist_url = ?, playlist_name = ?
        WHERE id = ?
    `;

    db.query(sql, [mood, reason, journal_entry, playlist_url, playlist_name, entryId], (err, result) => {
        if (err) {
            console.error("Error updating entry:", err);
            return res.status(500).json({ message: "Database error." });
        }

        res.status(200).json({ message: "Entry updated successfully!" });
    });
});