import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
   title: { type: String, required: true },
  content: { type: String, required: true },
  country: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', dataSchema);

export default Data;