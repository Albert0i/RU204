import 'dotenv/config'
import { Schema } from 'redis-om'

/*
    Imagine we're operating a video rental store. We've decided to represent each of the movies in our inventory using JSON documents that have the following structure:

    {
    "title": "The Matrix",
    "released": 1999,
    "runtime": 137,
    "stars": [
        "Keanu Reeves",
        "Laurence Fishburne",
        "Carrie-Ann Moss"
    ],
    "Summary": "A stranger leads computer hacker Neo to a forbidding underworld, he discovers the truth: the life he knows is the elaborate deception of an evil cyber-intelligence.",
    rating: 8.7,
    inStock: true
    } 
*/

const movieSchema = new Schema(process.env.REDIS_OM_PREFIX + "movie", {
        title: { type: 'string' },
        released: { type: 'number' }, 
        runtime: { type: 'number'}, 
        stars:  { type: 'string[]' },
        summary: { type: 'string' }, 
        rating: { type: 'number' },
        inStock: { type: 'boolean' }
    }, 
    {
        dataStructure: process.env.REDIS_OM_DATASTRUCTURE
    });

export { movieSchema }

/*
   redis-om-node
   https://github.com/redis/redis-om-node
*/