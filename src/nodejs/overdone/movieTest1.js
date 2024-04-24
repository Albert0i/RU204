import { Repository, EntityId } from 'redis-om'
import { redisClient } from './redisClient.js';
import { movieSchema } from './movieSchema.js';

const movieRepository = new Repository(movieSchema, redisClient)

// To use search you have to build an index. If you don't, you'll get errors. To build an index, just call .createIndex on your repository:
await movieRepository.createIndex();

// Create some Movie instances for 2-3 of your favorite movies (look them up on IMDB!)
let newMovie1 = {
        title: 'The Omen',
        released: 1976,
        runtime: 111, 
        stars: [ 'Gregory Peck', 'Lee Remick', 'Harvey Stephens' ],
        summary: 'Mysterious deaths surround an American ambassador. Could the child that he is raising actually be the Antichrist? The Devil\'s own son?',
        rating: 7.5,
        inStock: false
    };
let newMovie2 = {
        title: 'Damien: Omen II',
        released: 1978,
        runtime: 107, 
        stars: [ 'William Holden', 'Lee Grant', 'Jonathan Scott-Taylor' ],
        summary: 'Damien the Antichrist, now about to turn thirteen years old, finally learns of his destiny under the guidance of an unholy disciple of Satan. Meanwhile dark forces begin to eliminate all those who suspect the child\'s true identity.',
        rating: 6.2,
        inStock: true
    };
let newMovie3 = {
        title: 'The Final Conflict',
        released: 1981,
        runtime: 108, 
        stars: [ 'Sam Neill', 'Rossano Brazzi', 'Don Gordon' ],
        summary: 'The now adult Antichrist plots to eliminate his future divine opponent while a cabal of monks plot to stop him.', 
        rating: 5.5,
        inStock: true
    };

// Save the movies to Redis.
newMovie1 = await movieRepository.save(newMovie1)
newMovie2 = await movieRepository.save(newMovie2)
newMovie3 = await movieRepository.save(newMovie3)

// Get the locally generated ULID for this movie.
console.log(`newMovie1 ULID: ${newMovie1[EntityId]}`);
console.log(`newMovie2 ULID: ${newMovie2[EntityId]}`);
console.log(`newMovie3 ULID: ${newMovie3[EntityId]}`);

console.log('Saved movies in Redis.');

await redisClient.quit();
