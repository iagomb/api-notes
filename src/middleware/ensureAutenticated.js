const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAutenticated(req, res, next) {
    //pegar a autorização do cabeçalho
    const authHeader = req.headers.authorization;

    // fazer verificação se tem ou n
    if (!authHeader) {
        throw new AppError("JWT Token não informado", 401)
    }

    // pegar o token da autorização do cabeçalho
    // o split pegahjy a string e separa ela pra um vetor/array
    const [, token] = authHeader.split(' ')// Bearer xxxxxxxx
    
    try {
        // o verify 2 parametros 1 token e 2 passa o secret, verifica se o token é valido

        // payload sub é o conteudo que esta armazenado no token
        // sub: user_id álias 
        const {sub: user_id} = verify(token, authConfig.jwt.secret)

        //dentro do req vou criar uma propriedade que n existe aindo ex: req.user
        req.user = {
            // volta a ser numero para o banco de dados pq foi convertido para um texto la na session formando o token 
            id: Number(user_id),
        }

        return next();
    } catch {
        throw new AppError("JWT Token Inválido", 401)
    }
}

module.exports = ensureAutenticated;