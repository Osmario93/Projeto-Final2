require("./db/MongoConnection.js"); // Importa o arquivo de conexão com o MongoDB
const express = require("express"); // Importa o framework Express
const cors = require("cors"); // Importa o middleware CORS para permitir requisições de diferentes origens

const servidor = express(); // Cria uma instância do servidor Express

servidor.use(express.json()); // Middleware para fazer o parsing de requisições JSON
servidor.use(cors()); // Middleware para habilitar o CORS (Cross-Origin Resource Sharing)

// Rotas

// Importa e utiliza o roteador IndividuoRouter para lidar com as rotas relacionadas a indivíduos
const IndividuoRouter = require("./routes/IndividuoRouter");
servidor.use("/individuos", IndividuoRouter);

// Importa e utiliza o roteador SequenciaRouter para lidar com as rotas relacionadas a sequências
const SequenciaRouter = require("./routes/SequenciaRouter");
servidor.use("/sequencias", SequenciaRouter);

// Importa e utiliza o roteador SetorRouter para lidar com as rotas relacionadas a setores
const SetorRouter = require("./routes/SetorRouter");
servidor.use("/setores", SetorRouter);

// Rota principal
servidor.get("/", function (req, res) {
  res.send("Servidor rodando..."); // Retorna uma mensagem simples indicando que o servidor está rodando
});

// Inicialização do servidor
servidor.listen(3005, function () {
  console.log("Servidor rodando em http://localhost:3005"); // Informa no console onde o servidor está rodando
});
