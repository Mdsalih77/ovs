import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        let { name, dob, aadhaar , emailid } = req.body;
        dob = new Date(dob).toISOString().split("T")[0];

        const user = await User.findOne({ name, dob, aadhaar , emailid });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
