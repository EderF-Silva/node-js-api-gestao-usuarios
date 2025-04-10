// Testes de Sistema para o CRUD de Usuário
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../src/app");
const User = require("../../src/models/userModel");

// Cria um servidor MongoDB em memória
let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("User Controller", () => {
  describe("POST /users", () => {
    it("Criar um novo usuário", async () => {
      const res = await request(app).post("/users").send({
        name: "Eder",
        email: "eder@email.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.user).toHaveProperty("_id");
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("Retornar erro se o e-mail for inválido", async () => {
      const res = await request(app).post("/users").send({
        name: "Eder",
        email: "email-invalido.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Email inválido.");
    });

    it("Retornar erro se o e-mail já estiver em uso", async () => {
      await User.create({
        name: "Eder",
        email: "eder@email.com",
        password: "123456",
      });

      const res = await request(app).post("/users").send({
        name: "Eder",
        email: "eder@email.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Email já está em uso.");
    });

    it("Retornar erro se a senha for muito curta", async () => {
      const res = await request(app).post("/users").send({
        name: "Eder",
        email: "eder@email.com",
        password: "123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("A senha deve ter pelo menos 6 caracteres.");
    });
  });

  describe("GET /users", () => {
    it("Lista todos os usuários sem o campo password", async () => {
      await User.create({
        name: "Eder",
        email: "email@email.com",
        password: "123456",
      });

      const res = await request(app).get("/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0]).not.toHaveProperty("password");
    });
  });

  describe("GET /users/:id", () => {
    it("Retornar um usuário existente", async () => {
      const user = await User.create({
        name: "Eder",
        email: "eder@email.com",
        password: "1234561",
      });

      const res = await request(app).get(`/users/${user._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Eder");
      expect(res.body).not.toHaveProperty("password");
    });

    it("Retorna 404 se o usuário não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/users/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /users/:id", () => {
    it("Atualizar o usuário", async () => {
      const user = await User.create({
        name: "Eder",
        email: "eder@email.com",
        password: "12345678",
      });

      const res = await request(app).put(`/users/${user._id}`).send({
        name: "Eder Silva",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.user.name).toBe("Eder Silva");
    });

    it("Retornar erro se e-mail inválido", async () => {
      const user = await User.create({
        name: "Eder",
        email: "eder@email.com",
        password: "123456",
      });

      const res = await request(app).put(`/users/${user._id}`).send({
        email: "email.com.br",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Email inválido.");
    });

    it("Retornar erro se a senha for muito curta", async () => {
      const user = await User.create({
        name: "Eder",
        email: "eder@email.com",
        password: "123456",
      });

      const res = await request(app).put(`/users/${user._id}`).send({
        password: "123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("A senha deve ter pelo menos 6 caracteres.");
    });

    it("Retonar 404 se usuário não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/users/${fakeId}`)
        .send({ name: "João Pedro" });

      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /users/:id", () => {
    it("Deletar um usuário existente", async () => {
      const user = await User.create({
        name: "Eder",
        email: "eder@email.com",
        password: "12345",
      });

      const res = await request(app).delete(`/users/${user._id}`);
      expect(res.statusCode).toBe(200);
    });

    it("Retornar 404 se o usuário não existir", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/users/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
