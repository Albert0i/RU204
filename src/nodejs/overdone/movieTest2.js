import { Repository, EntityId } from 'redis-om'
import { redisClient } from './redisClient.js';
import { movieSchema } from './movieSchema.js';

const movieRepository = new Repository(movieSchema, redisClient)

// Search for all in-stock movies 
const movies = await movieRepository.search().where('inStock').equals(true).return.all()
console.log(movies)

await redisClient.quit();

/*
   redis-om-node
   https://github.com/redis/redis-om-node
*/