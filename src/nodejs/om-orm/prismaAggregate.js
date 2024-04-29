import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

let movies 
// 1. How many movies are not sequel? 
movies = await prisma.movie.count({
    where: {
      sequel: false
    }
  })
console.log('answer 1')
console.log(movies)

// 2. Min, max, avg runtime in movies which are not sequel? 
movies = await prisma.movie.aggregate({
   _count: { title: true }, 
   _max: { runtime: true }, 
   _min: { runtime: true }, 
   _avg: { runtime: true }, 
   where: {
     sequel: false
   }
 })
console.log('answer 2')
console.log(movies)

// 3. Group by genre. having count >=3 and list top 10 only.  
movies = await prisma.movie.groupBy({
   by: ['genre'],
   _count: { title: true }, 
   orderBy: {
      _count: { title: 'desc' },
   },
   having: {
      title: {
        _count: {
          gte: 3,
        },
      },
    },
   skip: 0,
   take: 10,
  })
console.log('answer 3')
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

   Aggregation, grouping, and summarizing
   https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing
*/
