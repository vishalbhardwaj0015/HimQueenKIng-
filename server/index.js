import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import tourRoutes from "./routes/tours.js";
import trekRoutes from "./routes/treks.js";
import hotelRoutes from "./routes/hotels.js";
import packageRoutes from "./routes/packages.js";
import contactRoutes from "./routes/contact.js";
import dreamRoutes from "./routes/dreamDestination.js";
import requestRoutes from "./routes/requests.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/treks", trekRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dream-destination", dreamRoutes);
app.use("/api/requests", requestRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
