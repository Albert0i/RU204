import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const movies = await prisma.movie.findMany({
    where: { inStock: true }
  })

console.log(movies)

/*
   Prisma
   https://github.com/prisma/prisma
*/