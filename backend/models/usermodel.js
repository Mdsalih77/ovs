import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  aadhaar: String,
  emailid:String,
  hasVoted: {
    type: Boolean,
    default: false  
  }
});

export default mongoose.model("User", userSchema);
