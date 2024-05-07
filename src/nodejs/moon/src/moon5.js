import { redisClient } from "./config/redisClient.js";
import { readFileSync } from 'fs'

const keyName = "myTestSortedSet"
 for (let i=1; i<= 1000; i++)
    await redisClient.zAdd(keyName, { score: i, value: `member${i}` })

const sha = await redisClient.scriptLoad(readFileSync('./lua/zsum.lua', 'utf8'))
const value = await redisClient.evalSha(sha, { keys: [ keyName ] })
console.log(value)

await redisClient.del(keyName)
await redisClient.scriptFlush()
await redisClient.disconnect()

/*
   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/
