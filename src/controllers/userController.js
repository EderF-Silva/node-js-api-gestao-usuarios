const User = require("../models/userModel");
const validateEmail = require("../utils/validate");

//Obter Usuários.
//Remove o Campo Password do Retorno.
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.set("Content-Range", users.length);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar os usuários" });
  }
};

// Obter um usuário específico
//Remove o Campo Password do Retorno.
const findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o usuário" }); // Retorna 500 em caso de erro no servidor
  }
};

// Criar um novo usuário
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Validar Campos
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // Validar Comprimento da Senha
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }

    //Validar Email
    if (validateEmail(email) === false) {
      return res.status(400).json({ error: "Email inválido." });
    }

    //Verifica se o Usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    //Cadastro do Usuário
    const user = new User({ name, email, password });
    await user.save();

    // Remove o campo password do retorno.
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
};

//Atualizar um usuário específico
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    // Se houver o campo email validar.
    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    // Se houver o campo password
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Remove o campo password do retorno.
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;
    res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user: userWithoutPassword,
    });
  } catch {
    res.status(500).json({ message: "Erro ao atualizar o usuário" });
  }
};

//Exclusão de Usuário
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json({ message: "Usuário excluído com sucesso." });
  } catch {
    res.status(500).json({ message: "Erro ao excluir o usuário" });
  }
};

module.exports = { getUsers, createUser, findUserById, updateUser, deleteUser };
