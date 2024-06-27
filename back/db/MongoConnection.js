const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/a1_db"; // URL de conexão com o MongoDB
const db = mongoose.connect(url); // Conecta ao banco de dados MongoDB especificado na URL

// Evento "connected" é emitido quando a conexão com o MongoDB é estabelecida com sucesso
mongoose.connection.on("connected", () => console.log("Conectado ao MongoDB!"));

// Evento "error" é emitido quando ocorre um erro durante a conexão com o MongoDB
mongoose.connection.on("error", (erro) => console.log("Erro: " + erro));

module.exports = db; // Exporta a conexão com o MongoDB
