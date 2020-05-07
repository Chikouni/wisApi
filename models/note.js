const Mongoose = require("mongoose");

const noteModel = Mongoose.Schema(
  {
    note: String,
    createdBy: { type: String, default: "Anonym" },
  },
  { timestamps: true }
);

const Note = (module.exports = Mongoose.model("Note", noteModel));
