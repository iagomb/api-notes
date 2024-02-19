const fs = require('fs');
const path = require('path');
const uploadConfig = require('../configs/upload')

class DiskStorange{
    async saveFile(file){
        // o rename é pra mover da pasta temporaria pra upload
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        )

        return file;
    }

    async deleteFile(file){
        // PEGAR A IMAGEM PARA SER EXCLUIDA
        const filePath = path.resolve(uploadConfig.TMP_FOLDER, file);

        try {
            // stat retorna o status do arquivo ex: se ele ta aberto pro outro processo, se ta conrropido, se ta disponivel 
            await fs.promises.stat(filePath)
        } catch {
            return;
        }

        //unlink pra deletar/remove o arquivo 
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorange;