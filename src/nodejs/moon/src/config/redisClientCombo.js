import 'dotenv/config'
import { createClient, defineScript } from 'redis'

const redisClient = new createClient(
    {
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
        scripts: {
            add: defineScript({
              NUMBER_OF_KEYS: 1,
              SCRIPT: 'return redis.call("GET", KEYS[1]) + ARGV[1];',
              transformArguments(key, toAdd) {
                return [key, toAdd.toString()];
              },
              transformReply(reply) {
                return reply;
              }
            }),
            readCache: defineScript({
                NUMBER_OF_KEYS: 1,
                SCRIPT: `-- retrieve string value in "prefix:data:key" format 
                        local key = KEYS[1]..'data:'..KEYS[2] 
                        local value = redis.call('GET', key)
                        
                        return value`,
                transformArguments(key, toRead) {
                  return [key, toRead.toString()];
                },
                transformReply(reply) {
                  return reply;
                } 
            })
          }
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