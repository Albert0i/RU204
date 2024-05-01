import { Repository, EntityId } from 'redis-om'
import { redisClient } from './redisClient.js'
import { bookSchema } from './bookSchema.js'
import { bookData } from '../data/bookData.js'

const bookRepository = new Repository(bookSchema, redisClient)
await bookRepository.createIndex()

async function main() {
   let response
   // Erase old data... 
   console.log(`Removing index ${bookSchema.indexName} and documents...`)   
   //response = await redisClient.sendCommand(['FT.DROP', `${bookSchema.indexName}`])
   response = await redisClient.sendCommand(['FT.DROPINDEX', `${bookSchema.indexName}`, 'DD'])
   // Redis-OM has a string to keep track of index re-creation. Also remove it!!! 
   response = await redisClient.del(`${bookSchema.indexName}:hash`)
   
   // To re-create the index 
   console.log(`Creating index ${bookSchema.indexName}...`)
   await bookRepository.createIndex()

   // Seed new data 
   for (let i = 0; i < bookData.length; i++) {  
     response = await bookRepository.save(bookData[i])
     console.log(`book id: ${response[EntityId]}`)
   }
    console.log(`${bookData.length} record(s) created`) 
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
