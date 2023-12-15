import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { paramsSchema } from "../lib/paramsSchema";

export async function MessageRoutes(app: FastifyInstance) {
  app.post('/order/message/send', async (req) => {
    const bodySchema = z.object({
      content: z.string().min(10),
      userId: z.number().min(1),
      userEmail: z.string().email()
    })
    
    const { content, userId, userEmail } = bodySchema.parse(req.body)

    const message = await prisma.message.create({
      data: {
        content,
        user: {
          connect: {
            id: userId,
            email: userEmail
          }
        }
      }
    })

    return message
  })

  app.get('/order/messages/view', async (req) => {
    const message = await prisma.message.findMany()
    return message
  })

  app.delete('/order/message/delete/:id', async (req) => {
    const { id } = paramsSchema.parse(req.params)
    const idInt = parseInt(id)

    const message = await prisma.message.delete({
      where: {
        id: idInt,
      }
    })
  })
} 