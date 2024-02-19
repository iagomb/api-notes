const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorange = require("../providers/DiskStorange");

class UserAvatarController{
    async update(req, res){
        const user_id = req.user.id;
        // PEGANDO A IMAGEM DA URL
        const avatarFilename = req.file.filename;

        const diskStorange = new DiskStorange()

        //{user_id} so pode ser assim se o user_id for igual a user_id do banco 
        const [user] = await knex('users')
            .where({id: user_id})

        if (!user){
            throw new AppError('Somente usuários autenticados podem mudar o avatar', 401)
        }

        // se existe um avatar delete se n exite no primeiro momento tbm delete
        if (user.avatar) {
            diskStorange.deleteFile(user.avatar);
        }

        const filename = await diskStorange.saveFile(avatarFilename)
        user.avatar = filename;
    
        await knex('users').update(user).where({id: user_id})

        return res.json(user)
    }
}

module.exports = UserAvatarController;