import express from "express";
import { getResults } from "../controllers/resultcontroller.js";

const router = express.Router();

router.get("/", getResults);

export default router;
