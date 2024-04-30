### [OM](https://www.npmjs.com/package/redis-om) vs [ORM](https://www.prisma.io/docs/orm/overview/prisma-in-your-stack/is-prisma-an-orm) 

```
“April is the cruellest month, breeding
Lilacs out of the dead land, mixing
Memory and desire, stirring
Dull roots with spring rain.”
The Waste Land
BY T. S. ELIOT
```

Without further ado
Stop beating around the bushes
Time to rollup your sheelves 
Let get started
For better or worse 

We'll look at examples written in Python, .NET, Node.js,
and Java.

### Prologue 
Every happening has it own connotation behind the scenes, this is the conviction throughout my life. Events, no matter how minute they are, may entangle even more incidents of any scale. More often than not, the effect is not instantaneous and thus not palpable in secular society. We just can't conceive their interworking, can't figure out their causes and consequences, if any. Based on this belief, we can definitely say that "there is no such thing as coincidence!". The term "laws of nature" refers to fundamental principles or regularities that govern the behavior and operations of the natural world. These laws apply to elementary physical elements, not to those in high level mental activities. 


### I. Round 1: Setup 
Chances are rare when it is required to tap on multiple database systems in a single project, especially heterogeneous ones. 

![alt docker](img/docker-compose.png)


### II. Round 2: [Seeding](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#integrated-seeding-with-prisma-migrate)


### III. Round 3: Searching


### IV. Round 4: Aggregation


### V. Round up

#### [Prisma](https://www.prisma.io/)

**Pros**
1. Implementation agnostic, suports mainsream RDBMS (except Oracle); 
2. Code First and Database First bi-directional approach; 
3. Complete SDLC (Software Development Life Cycle) support; 

**Cons**
1. Longer learning curve; 
2. One kind of database per project;
3. Performance overhead; 

#### [Redis-OM](https://github.com/redis/redis-om-node)

**Pros**
1. Enablement of document database in Redis;
2. Manage indexes automatically; 
3. Endows data types on HASH data structure; 

**Cons**
1. Still under development; 
2. Libraries for Python, Java, Javascript and C# only; 
3. Less features than [mongoose](https://mongoosejs.com/);


### VI. Bibliography

#### prisma
1. [prisma/docs | MySQL/MariaDB](https://www.prisma.io/docs/orm/overview/databases/mysql)
2. [Prisma Client Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
3. [Prisma Client API reference](https://www.prisma.io/docs/orm/reference/prisma-client-reference)
4. [Filtering and Sorting](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting)
5. [Aggregation, grouping, and summarizing](https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing)
6. [Full-text search](https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search)
7. [MySQL Full-Text Search Functions](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)
8. [Learn Prisma In 60 Minutes, by WDS](https://youtu.be/RebA5J-rlwg)

#### redis 
1. [Storing, querying, and indexing JSON at speed, Redis University](https://university.redis.com/courses/ru204/)
2. [Redis Stack for Application Modernization, by Luigi Fugaro, Mirko Ortensi](https://www.amazon.com/Redis-Stack-Application-Modernization-applications-ebook/dp/B0CMR28RT1/ref=sr_1_1?crid=22O91FJWWHK9Y&dib=eyJ2IjoiMSJ9.y5lDgi1pCr-YeUHEjJAo6Q.HmDkpYrL9BqnFJj2V-yDtMVVaXfzfpQ-nKIMW8h6EgQ&dib_tag=se&keywords=Redis+Stack+for+Application+Modernization&qid=1714444777&s=books&sprefix=redis+stack+for+application+modernization%2Cstripbooks-intl-ship%2C258&sr=1-1)
3. [Node-Redis](https://github.com/redis/node-redis)
4. [redis-om-node](https://github.com/redis/redis-om-node/tree/main?tab=readme-ov-file#full-text-search)
5. [Query syntax](https://redis.io/docs/latest/develop/interact/search-and-query/advanced-concepts/query_syntax/)
6. [Aggregations](https://redis.io/docs/latest/develop/interact/search-and-query/advanced-concepts/aggregations/)


### Epilogue
`Learn by comparison` is my motto in studying. The rationale behind is commonality and differential. While questing for some knowledge of [Redis Stack](https://redis.io/about/about-stack/), I was chanced to be aware of some fun facts: 

1. [SINTER](https://redis.io/docs/latest/commands/sinter/) and alike to be used in [Faceted Search](https://www.oxfordsemantic.tech/faqs/what-is-faceted-search) is an analogy to [SQL INNER JOIN](https://www.w3schools.com/sql/sql_join_inner.asp) operation. 

2. [HASH](https://redis.io/docs/latest/commands/?group=hash) can be compared to a single [SQL ROW](https://www.educba.com/sql-row/). 

3. Partial [Indexing](https://redis.io/docs/latest/develop/interact/search-and-query/indexing/) as a result of reducing memory usage, works similarly to [SQL Views](https://www.w3schools.com/sql/sql_view.asp). 

Does these pure coincidence? Or some underlaying intricacy drives them together? I not know... 

```
“To be, or not to be, that is the question”
BY WILLIAM SHAKESPEARE
```

> It is also recommended to refrain from indexing all of the fields within a document, as that will consume considerable compute overhead and space, which is an antipattern of Redis. (Indexing JSON Documents with RediSearch)

### EOF (2024/05/03)
