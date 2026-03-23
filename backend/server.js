import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboardroutes.js";
import userRoutes from "./routes/userroutes.js";
import candidateRoutes from "./routes/candidateroutes.js";
import voteRoutes from "./routes/voteroutes.js";
import resultRoutes from "./routes/resultroutes.js";
import authRoutes from "./routes/authroutes.js";
import otproutes from "./routes/otproutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/otp", otproutes);




app.get("/", (req, res) => {
  res.send("API is running ");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("MongoDB error ", error.message);
  });
