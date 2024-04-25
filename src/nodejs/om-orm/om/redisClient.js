import 'dotenv/config'
import { createClient } from 'redis'

const redisClient = new createClient({
        url: process.env.REDIS_OM_URL || 'redis://localhost:6379'
    });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect()
const pong = await redisClient.ping()
console.log(pong)

export { redisClient }

/*
   redis-om-node
   https://github.com/redis/redis-om-node
*/