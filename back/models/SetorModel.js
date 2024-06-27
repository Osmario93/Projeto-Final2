const mongoose = require("mongoose");

// Define o esquema para o modelo Setor
const SetorSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, default: -1 }, // Campo _id do tipo Number, obrigatório, com valor padrão -1
    codigo: { type: String, required: [true, "Código é obrigatório!"] }, // Campo codigo do tipo String, obrigatório, com mensagem de erro customizada
    nome: { type: String, required: [true, "Nome é obrigatório!"] }, // Campo nome do tipo String, obrigatório, com mensagem de erro customizada
  },
  {
    versionKey: false, // Desativa a inclusão do versionKey (__v) nos documentos
  }
);

// Middleware (hook) executado antes de salvar um documento
SetorSchema.pre("save", async function (next) {
  if (this._id < 1) { // Se _id for menor que 1 (ou seja, ainda não foi atribuído)
    const Model = mongoose.model("setor", SetorSchema); // Obtém o modelo Setor
    const objMaxId = await Model.findOne().sort({ _id: -1 }); // Encontra o documento com o maior _id
    this._id = objMaxId == null ? 1 : objMaxId._id + 1; // Define o novo _id baseado no maior encontrado ou começa em 1 se nenhum documento existir
  }
  next(); // Chama o próximo middleware
});

// Exporta o esquema e o modelo Setor
module.exports = {
  SetorSchema: SetorSchema, // Exporta o esquema SetorSchema
  SetorModel: mongoose.model("setor", SetorSchema), // Exporta o modelo SetorModel baseado no esquema SetorSchema
};
