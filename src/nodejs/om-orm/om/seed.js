import 'dotenv/config'
import { Repository, EntityId } from 'redis-om'
import { redisClient } from './redisClient.js'
import { movieSchema } from './movieSchema.js'
import { movieData } from '../data/movieData.js'

const movieRepository = new Repository(movieSchema, redisClient)

async function main() {
   let response
   // Erase old data... 
   //response = await redisClient.sendCommand(['ft.drop', `${process.env.REDIS_OM_PREFIX}index`])
   
   // To use search you have to build an index. If you don't, you'll get errors. To build an index, just call .createIndex on your repository:
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
