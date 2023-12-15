import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { paramsSchema } from "../lib/paramsSchema";
import { z } from 'zod'

export async function orderRoutes(app: FastifyInstance) {
  app.get('/orders', async () => {
    const products = await prisma.order.findMany()
    return products
  })

  app.get('/order/:id', async (req) => {
    const { id } = paramsSchema.parse(req.params)

    const product = await prisma.order.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return product
  })

  app.post('/order/open/max-12', async (req) => {
    const bodySchema = z.object({
      number: z.number().int().min(1).max(12)
    })

    const { number } = bodySchema.parse(req.body)

    const orderOpened = await prisma.order.create({
      data: {
        number
      }
    })

    return orderOpened
  })

  app.get('/order/:id/products', async (req) => {
    const { id } = paramsSchema.parse(req.params)

    const orderProducts = await prisma.order.findUnique({
      where: {
        id
      },
      select: {
        product: true
      }
    })

    return [orderProducts, 'Id da mesa: ' + id ]
  })

  app.post('/order/:id/products', async (req) => {

  
    const bodySchema = z.object({
      productId: z.string().uuid(),
      qntd: z.number().int().min(1),
    })
  
    const { id } = paramsSchema.parse(req.params)
    const { productId, qntd } = bodySchema.parse(req.body)
  
    const newOrderProduct = await prisma.orderProduct.create({
      data: {     
        qntd,
        Order: {
          connect: {
            id
          },
        },
        products: {
          connect: {
            id: productId,
          },
        },
      },
    })
  
    return newOrderProduct
  })
  

  app.delete('/order/:id', async (req) => {
    const { id } = paramsSchema.parse(req.params)

    const order = await prisma.order.delete({
      where: {
        id,
      },
    })

    return order
  })
}
