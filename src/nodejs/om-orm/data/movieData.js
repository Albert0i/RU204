
let movieData = [
  {
    title: "Inception",
    released: 2010,
    runtime: 148,
    stars: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    summary: "A thief with the ability to enter people's dreams is given a task to plant an idea into a CEO's mind.",
    rating: 8.8,
    inStock: true,
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "The Dark Knight",
    released: 2008,
    runtime: 152,
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    summary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    inStock: true,
    director: "Christopher Nolan",
    genre: "Action",
    country: "United States",
    language: "English",
    sequel: true
  },
  {
    title: "The Shawshank Redemption",
    released: 1994,
    runtime: 142,
    stars: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    summary: "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    inStock: true,
    director: "Frank Darabont",
    genre: "Drama",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "Interstellar",
    released: 2014,
    runtime: 169,
    stars: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    summary: "A team of explorers undertakes a space journey through a wormhole in search of a new habitable planet.",
    rating: 8.6,
    inStock: true,
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "The Godfather",
    released: 1972,
    runtime: 175,
    stars: ["Marlon Brando", "Al Pacino", "James Caan"],
    summary: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    inStock: true,
    director: "Francis Ford Coppola",
    genre: "Crime",
    country: "United States",
    language: "English",
    sequel: true
  },
  {
    title: "The Great Gatsby",
    released: 2013,
    runtime: 143,
    stars: ["Leonardo DiCaprio", "Tobey Maguire", "Carey Mulligan"],
    summary: "A writer and wall street trader, Nick, finds himself drawn to the past and lifestyle of his millionaire neighbor, Jay Gatsby.",
    rating: 7.2,
    inStock: true,
    director: "Baz Luhrmann",
    genre: "Drama",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "Pulp Fiction",
    released: 1994,
    runtime: 154,
    stars: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    summary: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    inStock: true,
    director: "Quentin Tarantino",
    genre: "Crime",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "Fight Club",
    released: 1999,
    runtime: 139,
    stars: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    summary: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    rating: 8.8,
    inStock: true,
    director: "David Fincher",
    genre: "Drama",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    released: 2001,
    runtime: 178,
    stars: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    summary: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    rating: 8.8,
    inStock: true,
    director: "Peter Jackson",
    genre: "Fantasy",
    country: "United States",
    language: "English",
    sequel: true
  },
  {
    title: "Forrest Gump",
    released: 1994,
    runtime: 142,
    stars: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    summary: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    rating: 8.8,
    inStock: true,
    director: "Robert Zemeckis",
    genre: "Romance",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "The Usual Suspects",
    released: 1995,
    runtime: 106,
    stars: ["Kevin Spacey", "Gabriel Byrne", "Chazz Palminteri"],
    summary: "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
    rating: 8.5,
    inStock: true,
    director: "Bryan Singer",
    genre: "Crime",
    country: "United States",
    language: "English",
    sequel: false
  },
  {
    title: "The Lion King",
    released: 1994,
    runtime: 88,
    stars: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
    summary: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    rating: 8.5,
    inStock: true,
    director: "Roger Allers, Rob Minkoff",
    genre: "Animation",
    country: "United States",
    language: "English",
    sequel: true
  },
  {
    title: "The Avengers",
    released: 2012,
    runtime: 143,
    stars: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    summary: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    rating: 8.0,
    inStock: true,
    director: "Joss Whedon",
    genre: "Sci-Fi",
    country: "United States",
    language: "English",
    sequel: true
  },
  {
    title: "Back to the Future",
    released: 1985,
    runtime: 116,
    stars: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"],
    summary: "A teenager is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his eccentric scientist friend.",
    rating: 8.5,
    inStock: true,
    director: "Robert Zemeckis",
    genre: "Sci-Fi",
    country: "United States",
    language: "English",
    sequel: true
  },
  {
    title: "The Departed",
    released: 2006,
    runtime: 151,
    stars: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"],
    summary: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    rating: 8.5,
    inStock: true,
    director: "Martin Scorsese",
    genre: "Crime",
    country: "United States",
    language: "English",
    sequel: false
  }
]  

export { movieData }