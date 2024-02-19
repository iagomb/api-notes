const { compare } = require('bcryptjs');
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

const authConfig = require('../configs/auth')

const { sign } = require('jsonwebtoken')

class SessionsController{
    async create(req, res){
        const { email, password} = req.body

        const [user] = await knex('users').where({ email })

        // verificar se o email existe
        // tentei reduzi o numero de if em 1 so ex: if(!user || !passwordMatched) mais da erro no compare do bcrypt
        if (!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        const passwordMatched = await compare(password, user.password)

        // verificar se a senha é a msm do banco de dados
        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401)
        }

        // desistrutura
        const { secret, expiresIn } = authConfig.jwt;
        // sign recebe 3 parametros 1 {} vazio, 2 o secret 3 {subject com a expiração do token}
        const token = sign({}, secret, {
            //subject é o conteudo que eu quero inserir dentro do token, e nesse caso o user.id mais sendo covertido para string
            subject: String(user.id),
            expiresIn
        })
        return res.json({user, token})
    }
}

module.exports = SessionsController