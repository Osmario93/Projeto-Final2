const SequenciaCtrl = require("../controllers/SequenciaCtrl");
const express = require("express");

const Router = express.Router();

Router.get("/", SequenciaCtrl.listar);
Router.get("/:id", SequenciaCtrl.buscarPorId);
Router.post("/", SequenciaCtrl.salvar);
Router.put("/:id", SequenciaCtrl.atualizar);
Router.delete("/:id", SequenciaCtrl.excluir);

module.exports = Router;
