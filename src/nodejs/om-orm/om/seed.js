import { Repository, EntityId } from 'redis-om'
import { redisClient } from './redisClient.js'
import { movieSchema } from './movieSchema.js'
import { movieData } from '../data/movieData.js'

const movieRepository = new Repository(movieSchema, redisClient)
await movieRepository.createIndex()

async function main() {
   let response
   // Erase old data... 
   console.log(`Removing index ${movieSchema.indexName}...`)
   // Dropping an index and all accompanied documents 
   response = await redisClient.sendCommand(['FT.DROP', `${movieSchema.indexName}`])
   // Redis-OM uses a string to keep track of index re-creation. 
   response = await redisClient.sendCommand(['DEL', `${movieSchema.indexName}:hash`])
   
   // To re-create the index 
   console.log(`Creating index ${movieSchema.indexName}...`)
   await movieRepository.createIndex()

   // Seed new data 
   for (let i = 0; i < movieData.length; i++) {  
     response = await movieRepository.save(movieData[i])
     console.log(`movie id: ${response[EntityId]}`)
   }
    console.log(`${movieData.length} record(s) created`) 
  }

main()
  .then(async () => {
    await redisClient.quit()
  })
  .catch(async (e) => {
    console.error(e)
    await redisClient.quit()
    process.exit(1)
  })
