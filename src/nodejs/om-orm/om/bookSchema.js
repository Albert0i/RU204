import { Schema } from 'redis-om'

const bookSchema = new Schema("bookdb:book", {
        author: { type: 'string' },
        country: { type: 'string' },
        imageLink: { type: 'string' }, 
        language: { type: 'string' },
        link: { type: 'string' }, 
        pages: { type: 'number'}, 
        title: { type: 'text' },
        year: { type: 'number', sortable: true}
    }, 
    {
        dataStructure: 'HASH'
    });

export { bookSchema }

/*
   redis-om-node
   https://github.com/redis/redis-om-node

   100-best-books/books.json
   https://github.com/benoitvallon/100-best-books/blob/master/books.json
*/
