import 'dotenv/config'
import { createClient, defineScript } from 'redis'
import { readFileSync } from 'fs'

const redisClient = new createClient(
    {
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
        scripts: {
            luaVer: defineScript({
              NUMBER_OF_KEYS: 0,
              SCRIPT: 'return _VERSION',
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

// Check existence
if (await redisClient.scriptExists(shaRead)) { console.log('readCache loaded') } 
if (await redisClient.scriptExists(shaWrite)) { console.log('writeCache loaded') } 
if (await redisClient.scriptExists(shaInvalidate)) { console.log('invalidateCache loaded') } 

// Retrieve a stored value 
const readCache = async (key, prefix='cache:') => { 
  return redisClient.evalSha(shaRead, { keys: [ prefix, key ] })
}

// Store a value
const writeCache = async (key, value, tags=[], prefix='cache:') => { 
  return redisClient.evalSha(shaWrite, 
                              { 
                                keys: [ prefix, key ],
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

export { redisClient, readCache, writeCache, invalidateCache }

/*
   Node-Redis
   https://www.npmjs.com/package/redis

   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/
