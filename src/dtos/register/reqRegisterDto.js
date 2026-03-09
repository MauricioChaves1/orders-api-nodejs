export function reqRegisterDto(data) {

  const { name, email, password } = data;

  if (!name || typeof name !== "string") {
    throw new Error("Nome é obrigatório");
  }

  if (!email || typeof email !== "string") {
    throw new Error("Email é obrigatório");
  }

  if (!password || typeof password !== "string") {
    throw new Error("Senha é obrigatória");
  }

  if (password.length < 8) {
    throw new Error("Senha deve ter no mínimo 8 caracteres");
  }

  return {
    name,
    email,
    password
  };

}