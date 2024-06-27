// Importa o arquivo de conexão com o MongoDB
require("./MongoConnection.js");

// Importa o modelo de Individuo e os dados de indivíduos a serem carregados
const IndividuoModel = require("../models/IndividuoModel").IndividuoModel;
const individuos = require("./jsons/individuos.json");

// Importa o modelo de Sequencia e os dados de sequências a serem carregadas
const SequenciaModel = require("../models/SequenciaModel").SequenciaModel;
const sequencias = require("./jsons/sequencias.json");

// Importa o modelo de Setor e os dados de setores a serem carregados
const SetorModel = require("../models/SetorModel").SetorModel;
const setores = require("./jsons/setores.json");

// Função assíncrona para carregar os dados nos modelos
async function carregar() {
  try {
    // Limpa a coleção de Indivíduos antes de carregar novos dados
    await IndividuoModel.deleteMany({});
    // Itera sobre os dados de indivíduos e cria cada um deles no banco de dados
    for (const individuo of individuos) {
      await IndividuoModel.create(individuo);
    }
    console.log("Indivíduos carregados com sucesso!");

    // Limpa a coleção de Sequências antes de carregar novos dados
    await SequenciaModel.deleteMany({});
    // Itera sobre os dados de sequências e cria cada uma delas no banco de dados
    for (const sequencia of sequencias) {
      await SequenciaModel.create(sequencia);
    }
    console.log("Sequências carregadas com sucesso!");

    // Limpa a coleção de Setores antes de carregar novos dados
    await SetorModel.deleteMany({});
    // Itera sobre os dados de setores e cria cada um deles no banco de dados
    for (const setor of setores) {
      await SetorModel.create(setor);
    }
    console.log("Setores carregados com sucesso!");
  } catch (err) {
    console.log(err); // Captura e imprime qualquer erro ocorrido durante o processo
  } finally {
    process.exit(); // Finaliza o processo Node.js, útil para tarefas de script
  }
}

carregar(); // Chama a função para iniciar o carregamento dos dados
