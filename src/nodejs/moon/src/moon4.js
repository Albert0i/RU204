import { redisClient } from "./config/redisClient.js";
import { readFileSync } from 'fs'

const keyName = "myTestSet"
for (let i=1; i<= 1000; i++)
    await redisClient.sAdd(keyName, i.toString())

await redisClient.sAdd(keyName, 'aaa')
await redisClient.sAdd(keyName, 'bbb')
await redisClient.sAdd(keyName, 'ccc')

const sha = await redisClient.scriptLoad(readFileSync('./lua/ssum.lua', 'utf8'))
const value = await redisClient.evalSha(sha, { keys: [ keyName ] })
console.log(value)

await redisClient.del(keyName)
await redisClient.scriptFlush()
await redisClient.disconnect()

/*
   executing redis eval command to run Lua script in nodeJS
   https://stackoverflow.com/questions/44676974/executing-redis-eval-command-to-run-lua-script-in-nodejs
*/
