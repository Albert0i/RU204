import { redisClient } from "./config/redisClient.js";

// Store a JSON object...
const jsonObject = {
  name: 'Roberta McDonald',
  pets: [
    {
    name: 'Rex',
    species: 'dog',
    age: 3,
    isMammal: true
    },
    {
    name: 'Goldie',
    species: 'fish',
    age: 2,
    isMammal: false
    }
  ]
}

await redisClient.json.set('noderedis:jsondata', '$', jsonObject)
//await redisClient.json.set('mykey', '$', '{"name":"Example"}');
//await redisClient.sendCommand([ "JSON.SET", "myket", "$", '{"name":"Example"}' ]) 

// Retrieve the name and age of the second pet in the pets array.
// let results = await client.json.get('noderedis:jsondata', {
//     path: [
//       '$.pets[1].name',
//       '$.pets[1].age'
//     ]
//   });
  
  // { '$.pets[1].name': [ 'Rex' ], '$.pets[1].age': [ 3 ] }
  //console.log(results);

await redisClient.disconnect()

/*
   @node-redis/json
   https://www.npmjs.com/package/@node-redis/json
*/
