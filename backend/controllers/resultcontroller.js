import Candidate from "../models/candidatemodel.js";
import Vote from "../models/votemodel.js";
import Setting from "../models/settingmodel.js";

export const getResults = async (req, res) => {
  try {
    const setting = await Setting.findOne();

    if (!setting || !setting.publishResult) {
      return res.status(403).json({
        message: "Results are not published yet"
      });
    }

    const candidates = await Candidate.find();

    const results = await Promise.all(
      candidates.map(async (c) => {
        const voteCount = await Vote.countDocuments({ candidate: c._id });

        return {
          candidateId: c._id,
          name: c.name,
          party: c.party,
          votes: voteCount
        };
      })
    );

    results.sort((a, b) => b.votes - a.votes);

    res.json(results);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};