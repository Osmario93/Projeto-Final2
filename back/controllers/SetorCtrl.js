const SetorModel = require("../models/SetorModel");

class SetorCtrl {
  // Método assíncrono para listar todos os setores
  async listar(req, res) {
    try {
      const resultado = await SetorModel.find({});
      res.json(resultado); // Retorna os setores encontrados como JSON
    } catch (err) {
      res.status(500).send("Erro ao listar setores"); // Retorna status 500 em caso de erro
    }
  }

  // Método assíncrono para buscar um setor por ID
  async buscarPorId(req, res) {
    try {
      const id = req.params.id; // Obtém o ID do parâmetro da requisição
      const setor = await SetorModel.findById(id);
      res.json(setor); // Retorna o setor encontrado como JSON
    } catch (err) {
      res.status(500).send("Erro ao buscar setor por ID"); // Retorna status 500 em caso de erro
    }
  }

  // Método assíncrono para salvar um novo setor
  async salvar(req, res) {
    try {
      const setor = req.body; // Obtém o corpo da requisição contendo os dados do novo setor
      const resultado = await SetorModel.create(setor); // Cria o novo setor no banco de dados
      res.json(resultado); // Retorna o resultado da criação como JSON
    } catch (err) {
      res.status(500).send("Erro ao salvar setor"); // Retorna status 500 em caso de erro
    }
  }

  // Método assíncrono para atualizar um setor existente por ID
  async atualizar(req, res) {
    try {
      const id = req.params.id; // Obtém o ID do parâmetro da requisição
      const setor = req.body; // Obtém o corpo da requisição contendo os dados atualizados do setor
      const resultado = await SetorModel.findByIdAndUpdate(id, setor, { new: true }); // Atualiza o setor pelo ID e retorna o documento atualizado
      res.json(resultado); // Retorna o setor atualizado como JSON
    } catch (err) {
      res.status(500).send("Erro ao atualizar setor"); // Retorna status 500 em caso de erro
    }
  }

  // Método assíncrono para excluir um setor por ID
  async excluir(req, res) {
    try {
      const id = req.params.id; // Obtém o ID do parâmetro da requisição
      await SetorModel.findByIdAndDelete(id); // Encontra e deleta o setor por ID
      res.send("Excluído(a) com sucesso!"); // Retorna mensagem de sucesso após a exclusão
    } catch (err) {
      res.status(500).send("Erro ao excluir setor"); // Retorna status 500 em caso de erro
    }
  }
}

module.exports = new SetorCtrl(); // Exporta uma instância única do SetorCtrl
