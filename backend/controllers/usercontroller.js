import User from "../models/usermodel.js";

export const getusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createuser = async (req, res) => {
  try {
    const { name, dob, aadhaar, emailid } = req.body;

    if (!name || !dob || !aadhaar || !emailid) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = new User({ name, dob, aadhaar, emailid });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("USER CREATE ERROR:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updateuser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};