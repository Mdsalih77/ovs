import express from "express";
import { voteCandidate } from "../controllers/votecontroller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", auth, voteCandidate);

export default router;
