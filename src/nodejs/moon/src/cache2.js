import { redisClient } from "./config/redisClient.js";
import { readFileSync } from 'fs'

const prefix = "cache:"
const key = "123456"
const tags = ["tagA", "tagB", "tagC"]
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

// load script 
const shaWrite = await redisClient.scriptLoad(readFileSync('./lua/writeCache.lua', 'utf8'))
const shaRead = await redisClient.scriptLoad(readFileSync('./lua/readCache.lua', 'utf8'))

// call script to store test value 
const result = await redisClient.evalSha(shaWrite, 
  { keys: [ prefix, key ],
    arguments: [JSON.stringify(jsonData), ...tags]
  })
console.log('result =', result)

// call script to retrieve stored value 
const value = await redisClient.evalSha(shaRead, { keys: [ prefix, key ] })
console.log('value =', value)

// Test if the same or not
if (JSON.stringify(jsonData) === value )
    console.log('same value')
else 
    console.log('different value')

await redisClient.del(`${prefix}data:${key}`)
for (let i=0; i<tags.length; i++)
  await redisClient.del(`${prefix}tag:${tags[i]}`)

await redisClient.scriptFlush()
await redisClient.disconnect()

/*
   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/

