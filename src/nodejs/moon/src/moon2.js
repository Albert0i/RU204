import { redisClient } from "./config/redisClient.js";
import { readFileSync } from 'fs'

const script = readFileSync('./lua/script1.lua', 'utf8');
console.log(script)

const value = await redisClient.eval(script, 
                                     { keys: ['key'],
                                       arguments: ['argument'] })
console.log(value)

await redisClient.disconnect()

/*
   eval and sendCommands methods return an error with any arguments #2206
   https://github.com/redis/node-redis/issues/2206
*/
