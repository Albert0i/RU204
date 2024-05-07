import { redisClient } from "./config/redisClient.js";
import { readFileSync } from 'fs'

const script = readFileSync('./lua/script1.lua', 'utf8');
console.log(script)

const sha = await redisClient.scriptLoad(script)
console.log(sha)
console.log(await redisClient.scriptExists(sha))

const value = await redisClient.evalSha(sha, 
                                     { keys: ['key'],
                                       arguments: ['argument'] })
console.log(value)

await redisClient.scriptFlush()
console.log(await redisClient.scriptExists(sha))

await redisClient.disconnect()

/*
   executing redis eval command to run Lua script in nodeJS
   https://stackoverflow.com/questions/44676974/executing-redis-eval-command-to-run-lua-script-in-nodejs
*/
