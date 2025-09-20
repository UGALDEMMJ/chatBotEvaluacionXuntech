import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  name:     { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true },
  token :    { type: String, trim: true }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);