import 'dotenv/config'
import { Client, Entity, Schema } from 'redis-om';

const client = new Client();
await client.open(process.env.REDIS_OM_URL || 'redis://localhost:6379');

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
    "Summary": "A stranger leads computer hacker Neo to a forbidding underworld, he discovers the truth: the life he knows is the elaborate deception of an evil cyber-intelligence."
    } 
*/

// 1. Model the JSON structure above as an entity of class Movie.
class Movie extends Entity {};

const movieSchema = new Schema(Movie, {
        title: { type: 'string' },
        released: { type: 'number' }, 
        runtime: { type: 'number'}, 
        stars:  { type: 'string[]' },
        summary: { type: 'string' }
    }, 
    {
        prefix: 'ru204:redis-om-node:movie'
    });

const movieRepository = client.fetchRepository(movieSchema);

// 2. Create some Movie instances for 2-3 of your favorite movies (look them up on IMDB!)
const newMovie1 = movieRepository.createEntity({
        title: 'The Omen',
        released: 1976,
        runtime: 111, 
        stars: [ 'Gregory Peck', 'Lee Remick', 'Harvey Stephens' ],
        summary: 'Mysterious deaths surround an American ambassador. Could the child that he is raising actually be the Antichrist? The Devil\'s own son?'
    });
const newMovie2 = movieRepository.createEntity({
        title: 'Damien: Omen II',
        released: 1978,
        runtime: 107, 
        stars: [ 'William Holden', 'Lee Grant', 'Jonathan Scott-Taylor' ],
        summary: 'Damien the Antichrist, now about to turn thirteen years old, finally learns of his destiny under the guidance of an unholy disciple of Satan. Meanwhile dark forces begin to eliminate all those who suspect the child\'s true identity.'
});
const newMovie3 = movieRepository.createEntity({
        title: 'The Final Conflict',
        released: 1981,
        runtime: 108, 
        stars: [ 'Sam Neill', 'Rossano Brazzi', 'Don Gordon' ],
        summary: 'The now adult Antichrist plots to eliminate his future divine opponent while a cabal of monks plot to stop him.'
});

// Get the locally generated ULID for this movie.
console.log(`newMovie1 ULID: ${newMovie1.entityId}`);
console.log(`newMovie2 ULID: ${newMovie2.entityId}`);
console.log(`newMovie3 ULID: ${newMovie3.entityId}`);

// 3. Persist them to Redis, and verify that the correct JSON structure is stored in Redis for each document.

// Save the movies to Redis.
await movieRepository.save(newMovie1);
await movieRepository.save(newMovie2);
await movieRepository.save(newMovie3);

console.log('Saved movies in Redis.');

await client.close();
