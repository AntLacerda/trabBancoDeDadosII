const express = require('express');
const pontoRoutes = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//CREATE
pontoRoutes.post("/pontos", async (req, res)=>{
    const {titulo, tipo, data, hora, lat, lng} = req.body;
    const ponto = await prisma.ponto.create({
        data: {
            titulo,
            tipo,
            data,
            hora,
            lat,
            lng
        }
    });
    return res.status(201).json(ponto);
})

//READYNG
pontoRoutes.get("/pontos", async (req, res)=>{
    const pontos = await prisma.ponto.findMany();
    return res.status(200).json(pontos);
})

module.exports = pontoRoutes;