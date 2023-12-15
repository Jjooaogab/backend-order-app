import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { paramsSchema } from "../lib/paramsSchema";
import * as b from 'bcrypt'

export async function userRoutes(app: FastifyInstance) {

  const SALT_ROUNDS = 10

  app.post('/create/user', async (req, res) => {
    const bodySchema = z.object({
      name: z.string(),
      password: z.string().min(6),
      email: z.string().email(),
      userImg: z.string().optional(),
      role: z.string().optional(),
    })

    const { name, password, email, userImg, role } = bodySchema.parse(req.body)

    const cryptPass = await b.hash(password, SALT_ROUNDS);
    
    const user = await prisma.user.create({
      data: {
        name,
        password: cryptPass,
        email,
        userImg,
        role
      }
    })

    return user
  })

  app.put('/edit/user/', async (req) => {
    const bodySchema = z.object({
      userId: z.number(),
      name: z.string().optional(),
      password: z.string().min(6).optional(),
      email: z.string().email().optional(),
      userImg: z.string().optional(),
      role: z.string().optional(),
    })

    const { userId, name, password, email, userImg, role } = bodySchema.parse(req.body)

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name,
        password,
        email,
        userImg,
        role
      }
    })

    return user
  })

  app.get('/get/users', async () => {
    const users = await prisma.user.findMany()
    return users
  })

  app.get('/get/user/:id', async (req) => {
    const { id } = paramsSchema.parse(req.params)

    const userId = parseInt(id)

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    })

    return user
  })

  app.delete('/delete/user/:id', async (req) => {
    const { id } = paramsSchema.parse(req.params)

    const userId = parseInt(id)

    const user = await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return user
  })
}