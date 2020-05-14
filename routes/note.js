const Mongoose = require("mongoose");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const NoteModel = Mongoose.model("Note");

module.exports = [
  {
    method: "POST",
    path: "/note",
    options: {
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
    },
    handler: async (request, h) => {
      try {
        var note = new NoteModel(request.payload);
        var result = await note.save();
        return h.response("Nouvelle note créé : " + result.note);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/notes",
    handler: async (request, h) => {
      try {
        var notes = await NoteModel.find().exec();
        return h.response(notes);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "PUT",
    path: "/note/{id}",
    options: {
      validate: {
        payload: Joi.object({
          note: Joi.string().required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: async (request, h) => {
      try {
        var result = await NoteModel.findByIdAndUpdate(
          request.params.id,
          request.payload,
          { returnOriginal: false }
        );
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
  {
    method: "DELETE",
    path: "/note/{id}",
    handler: async (request, h) => {
      try {
        var result = await NoteModel.findByIdAndDelete(request.params.id);
        return h.response(result);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  },
];
