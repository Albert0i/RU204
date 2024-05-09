import { redisClient } from "./config/redisClientWithCache.js";

console.log(await redisClient.set('key', '1'));
console.log(await redisClient.add('key', 2)); // 3

await redisClient.disconnect()

/*
   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/
