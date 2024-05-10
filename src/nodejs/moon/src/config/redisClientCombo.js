import 'dotenv/config'
import { createClient, defineScript } from 'redis'
import { readFileSync } from 'fs'

const redisClient = new createClient(
    {
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
        scripts: {
            luaVer: defineScript({
              NUMBER_OF_KEYS: 0,
              SCRIPT: 'return "Redis " .. redis.REDIS_VERSION.. ", " .. _VERSION',
              transformArguments() {
                return [];
              },
              transformReply(reply) {
                return reply;
              }
            })
          }
    });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect()
console.log(await redisClient.luaVer())

// loading scripts
const shaRead = await redisClient.scriptLoad(readFileSync('./lua/readCache.lua', 'utf8'))
const shaWrite = await redisClient.scriptLoad(readFileSync('./lua/writeCache.lua', 'utf8'))
const shaInvalidate = await redisClient.scriptLoad(readFileSync('./lua/invalidateCache.lua', 'utf8'))
const shaFlush = await redisClient.scriptLoad(readFileSync('./lua/flushCache.lua', 'utf8'))

// Check existence
if (await redisClient.scriptExists(shaRead)) { console.log(`'readCache' loaded ${shaRead}`) } 
if (await redisClient.scriptExists(shaWrite)) { console.log(`'writeCache' loaded ${shaWrite}`) } 
if (await redisClient.scriptExists(shaInvalidate)) { console.log(`'invalidateCache' loaded ${shaInvalidate}`) } 
if (await redisClient.scriptExists(shaFlush)) { console.log(`'flushCache' loaded ${shaFlush}`) } 

// Retrieve a stored value 
const readCache = async (key, prefix='cache:') => { 
  return redisClient.evalSha(shaRead, { keys: [ prefix, key ] })
}

// Store a value
const writeCache = async (key, value, tags=[], ttl=-1, prefix='cache:') => { 
  return redisClient.evalSha(shaWrite, 
                              { 
                                keys: [ prefix, key, ttl.toString() ],
                                arguments: [JSON.stringify(value), ...tags]
                              })
}

// Invalidate tag(s)
const invalidateCache = async (tags, prefix='cache:') => { 
  return redisClient.evalSha(shaInvalidate, 
                              { 
                                keys: [ prefix ],
                                arguments: tags
                              })
}

// Flush all object(s)
const flushCache = async (prefix='cache:') => {
  return redisClient.evalSha(shaFlush, 
    { 
      keys: [ prefix ]
    })
}

export { redisClient, readCache, writeCache, invalidateCache, flushCache }

/*
   Node-Redis
   https://www.npmjs.com/package/redis

   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/
