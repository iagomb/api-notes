require('dotenv/config');
require('express-async-errors');
const migrationsRun= require('./database/sqlite/migrations');
const express = require('express');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload');
const cors = require('cors');
const PORT = process.env.SERVER_PORT || 3000;

const app = express(); //initialize express
app.use(cors())
migrationsRun()

app.use(express.json())

// express.static para servir aquivos staticos
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)




// error é pra capturar um error da requisição
// req é a requisição em sim, n precisa de nenhuma imformação aqui
// res é pra devolver a resposta 
// next é n precisa ser passodo aqui pq é um erro que a gente ta lidando mostrar o error e parar aqui
app.use((error, req, res, next) =>{
    //error do lado do cliente 
    if (error instanceof AppError) {  
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    console.log(error);

    //error do lado do servidor
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

// config on port
app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))