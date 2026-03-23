import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  publishResult: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Setting", settingSchema);
