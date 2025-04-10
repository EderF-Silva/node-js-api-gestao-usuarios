const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Banco de Dados Conectado!");
  } catch (error) {
    console.error("Ocorreu um erro a conectar:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
