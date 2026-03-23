import express from "express";
import { getStats, togglePublish , getPublishStatus } from "../controllers/dashboardcontroller.js";

const router = express.Router();

router.get("/stats", getStats);
router.get("/status", getPublishStatus); 
router.post("/publish", togglePublish);

export default router;
