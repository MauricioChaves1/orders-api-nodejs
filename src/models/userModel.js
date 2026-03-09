class User {

    constructor({
        id = null,
        name,
        email,
        password
    }) {

        if (typeof name !== "string") {
            throw new Error("Precisa ser uma String");
        }

        if (typeof email !== "string") {
            throw new Error("Precisa ser uma String");
        }

        if (typeof password !== "string") {
            throw new Error("Precisa ser uma String");
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;

    }

}

export default User;