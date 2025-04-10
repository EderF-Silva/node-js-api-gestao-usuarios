// Testes unitário para a função de validação de e-mail

const validateEmail = require("../../src/utils/validate");

describe("Validação de e-mail", () => {
  it("deve retornar true para e-mails válidos", () => {
    expect(validateEmail("teste@email.com")).toBe(true);
  });

  it("deve retornar false para e-mails inválidos", () => {
    expect(validateEmail("email.com")).toBe(false);
  });
});
