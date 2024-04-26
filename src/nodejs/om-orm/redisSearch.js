import { Repository, EntityId } from 'redis-om'
import { redisClient } from './om/redisClient.js';
import { movieSchema } from './om/movieSchema.js';

const movieRepository = new Repository(movieSchema, redisClient)

let movies 
// 1. Find all movies which are not sequel
//    select 'title', 'genre' and 'released' year
//    order by 'released' year in descending order
//    return the first 5 matched. 
movies = await movieRepository.search()
                .where('sequel').equals(false)
                .sortBy('released', 'DESC')
                .return.page(0, 5)
console.log(movies)

//FT.SEARCH moviedb:movie:index "@sequel:{0}" RETURN 3 title genre released SORTBY released DESC LIMIT 0 5
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@sequel:{0}', 'RETURN', '3', 'title', 'genre', 'released', 'SORTBY', 'released', 'DESC', 'LIMIT', '0', '5'])
console.log(movies)

// 2. Find all movies acted by "Morgan Freeman" or "Leonardo DiCaprio"
//    select 'title' and 'stars'
// movies = await prisma.movie.findMany({
//      where: { OR: [
//         { stars: { contains: "Morgan Freeman" } } , 
//         { stars: { contains: "Leonardo DiCaprio" } } 
//      ] },
//      select: { title: true, stars: true },
//    })
//console.log(movies)

// 3. Find all movies with rating 7~8 (inclusive)
//    select 'title' and 'rating'
// movies = await prisma.movie.findMany({
//    where: { AND: [
//       { rating: { gte: 7 } }, 
//       { rating: { lte: 8 } }
//    ] },
//    select: { title: true, rating: true },
//  })
//console.log(movies)

// 4. Find all movie with a summary that contains 'crime' or 'police'.
//    select 'id', 'title' and 'summary' 
// movies = await prisma.movie.findMany({
//    where: {
//       summary: {
//          search: 'police crime',
//       },
//     },
//     select: { id: true, title: true, summary: true }
//  })
//console.log(movies)

await redisClient.quit();
// These are pretty much all I can do with single file search in prisma... 

/*
   redis-om-node
   https://github.com/redis/redis-om-node

   FT.SEARCH
   https://redis.io/docs/latest/commands/ft.search/
*/