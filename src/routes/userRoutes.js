const express = require("express");
const {
  getUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Rota para obter todos os usuários
router.get("/", getUsers);

//Rota para obter um usuário específico
router.get("/:id", findUserById);

// Rota para criar um novo usuário
router.post("/", createUser);

// Rota para atualizar um usuário específico.
router.put("/:id", updateUser);

//Rota para excluir um usuário específico
router.delete("/:id", deleteUser);

module.exports = router;
