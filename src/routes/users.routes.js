const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const UserAvatarController = require('../controllers/UserAvatarController')

const ensureAutenticated = require('../middleware/ensureAutenticated')

const uploadConfig = require('../configs/upload')

const multer = require('multer');
const upload = multer(uploadConfig.MULTER)//inicializei

const usersRouter = Router()

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


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


usersRouter.post('/', usersController.create)

// como esta sendo passado o id dentro do middleware foi excluido o :id do / 
usersRouter.put('/', ensureAutenticated, usersController.update)
// patch é quando quero atualizar mais de campo em especifico no banco de dados
// arquivos de imagem n guarda dentro do banco pq são muito pesados mais guardamos a referencia/endereço onde a imagem esta armazenada
// imagens se guarda dentro de pasta
// o single que vai armazenar uma imagem ("avatar") nome do campo que vai trazer esse arquivo
usersRouter.patch('/avatar', ensureAutenticated, upload.single('avatar'), userAvatarController.update)

module.exports = usersRouter;