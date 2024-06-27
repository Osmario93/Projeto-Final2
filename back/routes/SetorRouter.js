const SetorCtrl = require("../controllers/SetorCtrl");
const express = require("express");

const Router = express.Router();

Router.get("/", SetorCtrl.listar);
Router.get("/:id", SetorCtrl.buscarPorId);
Router.post("/", SetorCtrl.salvar);
Router.put("/:id", SetorCtrl.atualizar);
Router.delete("/:id", SetorCtrl.excluir);

module.exports = Router;
