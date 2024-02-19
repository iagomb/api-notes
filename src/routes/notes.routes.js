const { Router } = require('express')
const NotesController = require('../controllers/NotesController')
const ensureAutenticated = require('../middleware/ensureAutenticated')
const notesRouter = Router()

const notesController = new NotesController()


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

// para todas as rotas
//usersRouter.use(myMiddleware)

//rota especifica
//usersRouter.post('/', myMiddleware, usersController.create)
notesRouter.use(ensureAutenticated)

notesRouter.post('/', notesController.create)
notesRouter.get('/:id', notesController.show)
notesRouter.delete('/:id', notesController.delete)
notesRouter.get('/', notesController.index)


module.exports = notesRouter;