import express from "express";
import path from "path";
import axios from "axios";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Middleware to parse JSON
app.use(express.json());

// Replace these with your actual API Gateway URLs
const POST_API_URL =
  "https://9y599prd32.execute-api.ap-south-1.amazonaws.com/dev/storedataJson";
const GET_API_URL =
  "https://9y599prd32.execute-api.ap-south-1.amazonaws.com/dev/frombucketgetdata";

// Endpoint to handle storing data (POST)
app.post("/api/storeData", async (req, res) => {
  try {
    const response = await axios.post(POST_API_URL, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ error: "Failed to store data" });
  }
});

// Endpoint to handle retrieving all data (GET)
app.get("/api/getData", async (req, res) => {
  try {
    console.log("here");
    const response = await axios.get(GET_API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
});

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
