/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function productRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await prisma.product.findMany()
    return products
  })

  app.get('/product/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return product
  })

  app.post('/product', async (req) => {
    const bodySchema = z.object({
      name: z.string(),
      value: z.coerce.number().default(0)
    })

    const { name, value } = bodySchema.parse(req.body)

    const product = await prisma.product.create({
      data: {
        value,
        name
      }
    })

    return product
  })

  app.put('/product/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      name: z.string(),
      value: z.coerce.number().default(0)
    })

    const { name, value } = bodySchema.parse(req.body)

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        value
      }
    })

    return product
  })

  app.delete('/product/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const product = await prisma.product.delete({
      where: {
        id,
      },
    })

    return product
  })
}
