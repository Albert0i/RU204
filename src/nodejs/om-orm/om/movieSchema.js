import { Schema } from 'redis-om'

const movieSchema = new Schema("moviedb:movie", {
        title: { type: 'text' },
        released: { type: 'number', sortable: true}, 
        runtime: { type: 'number'}, 
        stars:  { type: 'string[]' },
        summary: { type: 'text' }, 
        rating: { type: 'number' },
        inStock: { type: 'boolean' },
        director: { type: 'string' },
        genre: { type: 'string' },
        country: { type: 'string' },
        language: { type: 'string' },
        sequel: { type: 'boolean' }
    }, 
    {
        dataStructure: 'HASH'
    });

export { movieSchema }

/*
   redis-om-node
   https://github.com/redis/redis-om-node
*/
