import express from "express";
import {
  getusers,
  createuser,
  updateuser,
  deleteuser
} from "../controllers/usercontroller.js";

const router = express.Router();

router.get("/", getusers);
router.post("/", createuser);
router.put("/:id", updateuser);
router.delete("/:id", deleteuser);

export default router;
