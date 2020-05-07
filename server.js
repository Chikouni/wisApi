"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Models = require("./models");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  Mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const NoteModel = Mongoose.model("Note");

  server.route({
    method: "POST",
    path: "/note",
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
        var note = new NoteModel(request.payload);
        var result = await note.save();
        return h.response("Nouvelle note créé : " + result.note);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  });

  server.route({
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
  });

  server.route({
    method: "GET",
    path: "/note/{id}",
    handler: async (request, h) => {
      try {
        var person = await NoteModel.findById(request.params.id).exec();
        return h.response(person);
      } catch (error) {
        return h.response(error).code(500);
      }
    },
  });

  server.route({
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
  });

  server.route({
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
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
