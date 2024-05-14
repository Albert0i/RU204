import 'dotenv/config'
import { createClient, defineScript } from 'redis'
import { readFileSync } from 'fs'

const redisClient = new createClient(
    {
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
        scripts: {
            luaVer: defineScript({
              NUMBER_OF_KEYS: 0,
              SCRIPT: ` 
                        local redisVersion = redis.REDIS_VERSION
                        local luaVersion = _VERSION

                        if (redisVersion == nil) then
                          redisVersion = "< 7.0.0"
                        end 
                        
                        return "Redis " .. redisVersion .. ", " .. luaVersion
                      `,
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
const shaRead = await redisClient.scriptLoad(readFileSync('./src/lua/readCache.lua', 'utf8'))
const shaWrite = await redisClient.scriptLoad(readFileSync('./src/lua/writeCache.lua', 'utf8'))
const shaRemove = await redisClient.scriptLoad(readFileSync('./src/lua/removeCache.lua', 'utf8'))
const shaInvalidate = await redisClient.scriptLoad(readFileSync('./src/lua/invalidateCache.lua', 'utf8'))
const shaFlush = await redisClient.scriptLoad(readFileSync('./src/lua/flushCache.lua', 'utf8'))

// Check existence
if (await redisClient.scriptExists(shaRead)) { console.log(`'readCache' loaded ${shaRead}`) } 
if (await redisClient.scriptExists(shaWrite)) { console.log(`'writeCache' loaded ${shaWrite}`) } 
if (await redisClient.scriptExists(shaRemove)) { console.log(`'removeCache' loaded ${shaRemove}`) } 
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

// Remove a value 
const removeCache = async (key, tags=[], prefix='cache:') => { 
  return redisClient.evalSha(shaRemove, 
                              { 
                                keys: [ prefix, key],
                                arguments: tags
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

export { redisClient, readCache, writeCache, removeCache, invalidateCache, flushCache }

/*
   Node-Redis
   https://www.npmjs.com/package/redis

   Node Redis: Examples
   https://github.com/redis/node-redis/tree/master/examples
*/
