import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },
    party: {
      type: String,
      required: true
    },
    image: {
      type: String 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", candidateSchema);
