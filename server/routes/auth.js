import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) return res.status(400).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const userRole = ["admin", "staff"].includes(role) ? role : "user";
    const [result] = await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, hash, userRole]);

    const token = jwt.sign({ id: result.insertId, email, role: userRole }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: result.insertId, name, email, role: userRole } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: rows[0].id, email: rows[0].email, role: rows[0].role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: rows[0].id, name: rows[0].name, email: rows[0].email, role: rows[0].role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
