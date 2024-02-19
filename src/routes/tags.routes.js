const { Router } = require('express')
const TagsController = require('../controllers/TagsController')
const ensureAutenticated = require('../middleware/ensureAutenticated')
const tagsRouter = Router()

const tagsController = new TagsController()


//middleware é uma função que coloca na rota para acessar a requisição e a resposta para fazer um verificação ou tratamento antes de mandar pro destino
//next chama a proxima função da pilha nesse caso usersController.create
// function myMiddleware(req, res, next) {
//     console.log("Você passou pelo Middleware");

//     if (!req.body.isAdmin) {
//         return res.json({
//             message: "user unauthorized"
//         })
//     }
//     next()
// }

// todas as rotas
//usersRouter.use(myMiddleware)

//rota especifica
//usersRouter.post('/', myMiddleware, usersController.create)



tagsRouter.get('/',ensureAutenticated, tagsController.index)




module.exports = tagsRouter;