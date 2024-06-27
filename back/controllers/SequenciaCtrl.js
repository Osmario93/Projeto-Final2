const SequenciaModel = require("../models/SequenciaModel").SequenciaModel;

class SequenciaCtrl {
  // Método assíncrono para listar todas as sequências, populando o campo 'individuo'
  async listar(req, res) {
    const resultado = await SequenciaModel.find({}).populate("individuo");
    res.json(resultado); // Retorna as sequências encontradas como JSON
  }

  // Método assíncrono para buscar uma sequência por ID
  async buscarPorId(req, res) {
    const id = req.params.id; // Obtém o ID do parâmetro da requisição
    const sequencia = await SequenciaModel.findOne({ _id: id });
    res.json(sequencia); // Retorna a sequência encontrada como JSON
  }

  // Método assíncrono para salvar uma nova sequência
  async salvar(req, res) {
    const sequencia = req.body; // Obtém o corpo da requisição contendo os dados da sequência
    const resultado = await SequenciaModel.create(sequencia); // Cria a nova sequência no banco de dados
    res.json(resultado); // Retorna o resultado da criação como JSON
  }

  // Método assíncrono para atualizar uma sequência existente por ID
  async atualizar(req, res) {
    const id = req.params.id; // Obtém o ID do parâmetro da requisição
    const sequencia = req.body; // Obtém o corpo da requisição contendo os dados atualizados da sequência
    const resultado = await SequenciaModel.findOneAndUpdate(
      { _id: id }, // Critério de busca: ID da sequência a ser atualizada
      sequencia, // Dados atualizados da sequência
      { new: true } // Opção: Retorna o documento atualizado
    );
    res.json(resultado); // Retorna a sequência atualizada como JSON
  }

  // Método assíncrono para excluir uma sequência por ID
  async excluir(req, res) {
    const id = req.params.id; // Obtém o ID do parâmetro da requisição
    await SequenciaModel.findOneAndDelete({ _id: id }); // Encontra e deleta a sequência por ID
    res.send("Excluído(a) com sucesso!"); // Retorna mensagem de sucesso
  }
}

module.exports = new SequenciaCtrl(); // Exporta uma instância única do SequenciaCtrl
