import express from "express";
import {
  getcandidates,
  createcandidate,
  updatecandidate,
  deletecandidate
} from "../controllers/candidatecontrolle.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getcandidates);
router.post("/", upload.single("image"), createcandidate);
router.put("/:id", upload.single("image"), updatecandidate);
router.delete("/:id", deletecandidate);

export default router;
