import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const newMovie1 = {
    title: 'The Omen',
    released: 1976,
    runtime: 111, 
    stars: 'Gregory Peck|Lee Remick|Harvey Stephens' ,
    summary: 'Mysterious deaths surround an American ambassador. Could the child that he is raising actually be the Antichrist? The Devil\'s own son?',
    rating: 7.5,
    inStock: false
};
const newMovie2 = {
    title: 'Damien: Omen II',
    released: 1978,
    runtime: 107, 
    stars: 'William Holden|Lee Grant|Jonathan Scott-Taylor' ,
    summary: 'Damien the Antichrist, now about to turn thirteen years old, finally learns of his destiny under the guidance of an unholy disciple of Satan. Meanwhile dark forces begin to eliminate all those who suspect the child\'s true identity.',
    rating: 6.2,
    inStock: true
};
const newMovie3 = {
    title: 'The Final Conflict',
    released: 1981,
    runtime: 108, 
    stars: 'Sam Neill|Rossano Brazzi|Don Gordon',
    summary: 'The now adult Antichrist plots to eliminate his future divine opponent while a cabal of monks plot to stop him.', 
    rating: 5.5,
    inStock: true
};

let response 
response = await prisma.movie.create({ 
    data: newMovie1
})
console.log('response = ', response)

response = await prisma.movie.create({ 
    data: newMovie2
})
console.log('response = ', response)

response = await prisma.movie.create({ 
    data: newMovie3
})
console.log('response = ', response)

/*
   Prisma
   https://github.com/prisma/prisma
*/