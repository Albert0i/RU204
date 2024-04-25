import { PrismaClient } from '@prisma/client'
import { movieData } from '../data/movieData.js'

const prisma = new PrismaClient()

async function main() {
   let response
   // Erase old data... 
   response = await prisma.movie.deleteMany()
   console.log(`${response.count} record(s) deleted`) 

   // Seed new data 
   for (let i = 0; i < movieData.length; i++) {
     // Can not store string array directly... 
     movieData[i].stars = movieData[i].stars.join('|')
      
     response = await prisma.movie.create({
       data: movieData[i]
     })
     console.log(`movie id: ${response.id}`)
   }
    console.log(`${movieData.length} record(s) created`) 
  }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

/*
   Seeding
   https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate   
*/