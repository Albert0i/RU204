import { redisClient } from "./config/redisClient.js";

// Store a JSON object...
const jsonObject = {
  name: 'Roberta McDonald',
  pets: [
    {
      name: 'Fluffy',
      species: 'dog',
      age: 5,
      isMammal: true
    },
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
  ],
  address: {
    number: 99,
    street: 'Main Street',
    city: 'Springfield',
    state: 'OH',
    country: 'USA'
  }
}

await redisClient.json.set('noderedis:jsondata', '$', jsonObject)
// Retrieve the name and age of the second pet in the pets array.
let results = await redisClient.json.get('noderedis:jsondata', {
    path: [
      '$.pets[1].name',
      '$.pets[1].age'
    ]
  });
  
  // { '$.pets[1].name': [ 'Rex' ], '$.pets[1].age': [ 3 ] }
console.log(results);

await redisClient.del('noderedis:jsondata')
await redisClient.disconnect()

/*
   @node-redis/json
   https://www.npmjs.com/package/@node-redis/json
*/
