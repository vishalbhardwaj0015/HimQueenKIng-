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
    const { name, email, phone, dreamDestination, travelDates, budget, travelers, specialRequests } = req.body;
    if (!name || !email || !dreamDestination) return res.status(400).json({ error: "Name, email and dream destination are required" });

    const [result] = await pool.query(
      "INSERT INTO dream_requests (name, email, phone, dream_destination, travel_dates, budget, travelers, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, phone, dreamDestination, travelDates, budget, travelers, specialRequests]
    );

    // Confirmation email to user
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: `Dream Trip to ${dreamDestination} - HimQueenKing`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h2 style="color:#f97316;">Dream Received!</h2>
            <p>Thank you, <strong>${name}</strong>! Our travel experts are working on your dream trip to <strong>${dreamDestination}</strong>.</p>
            <p><strong>Reference ID:</strong> #HQK-DREAM-${result.insertId}</p>
            <h4>What happens next?</h4>
            <ul>
              <li>Our team will review your dream destination</li>
              <li>We'll design a custom itinerary within 24 hours</li>
              <li>You'll receive a detailed plan at your email</li>
            </ul>
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
        subject: `New Dream Trip Request: ${dreamDestination} from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <h3>New Dream Destination Request</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Dream Destination:</strong> ${dreamDestination}</p>
            <p><strong>Travel Dates:</strong> ${travelDates || "Flexible"}</p>
            <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
            <p><strong>Travelers:</strong> ${travelers}</p>
            <p><strong>Special Requests:</strong> ${specialRequests || "None"}</p>
          </div>
        `,
      });
    } catch (e) { console.log("Admin email failed:", e.message); }

    res.json({ id: result.insertId, message: "Dream request submitted successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
