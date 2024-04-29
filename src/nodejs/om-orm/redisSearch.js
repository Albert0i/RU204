import { Repository, EntityId } from 'redis-om'
import { redisClient } from './om/redisClient.js';
import { movieSchema } from './om/movieSchema.js';

const movieRepository = new Repository(movieSchema, redisClient)

let movies 
await movieRepository.createIndex()
// 1. Find all movies which are not sequel
//    select 'title', 'genre' and 'released' year
//    order by 'released' year in descending order
//    return the first 5 matched. 
movies = await movieRepository.search()
                .where('sequel').equals(false)
                .sortBy('released', 'DESC')
                .return.page(0, 5)
console.log('answer 1')
console.log(movies)

console.log(" “To OM, or not to OM, that is the question”")
// FT.SEARCH moviedb:movie:index "@sequel:{0}" RETURN 3 title genre released SORTBY released DESC LIMIT 0 5
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@sequel:{0}', 'RETURN', '3', 'title', 'genre', 'released', 'SORTBY', 'released', 'DESC', 'LIMIT', '0', '5'])
console.log(movies)

// 2. Find all movies starred by "Morgan Freeman" or "Leonardo DiCaprio"
//    select 'title', 'stars' and 'released' year
//    order by 'released' year in ascending order
movies = await movieRepository.search()
                .where('stars').contain("Morgan Freeman")
                .or('stars').contain("Leonardo DiCaprio")
                .sortBy('released', 'ASC')
                .return.all()
console.log('answer 2')
console.log(movies)

console.log(" “To OM, or not to OM, that is the question”")
// FT.SEARCH moviedb:movie:index "@stars:{Morgan Freeman|Leonardo DiCaprio}" SORTBY released ASC RETURN 3 title stars released
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@stars:{Morgan Freeman|Leonardo DiCaprio}', 'SORTBY', 'released', 'ASC', 'RETURN', '3', 'title', 'stars', 'released'])
console.log(movies)

// 3. Find all movies with rating 7~8 (inclusive)
//    select 'title' and 'rating'
movies = await movieRepository.search()
                .where('rating').gte(7)
                .and('rating').lte(8)
                .return.all()
console.log('answer 3')
console.log(movies)

console.log(" “To OM, or not to OM, that is the question”")
// FT.SEARCH moviedb:movie:index "@stars:{Morgan Freeman|Leonardo DiCaprio}" SORTBY released ASC RETURN 3 title stars released
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@rating:[7 8]', 'RETURN', '2', 'title', 'rating'])
console.log(movies)

// 4. Find all movie with a summary that contains 'crime' or 'police'.
//    select 'id', 'title' and 'summary' 
movies = await movieRepository.search()
                .where('summary').match('crime')
                .or('summary').match('police')
                .return.all()
console.log('answer 4')
console.log(movies)

console.log(" “To OM, or not to OM, that is the question”")
// FT.SEARCH moviedb:movie:index "@summary:(crime|police)" RETURN 2 title summary HIGHLIGHT
movies = await redisClient.sendCommand(['FT.SEARCH', 'moviedb:movie:index', '@summary:(crime|police)', 'RETURN', '2', 'title', 'summary', 'HIGHLIGHT'])
console.log(movies)

await redisClient.quit();
// These are pretty much all I can do with single file search in prisma... 

/*
   redis-om-node
   https://github.com/redis/redis-om-node

   FT.SEARCH
   https://redis.io/docs/latest/commands/ft.search/
*/