require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pontos = require("./src/Routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(pontos);

const porta = process.env.API_PORT;

app.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
})