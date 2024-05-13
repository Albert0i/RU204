
### Fun with Cache 


### Prologue
Being one of the most eternally strategic and challenging issue, *caching* plays an outstanding role in modern computer systems. Technically speaking, it's completely possible to implement any systems using any decent and orthodox RDBMS. While RDBMS manages to keep up with renewed application requirements and yet, in some scenarios, caching is more necessary than required especially when *real-time* or *mobile computing* is involved, which always lead to awkwardness and cost-ineffective when pursuing such traits in monolithic system design. Therefore, a flexible and elastic solution is to attach a caching system to RDBMS. 


### I. Data Model 
The data model to be used here is for *faceted search*, ie: 

```
cache:data:001
cache:data:002
cache:data:003
cache:data:004
. . . 
   tag A           tag B           tag C
.----------.    .----------.    .----------.
| data:001 |    | data:002 |    | data:004 | 
| data:002 |    | data:003 |    |          |
'__________'    '----------'    '----------'
```
Each data is associated with one or more *tags*. Sets are used to keep track of stored data. To invalidate a set means removing all elements and the stored values. Simple enough... right? 


### II. Active and Manual
Store all main characters as well as their relationalships. 
```javascript
await writeCache('leonard', leonard, ['friends', 'apartment-4A', 'schoolmate', 'second-couple'])
await writeCache('sheldon', sheldon, ['friends', 'apartment-4A', 'schoolmate', 'third-couple'])
await writeCache('rajesh', rajesh, ['friends', 'schoolmate'])
await writeCache('howard', howard, ['friends', 'schoolmate', 'first-couple'])
await writeCache('penny', penny, ['friends', 'apartment-4B', 'The-Cheesecake-Factory', 'second-couple'])

await writeCache('bernadette', bernadette, ['friends', 'first-couple'])
await writeCache('amy', amy, ['friends', 'third-couple'])
await writeCache('stuart', stuart, ['friends'])
await writeCache('leslie', leslie, ['schoolmate'])
await writeCache('barry', barry, ['schoolmate'])
```

Retrieve individual. 
```javascript
await readCache('rajesh')
```

Remove individual. 
```javascript
await removeCache('penny', ['friends', 'apartment-4B', 'The-Cheesecake-Factory', 'second-couple'])
```

Invalidate two tags.  
```javascript
await invalidateCache(['apartment-4A', 'apartment-4B'])
```
There is a catch! If a key is associated with more than one tags. Invaliding a set may result in *dangling* key in other and memory will be wasted... 

Flush cache. 
```javascript
await flushCache()
```

Last but not least, to find out all friends and schoolmate. 
```
> keys cache:tag:*
1) "cache:tag:apartment-4A"
2) "cache:tag:The-Cheesecake-Factory"
3) "cache:tag:first-couple"
4) "cache:tag:friends"
5) "cache:tag:apartment-4B"
6) "cache:tag:schoolmate"
7) "cache:tag:second-couple"
8) "cache:tag:third-couple"

> sinter cache:tag:friends cache:tag:schoolmate 
1) "cache:data:leonard"
2) "cache:data:sheldon"
3) "cache:data:rajesh"
4) "cache:data:howard"
```


### III. Passive and Auto 

Store all main characters, use TTL to do housekeeping.
```javascript
await writeCache('leonard', leonard, [], 60)
await writeCache('sheldon', sheldon, [], 60)
await writeCache('rajesh', rajesh, [], 60)
await writeCache('howard', howard, [], 60)
await writeCache('penny', penny, [], 60)

await writeCache('bernadette', bernadette, [], 60)
await writeCache('amy', amy, [], 60)
await writeCache('stuart', stuart, [], 60)
await writeCache('leslie', leslie, [], 60)
await writeCache('barry', barry, [], 60)
```

Retrieve individual. 
```javascript 
await readCache('rajesh')
```

Retrieve individual after 60 seconds.
```javascript
setTimeout(async () => {
    console.log('A Few Moments Later...')
    console.log(await readCache('rajesh'))
    await redisClient.disconnect()    
}, 60000 )
```


### IV. Summary 
Data, per se, is a complicated things... More often than not, static data, CRUD data and transactional may be handled differently within a system. Static data such as products list, employee info and code tables etc changed infrequently. CRUD data such as shopping cart and books list etc only changed from time to time. Transactional data such as purchase order, invoice and receipt require high accuracy and security. 


### V. Bibliography 
1. [What is Redis Cache?](https://youtu.be/Tqaqdfxi-J4)
2. [QUERY CACHING WITH REDIS](https://redis.io/blog/query-caching-redis/)
3. [Using Redis with Nodejs and MongoDB](https://subhrapaladhi.medium.com/using-redis-with-nodejs-and-mongodb-28e5a39a2696)
4. [Five Best Ways To Use Redis With ASP.NET MVC](https://www.c-sharpcorner.com/article/five-best-ways-to-use-redis-with-asp-net-mvc/)
5. [Redis programmability](https://redis.io/docs/latest/develop/interact/programmability/)
6. [Scripting with Lua](https://redis.io/docs/latest/develop/interact/programmability/eval-intro/)
7. [Redis Lua API reference](https://redis.io/docs/latest/develop/interact/programmability/lua-api/)
8. [Full Lua Crash Course 💥 2.5 Hours 🖥️⌨️ Beginner's Programming Fundamentals Guide for Developers](https://youtu.be/zi-svfdcUc8)
9. [Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/)
10. [Ian McKellan reads "The Rime of the Ancient Mariner" by Samuel Taylor Coleridge](https://youtu.be/1raSUYAr0s0)


### Epilogue


### EOF (2024/05/17)