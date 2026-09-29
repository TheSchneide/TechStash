const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tech_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.get("/api/techs", (req, res) => {
    const sql = "SELECT * FROM techs";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json(results);
    });
});

app.get("/api/techs/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "SELECT * FROM techs WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Tech not found" });
        }
        res.json(results[0]);
    });
});

app.post("/api/techs", (req, res) => {
    const { name, category, condition, price, status } = req.body;
    const sql = `
        INSERT INTO techs (name, category, ` + "`condition`" + `, price, status)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, category, condition, price, status], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({
            message: "Tech added successfully",
            id: result.insertId
        });
    });
});

app.put("/api/techs/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, category, condition, price, status } = req.body;
    const sql = `
        UPDATE techs 
        SET name = ?, category = ?, ` + "`condition`" + ` = ?, price = ?, status = ?
        WHERE id = ?
    `;
    db.query(sql, [name, category, condition, price, status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tech not found" });
        }
        res.json({ message: "Tech updated successfully" });
    });
});

app.delete("/api/techs/:id", (req, res) => {
    const id = Number(req.params.id);
    const sql = "DELETE FROM techs WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tech not found" });
        }
        res.json({ message: "Tech deleted successfully" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});