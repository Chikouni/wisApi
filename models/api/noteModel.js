const Mongoose = require("mongoose");

const noteSchema = Mongoose.Schema(
  {
    note: String,
    createdBy: { type: String, default: "Anonym" },
  },
  { timestamps: true }
);

exports.Model = Mongoose.model("Note", noteSchema);
