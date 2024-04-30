import { Repository, EntityId } from 'redis-om'
import { redisClient } from './om/redisClient.js';
import { movieSchema } from './om/movieSchema.js';

const movieRepository = new Repository(movieSchema, redisClient)

let movies 
await movieRepository.createIndex()

// 1. How many movies are not sequel? 
// FT.SEARCH moviedb:movie:index "@sequel:{0}" LIMIT 0 0
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@sequel:{0}', 'LIMIT', '0', '0'])
console.log('answer 1')
console.log(movies)

// 2. Min, max, avg runtime in movies which are not sequel? 
// FT.AGGREGATE moviedb:movie:index "@sequel:{0}" GROUPBY 0 REDUCE COUNT 0 AS Total REDUCE MAX 1 @runtime AS Maximum REDUCE MIN 1 @runtime AS Mininum REDUCE AVG 1 @runtime AS Average
movies = await redisClient.sendCommand(['FT.AGGREGATE', 'moviedb:movie:index', '@sequel:{0}', 'GROUPBY', '0', 'REDUCE', 'COUNT', '0', 'AS', 'Total', 'REDUCE', 'MAX', '1', '@runtime', 'AS', 'Maxinum', 'REDUCE', 'MIN', '1', '@runtime', 'AS', 'Minimum', 'REDUCE', 'AVG', '1', '@runtime', 'AS', 'Average'])
console.log('answer 2')
console.log(movies)

// 3. Group by genre. having count >=3 and list top 10 only.  
// movies = await prisma.movie.groupBy({
//    by: ['genre'],
//    _count: { title: true }, 
//    orderBy: {
//       _count: { title: 'desc' },
//    },
//    having: {
//       title: {
//         _count: {
//           gte: 3,
//         },
//       },
//     },
//    skip: 0,
//    take: 10,
//   })
// FT.AGGREGATE moviedb:movie:index "*" GROUPBY 1 @genre REDUCE COUNT 0 AS Total SORTBY 2 @Total DESC filter "@Total >= 3" LIMIT 0 10
movies = await redisClient.sendCommand(['FT.AGGREGATE', 'moviedb:movie:index', "*", 'GROUPBY', '1', '@genre', 'REDUCE', 'COUNT', '0', 'AS', 'Total', 'SORTBY', '2', '@Total', 'DESC', 'filter', "@Total >= 3", 'LIMIT', '0', '10'])
console.log('answer 3')
console.log(movies)

await redisClient.quit();
// These are pretty much all I can do with single file search in redis... 

/*
   redis-om-node
   https://github.com/redis/redis-om-node

   FT.SEARCH
   https://redis.io/docs/latest/commands/ft.search/
*/