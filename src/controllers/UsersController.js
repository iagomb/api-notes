const { hash, compare } = require('bcryptjs');
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
    /** 
     *   MAX DE METODOS PRA UM CONTROLLER
     * 
     * index - GET para lista varios registros.
     * show - GET para exibir um registro especifico.
     * create - POST para criar um registro.
     * update - PUT para atualizar um registro.
     * delete - DELETE para remover um registro.
     */

    async create(req, res){
        const { name, email, password } = req.body;

        const database = await sqliteConnection();
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso.");
        }

        const hashedPassword = await hash(password, 8)

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        //res.send(`Usuarios: ${name}, email: ${email}, senha: ${password}`)//enviar mensagem para quem solicitou esta rota
        return res.status(201).json()//enviar mensagem para quem solicitou esta rota
    }

    async update(req, res) {
        const { name, email, password, old_password } = req.body;
        // const { id } = req.params; n é mais preciso pegar o id pelo params pq id ja esta incorporado nas requisiçães 
        const user_id = req.user.id;// aqui esta incorporado

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
     
        if (!user) {
            throw new AppError('Usuário não encontrado')
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('Este e-mail já está em uso.')
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        
        if (password && !old_password) {
            throw new AppError("Este e-mail já está em uso")
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere.")
            }
            user.password = await hash(password, 8)
        }

        await database.run(`UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('now') WHERE id = ?`, [user.name, user.email, user.password, user_id]);

        return res.json()
    }
}

module.exports = UsersController;

// o controller é respossavel por processa as querisições da nossa aplicação, é a parte inteligente da aplicação, onde vai ter a regra de negocios, a camada que de fato vai executa aquilo que o usuario  solicitou ex: verificar se o usuario existe, fazer um cadastro de um produto