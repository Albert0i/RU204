import { redisClient } from "./config/redisClient.js";

await redisClient.set('hello', 'world');
const value = await redisClient.get('hello');
console.log(value)

console.log(
    await redisClient.eval('return KEYS[1]', { keys: ['key'] }), // 'key'
    await redisClient.eval('return ARGV[1]', { arguments: ['argument'] }) // 'argument'
  );

await redisClient.disconnect()

/*
   eval and sendCommands methods return an error with any arguments #2206
   https://github.com/redis/node-redis/issues/2206
*/
