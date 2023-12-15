import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import cors from '@fastify/cors'
import { MessageRoutes, orderRoutes, productRoutes, userRoutes } from "./routes"

const app = fastify() // Criação do servidor, o servidor começa aqui ( Http ).

app.register(cors, {
  origin: true
})

app.register(productRoutes)
app.register(orderRoutes)
app.register(userRoutes)
app.register(MessageRoutes)

app.listen({ // Isso aqui serve para fazer o servidor ouvir uma 'URL'
  port: 3333,
}).then((_res) => {
  console.log('Servidor HTTP rodando em: http://localhost:3333/')
})

