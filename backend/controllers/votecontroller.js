import Vote from "../models/votemodel.js";
import User from "../models/usermodel.js";
import Setting from "../models/settingmodel.js";

export const voteCandidate = async (req, res) => {
  try {

      const setting = await Setting.findOne();
    if (setting?.publishResult) {
      return res.status(403).json({
        message: "Voting is closed. Results already published."
      });
    }
    const userId = req.user.id;
    const candidateId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.hasVoted) return res.status(400).json({ message: "Already voted" });

    await Vote.create({ user: userId, candidate: candidateId });

    user.hasVoted = true;
    await user.save();

    res.json({ message: "Vote successful" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already voted" });
    }
    res.status(500).json({ message: err.message });
  }
};

