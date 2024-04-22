import 'dotenv/config'
import { createClient } from 'redis';

const BOOK_KEY = 'ru204:book:21';

// Create a connection to Redis and connect to the server.
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379/';
//console.log(`Connecting to Redis at ${REDIS_URL}`);

const r = createClient({
  url: REDIS_URL
});

await r.connect();
// This is a catch all basic error handler.
r.on('error', error => { 
  console.log(error) 
});
r.on('ready', () => {   
  console.log('Redis client is ready...')
} ) 
r.on('end', () => { 
  console.log('Redis connection is closed.')
} ) 
r.on('reconnecting', (o) => {
  console.log('Redis client is reconnecting!')
  console.log(`Attempt number: ${o.attempt}.`)
  console.log(`Milliseconds sence last attempt: ${o.delay}.`) 
} ) 


let response
// 1. Try out the JSON.STRAPPEND command to add the "Jr." suffix to the author of the book at key ru204:book:21, making the author's name "Kurt Busiek Jr.".
response = await r.json.get(BOOK_KEY, { path: [ '$.author' ] })
console.log('$.author=', response) 
response = await r.json.strAppend(BOOK_KEY, '$.author', ' Jr.')
response = await r.json.get(BOOK_KEY, { path: [ '$.author' ] })
console.log('$.author=', response) 


// 2. Use the JSON.MGET path to get the titles for the books whose keys are ru204:book:91, ru204:book:2718 and ru204:book:171.
// Single book --> Ok 
//response = await r.json.get('ru204:book:91', { path: ['$.title'] } )
// Multiple books --> NOT works AS EXPECTED 
// response = await r.json.mGet([ 'ru204:book:91', 'ru204:book:2718', 'ru204:book:171' ], 
//                               { path: ['$.title'] } )
// SOLUTION ONE: 
// To take advantage of auto-pipelining and handle your Promises
response = await Promise.all([
                                r.json.get('ru204:book:91', { path: ['$.title'] } ),
                                r.json.get('ru204:book:2718', { path: ['$.title'] } ),
                                r.json.get('ru204:book:171', { path: ['$.title'] } )
                            ]);
console.log('Use pipeline')
console.log('titles = ', response)

// SOLUTION TWO: 
// If you want to run commands and/or use arguments that Node Redis doesn't know about (yet!) use .sendCommand():
response = await r.sendCommand([ 'JSON.MGET', 'ru204:book:91', 'ru204:book:2718', 'ru204:book:171', '$.title' ]);
console.log('Use sendCommand')
console.log('titles = ', response)


// 3. Add a new entry to the inventory array for the book at key ru204:book:10542 with the JSON.ARRINSERT command. Add your new entry at position 2 in the array, and use the following object:
/*
    {
      "status": "maintenance",
      "stock_id": "10542_5"
    }
*/
response = await r.json.arrInsert('ru204:book:10542', '$.inventory', 2, 
                                  { 
                                    status: "maintenance",
                                    stock_id: "10542_3" 
                                  } )

console.log('number of inventories = ', response)

// Disconnect from Redis.
await r.disconnect();

/*
   node-redis
   https://github.com/redis/node-redis
*/