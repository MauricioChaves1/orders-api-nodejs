export function reqLoginDto(data) {

    const { email, password } = data;

    if (!email || typeof email !== "string") {
        throw new Error("Email é obrigatório");
    }

    if (!password || typeof password !== "string") {
        throw new Error("Senha é obrigatória");
    }

    return {
        email,
        password
    };

}