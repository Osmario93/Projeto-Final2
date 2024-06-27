const IndividuoCtrl = require("../controllers/IndividuoCtrl"); // Importa o controlador IndividuoCtrl
const express = require("express"); // Importa o framework Express

const Router = express.Router(); // Cria um novo objeto Router do Express

// Define as rotas para o CRUD de indivíduos usando o controlador IndividuoCtrl
Router.get("/", IndividuoCtrl.listar); // Rota GET para listar todos os indivíduos
Router.get("/:id", IndividuoCtrl.buscarPorId); // Rota GET para buscar um indivíduo por ID
Router.post("/", IndividuoCtrl.salvar); // Rota POST para salvar um novo indivíduo
Router.put("/:id", IndividuoCtrl.atualizar); // Rota PUT para atualizar um indivíduo por ID
Router.delete("/:id", IndividuoCtrl.excluir); // Rota DELETE para excluir um indivíduo por ID

module.exports = Router; // Exporta o objeto Router com as rotas definidas
