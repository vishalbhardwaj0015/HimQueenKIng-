import { Router } from "express";
import pool from "../config/db.js";
import nodemailer from "nodemailer";

const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "Name, email and message are required" });

    const [result] = await pool.query(
      "INSERT INTO contact_requests (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone, message]
    );

    // Send confirmation email to user
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Your request has been accepted - HimQueenKing",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#f97316;">Thank You, ${name}!</h2>
            <p>Your request has been accepted. Our travel experts will review your message and get back to you within 24 hours.</p>
            <p><strong>Reference ID:</strong> #HQK-${result.insertId}</p>
            <hr style="border:1px solid #eee;" />
            <p style="color:#666;font-size:12px;">HimQueenKing - Your Gateway to the Himalayas</p>
          </div>
        `,
      });
    } catch (e) { console.log("Email failed:", e.message); }

    // Notify admin
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `New Contact Request from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <h3>New Contact Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>ID:</strong> #HQK-${result.insertId}</p>
          </div>
        `,
      });
    } catch (e) { console.log("Admin email failed:", e.message); }

    res.json({ id: result.insertId, message: "Request submitted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
