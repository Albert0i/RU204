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
        { stars: { contains: "Morgan Freeman" } } , 
        { stars: { contains: "Leonardo DiCaprio" } } 
     ] },
     select: { title: true, stars: true },
   })
console.log(movies)

// 3. Find all movies with rating 7~8 (inclusive)
//    select 'title' and 'rating'
movies = await prisma.movie.findMany({
   where: { AND: [
      { rating: { gte: 7 } }, 
      { rating: { lte: 8 } }
   ] },
   select: { title: true, rating: true },
 })
console.log(movies)

// 4. Find all movie with a summary that contains 'crime' or 'police'.
//    select 'id', 'title' and 'summary' 
movies = await prisma.movie.findMany({
   where: {
      summary: {
         search: 'police crime',
      },
    },
    select: { id: true, title: true, summary: true }
 })
console.log(movies)

await prisma.$disconnect()
// These are pretty much all I can do with single file search in prisma... 

/*
   Filtering and Sorting
   https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting

   Prisma Client API reference
   https://www.prisma.io/docs/orm/reference/prisma-client-reference#filter-conditions-and-operators

   Full-text search
   https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search

   14.9 Full-Text Search Functions
   https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html
*/
