import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

let movies 
// 1. Find all movies which are not sequel
//    select 'title', 'genre' and 'released' year
//    order by 'released' year in descending order
//    return the first 5 matched. 
movies = await prisma.movie.findMany({
    where: { sequel: false },
    select: { title: true, genre: true, released: true },
    orderBy: [ { released: 'desc' } ],
    skip: 0, 
    take: 5
  })
console.log(movies)

// 2. Find all movies acted by "Morgan Freeman" or "Leonardo DiCaprio"
//    select 'title' and 'stars'
movies = await prisma.movie.findMany({
     where: { OR: [
        {stars: { contains: "Morgan Freeman" }} , 
        {stars: { contains: "Leonardo DiCaprio" }} 
     ] },
     select: { title: true, stars: true },
   })
console.log(movies)

// 3. 


/*
   Filtering and Sorting
   https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting

   Prisma Client API reference
   https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators
*/
