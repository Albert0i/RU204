import { redisClient, readCache, writeCache, invalidateCache } from "./config/redisClientCombo.js";

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

// Store test value 
const result = await writeCache(key, jsonData, tags)
console.log('result =', result)

// Retrieve stored value 
const value = await readCache(key)
console.log('value =', value)

// Test if the same or not
if (JSON.stringify(jsonData) === value )
  console.log('same value')
else 
  console.log('different value')

// Invalidate tag(s)
const result2 = await invalidateCache([ "*" ])
console.log('result2 =', result2)

// Retrieve stored value 
// const value2 = await readCache(key)
// console.log('value2 =', value)

// await redisClient.scriptFlush()
// await redisClient.disconnect()

/*
   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/

