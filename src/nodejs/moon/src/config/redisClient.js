import 'dotenv/config'
import { createClient } from 'redis'

const redisClient = new createClient({
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
    });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect()
const pong = await redisClient.ping()
console.log(pong)

export { redisClient }

/*
   Node-Redis
   https://www.npmjs.com/package/redis
*/