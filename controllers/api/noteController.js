const NoteService = require("../../services/api/noteService");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

exports.noteOptions = {
  validate: {
    payload: Joi.object({
      note: Joi.string().required(),
      createdBy: Joi.string(),
    }),
    failAction: (request, h, error) => {
      return error.isJoi
        ? h.response(error.details[0]).takeover()
        : h.response(error).takeover();
    },
  },
};

exports.addNote = async (request, h) => {
  try {
    var note = await NoteService.addNote(request);
    var result = await note.save();
    return h.response("Nouvelle note créé : " + result.note);
  } catch (error) {
    return h.response(error).code(500);
  }
};

exports.getNotes = async (request, h) => {
  try {
    var notes = await NoteService.getNotes();
    return h.response(notes);
  } catch (error) {
    return h.response(error).code(500);
  }
};

exports.getNote = async (request, h) => {
  try {
    var notes = await NoteService.getNote(request);
    return h.response(notes);
  } catch (error) {
    return h.response(error).code(500);
  }
};

exports.updateNote = async (request, h) => {
  try {
    var result = await NoteService.updateNote(request);
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};

exports.deleteNote = async (request, h) => {
  try {
    var result = await NoteService.deleteNote(request);
    return h.response(result);
  } catch (error) {
    return h.response(error).code(500);
  }
};
