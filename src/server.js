require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const port = process.env.PORT || 3000;

// Conectar ao banco de dados e iniciar o servidor
connectDatabase();
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
