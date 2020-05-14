const noteController = require("../controllers/api/noteController");

const basePath = "/api/v1/note";
const getPath = basePath + "s";
const pathWithId = basePath + "/{id}";

module.exports = [
  {
    method: "POST",
    path: basePath,
    options: noteController.noteOptions,
    handler: noteController.addNote,
  },
  {
    method: "GET",
    path: getPath,
    handler: noteController.getNotes,
  },
  {
    method: "PUT",
    path: pathWithId,
    options: noteController.noteOptions,
    handler: noteController.updateNote,
  },
  {
    method: "DELETE",
    path: pathWithId,
    handler: noteController.deleteNote
  },
];
