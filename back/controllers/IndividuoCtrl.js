const IndividuoModel = require("../models/IndividuoModel").IndividuoModel;

class IndividuoCtrl {
  // Método assíncrono para listar todos os indivíduos
  async listar(req, res) {
    const resultado = await IndividuoModel.find({});
    res.json(resultado); // Retorna os resultados como JSON
  }

  // Método assíncrono para buscar um indivíduo por ID
  async buscarPorId(req, res) {
    const id = req.params.id;
    const individuo = await IndividuoModel.findOne({ _id: id });
    res.json(individuo); // Retorna o indivíduo encontrado como JSON
  }

  // Método assíncrono para salvar um novo indivíduo
  async salvar(req, res) {
    const individuo = req.body; // Obtém o corpo da requisição
    const resultado = await IndividuoModel.create(individuo); // Cria o novo indivíduo no banco de dados
    res.json(resultado); // Retorna o resultado da criação como JSON
  }

  // Método assíncrono para atualizar um indivíduo existente por ID
  async atualizar(req, res) {
    const id = req.params.id; // Obtém o ID do parâmetro da requisição
    const individuo = req.body; // Obtém o corpo da requisição contendo os dados atualizados
    const resultado = await IndividuoModel.findOneAndUpdate(
      { _id: id }, // Critério de busca: ID do indivíduo a ser atualizado
      individuo, // Dados atualizados do indivíduo
      { new: true } // Opção: Retorna o documento atualizado
    );
    res.json(resultado); // Retorna o indivíduo atualizado como JSON
  }

  // Método assíncrono para excluir um indivíduo por ID
  async excluir(req, res) {
    const id = req.params.id; // Obtém o ID do parâmetro da requisição
    await IndividuoModel.findOneAndDelete({ _id: id }); // Encontra e deleta o indivíduo por ID
    res.send("Excluído(a) com sucesso!"); // Retorna mensagem de sucesso
  }
}

module.exports = new IndividuoCtrl(); // Exporta uma instância única do IndividuoCtrl
