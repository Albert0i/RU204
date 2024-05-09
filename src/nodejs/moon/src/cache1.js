import { redisClient } from "./config/redisClient.js";
import { readFileSync } from 'fs'

const prefix = "cache:"
const key = "123456"
const jsonData = {
    name: "John Doe",
    age: 30,
    email: "johndoe@example.com",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      postalCode: "10001"
    },
    phoneNumbers: [
      {
        type: "home",
        number: "123-456-7890"
      },
      {
        type: "work",
        number: "987-654-3210"
      }
    ],
    isEmployed: true
  }
// store test value 
await redisClient.set(`${prefix}data:${key}`, JSON.stringify(jsonData)) 

// load script 
const sha = await redisClient.scriptLoad(readFileSync('./lua/readCache.lua', 'utf8'))

// call script to retrieve stored value 
const value = await redisClient.evalSha(sha, { keys: [ prefix, key ] })
console.log('value =', value)

// Test if the same or not
if (JSON.stringify(jsonData) === value )
    console.log('same value')
else 
    console.log('different value')

// call script to retrieve non-exists value 
const value2 = await redisClient.evalSha(sha, { keys: [ prefix, '654321' ] })
console.log('value2 =', value2)

await redisClient.del(`${prefix}data:${key}`)
await redisClient.scriptFlush()
await redisClient.disconnect()

/*
   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/

