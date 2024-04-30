import { Repository, EntityId } from 'redis-om'
import { redisClient } from './om/redisClient.js';
import { movieSchema } from './om/movieSchema.js';

const movieRepository = new Repository(movieSchema, redisClient)
await movieRepository.createIndex()
console.log(" “To OM, or not to OM, that is the question”")

let movies 
await movieRepository.createIndex()
// 1. Find all movies which are not sequel
//    select 'title', 'genre' and 'released' year
//    order by 'released' year in descending order
//    return the first 5 matched. 
// FT.SEARCH moviedb:movie:index "@sequel:{0}"" RETURN 3 title genre released SORTBY released DESC LIMIT 0 5
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@sequel:{0}', 'RETURN', '3', 'title', 'genre', 'released', 'SORTBY', 'released', 'DESC', 'LIMIT', '0', '5'])
console.log(movies)

// 2. Find all movies starred by "Morgan Freeman" or "Leonardo DiCaprio"
//    select 'title', 'stars' and 'released' year
//    order by 'released' year in ascending order
// FT.SEARCH moviedb:movie:index "@stars:{Morgan Freeman|Leonardo DiCaprio}" SORTBY released ASC RETURN 3 title stars released
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@stars:{Morgan Freeman|Leonardo DiCaprio}', 'SORTBY', 'released', 'ASC', 'RETURN', '3', 'title', 'stars', 'released'])
console.log(movies)

// 3. Find all movies with rating 7~8 (inclusive)
//    select 'title' and 'rating'
// FT.SEARCH moviedb:movie:index "@rating:[7 8] RETURN 2 title rating" SORTBY released ASC RETURN 3 title stars released
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@rating:[7 8]', 'RETURN', '2', 'title', 'rating'])
console.log(movies)

// 4. Find all movie with a summary that contains 'crime' or 'police'.
//    select 'id', 'title' and 'summary' 
// FT.SEARCH moviedb:movie:index "@summary:(crime|police)" RETURN 2 title summary HIGHLIGHT
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@summary:(crime|police)', 'RETURN', '2', 'title', 'summary', 'HIGHLIGHT'])
console.log(movies)

await redisClient.quit();
// These are pretty much all I can do with single file search in redis... 

/*
   redis-om-node
   https://github.com/redis/redis-om-node

   FT.SEARCH
   https://redis.io/docs/latest/commands/ft.search/
*/