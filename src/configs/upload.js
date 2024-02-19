const path  = require('path')
const multer = require('multer')
const crypto = require('crypto')

// Nomes de arquivos de configuração são em caixa alta
// --- PRIMEIRO CRIAR UMA PASTA TEMPORARIA ---
// tmp pasta temporaria
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
// --- SEGUNDO CRIAR UMA PASTA DE UPLOAD ONDE VÃO FICAR AS IMAGENS --
// onde a imagem vai ficar
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')

// CONFIGUNRAR O MULTER
const MULTER = {
    storage: multer.diskStorage({
        // destination vai envia a imagem para pasta temporaria quando carregar o aplicação
        destination: TMP_FOLDER,
        // filename nome do arquivo e o crypto é pra gerar um hash aleatorio pra combinar com o nome da imagem para garantir que n tenha imagens duplicadas e uma imagem n sobreponha a outra
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            // fileHash para gerar uma hash e concatenar com o nome original da imagem
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}