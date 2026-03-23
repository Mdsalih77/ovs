import Setting from "../models/settingmodel.js";
import User from "../models/usermodel.js";
import Candidate from "../models/candidatemodel.js";
import Vote from "../models/votemodel.js";

export const togglePublish = async (req, res) => {
  const { publishResult } = req.body;

  let setting = await Setting.findOne();
  if (!setting) setting = new Setting();

  setting.publishResult = publishResult;
  await setting.save();

  res.json({ publishResult });
};

export const getPublishStatus = async (req, res) => {
  let setting = await Setting.findOne();
  if (!setting) setting = await Setting.create({});
  res.json(setting);
};

// ✅ ADD THIS
export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const candidates = await Candidate.countDocuments();
    const votes = await Vote.countDocuments();
    const setting = await Setting.findOne();

    res.json({
      users,
      candidates,
      votes,
      publishResult: setting?.publishResult || false,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
};
