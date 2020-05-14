require("../../models/api/noteModel");
const Boom = require("@hapi/boom");
const Mongoose = require("mongoose");

const NoteModel = Mongoose.model("Note");

exports.addNote = function (request) {
  try {
    return new NoteModel(request.payload);
  } catch (e) {
    throw Boom.badRequest(e);
  }
};

exports.getNotes = async () => {
  try {
    return await NoteModel.find().exec();
  } catch (e) {
    throw Boom.badRequest(e);
  }
};

exports.updateNote = async (request) => {
  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(
      request.params.id,
      request.payload,
      { returnOriginal: false }
    );
    return updatedNote;
  } catch (e) {
    throw Boom.badRequest(e);
  }
};

exports.deleteNote = async (request) => {
  try {
    const deletedNote = await NoteModel.findByIdAndDelete(request.params.id);
    return deletedNote;
  } catch (e) {
    throw Boom.badRequest(e);
  }
};
