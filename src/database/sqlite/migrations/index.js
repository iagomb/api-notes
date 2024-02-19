const sqliteConnection = require('../index')
const createUsers = require('./createUsers')

// migration é automação de tabelas em seu projeto
async function migrationsRun(){
    // schemas são as tabelas que o banco vai ter, caso tenha mais uma é separado por virgula no array
    const schemas = [
        createUsers
    ].join('')

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(err => console.log(err))
}

module.exports = migrationsRun