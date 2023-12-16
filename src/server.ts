import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import cors from '@fastify/cors'
import { MessageRoutes, orderRoutes, productRoutes, userRoutes } from "./routes"
import dotenv from 'dotenv'

const app = fastify() // Criação do servidor, o servidor começa aqui ( Http ).

app.register(cors, {
  origin: true
})

dotenv.config()

app.register(productRoutes)
app.register(orderRoutes)
app.register(userRoutes)
app.register(MessageRoutes)

const port = process.env.PORT || '3333'
const portInt = parseInt(port)

app.listen({ // Isso aqui serve para fazer o servidor ouvir uma 'URL'
  port: portInt,
}).then((_res) => {
  console.log(`Servidor HTTP rodando em: http://localhost:${port}/`)
})

