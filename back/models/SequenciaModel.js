const mongoose = require("mongoose");

// Define o esquema para o modelo Sequencia
const SequenciaSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, default: -1 }, // Campo _id do tipo Number, obrigatório, com valor padrão -1
    sequencia: { type: String, required: [true, "Sequência é obrigatória!"] }, // Campo sequencia do tipo String, obrigatório, com mensagem de erro customizada
    individuo: { type: Number, ref: "individuo" }, // Campo individuo do tipo Number, referenciando o modelo "individuo"
  },
  {
    versionKey: false, // Desativa a inclusão do versionKey (__v) nos documentos
  }
);

// Middleware (hook) executado antes de salvar um documento
SequenciaSchema.pre("save", async function (next) {
  if (this._id < 1) { // Se _id for menor que 1 (ou seja, ainda não foi atribuído)
    const Model = mongoose.model("sequencia", SequenciaSchema); // Obtém o modelo Sequencia
    const objMaxId = await Model.findOne().sort({ _id: -1 }); // Encontra o documento com o maior _id
    this._id = objMaxId == null ? 1 : objMaxId._id + 1; // Define o novo _id baseado no maior encontrado ou começa em 1 se nenhum documento existir
  }
  next(); // Chama o próximo middleware
});

// Exporta o esquema e o modelo Sequencia
module.exports = {
  SequenciaSchema: SequenciaSchema, // Exporta o esquema SequenciaSchema
  SequenciaModel: mongoose.model("sequencia", SequenciaSchema), // Exporta o modelo SequenciaModel baseado no esquema SequenciaSchema
};
