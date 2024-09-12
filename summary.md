### Summary from RU204 


#### Prologue 


#### I. Managing JSON Data in Redis
Welcome to the first section of RU204, Managing JSON Data in Redis. In the next four units, you'll learn the following, the rationale for using the [Redis JSON](https://redis.io/json/) module over the core Redis offering, how to store JSON documents in Redis with Redis JSON, how to retrieve subdocuments and specific values within documents, how to update existing documents and add new subdocuments and values. 

![alt RU204 Section 1 Overview](img/RU204_Section_1_Overview.JPG)

Each unit will have a hands-on exercise designed to explore the topics covered and solidify your Redis JSON skills. Since the goal of this section is to familiarize you with Redis JSON, the exercises will be based on entering commands into the Command Line Interface to demonstrate common actions performed on JSON documents.

1. Storing and Retrieving JSON with Redis Strings

The traditional approach to storing JSON documents in Redis has been to *serialize* them to Strings. Serialization happens in application code, with the resulting String value saved in Redis using the `SET` command.

Reading or updating JSON documents stored in this way can be a costly operation. The entire document needs to be retrieved from Redis, and *deserialized* back to its original form, a process that usually happens in your application's code.

![alt asset-v1_redislabs+RU204+2022_01+type@asset+block@JSON_to_String](img/asset-v1_redislabs+RU204+2022_01+type@asset+block@JSON_to_String.png)

Serialized JSON Documents cannot be updated by Redis String commands. The process of retrieving, deserializing, updating, re-serializing, then re-storing the document to update a single field would be considered an expensive set of operations for both Redis and the client application.

![alt asset-v1_redislabs+RU204+2022_01+type@asset+block@JSON_to_Hash](img/asset-v1_redislabs+RU204+2022_01+type@asset+block@JSON_to_Hash.png)

A more efficient solution than a String could be the Hash data type. Hashes store multiple field-value pairs at a single key. Accessing Hash values is a constant-time complexity operation, so this is a valid solution. When serializing JSON to a Redis Hash, we can only go one level deep, so arrays and embedded objects in the JSON document still need to be serialized to String values or modeled in a different way.

![alt asset-v1_redislabs+RU204+2022_01+type@asset+block@JSON_to_multi](img/asset-v1_redislabs+RU204+2022_01+type@asset+block@JSON_to_multi.png)

Using more of the native data types in Redis, Lists and Hashes could be created for a JSON document's nested objects. This would require a document to be broken up and stored in multiple different Redis keys. Creating, reading, updating and deleting a document would require multiple calls to Redis as well as incurring the overhead required to marshall data between Redis data types and JSON. This approach can quickly become unwieldy and should be considered an [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern), as the goal of Redis is for speed and efficiency.

--- 
In simple terms, an "anti-pattern" is a common solution to a problem that seems good at first but actually makes things worse in the long run. It's like a recipe for disaster in the world of problem-solving or software development. Just like how a bad cake recipe leads to a terrible cake, an anti-pattern can lead to problems, inefficiencies, or difficulties in projects or processes. It's something you want to avoid if you want things to work smoothly and efficiently.

2. Introducing RedisJSON

RedisJSON is a component within Redis Stack that lets you store, update and retrieve JSON documents in Redis as a native data type. With RedisJSON, documents can be updated atomically and efficiently in-place in Redis. Your application code no longer needs to read an entire document from Redis or deal with serialization and deserialization in order to update or retrieve document fragments.

RedisJSON allows users to store a JSON document at a single Redis key regardless of depth or child data types. There are no additional keys or data structure mappings required. JSON document fragments can also be viewed and modified without retrieving the entire object - saving a lot of custom application code, time and network bandwidth.

Here are some key features of RedisJSON:

- Full support for the JSON standard: JSON created and utilized by programming languages and their frameworks can be natively stored in Redis.

- JSONPath syntax for selecting/updating elements inside documents: individual and multiple values can be selected and retrieved using the standard JSONPath syntax.

- New commands enabling atomic operations on all JSON value types.

`Commands`

RedisJSON adds many new commands to Redis. All RedisJSON commands have the "JSON." prefix. To store or update a document, we use `JSON.SET`. To retrieve either a complete document or a fragment of one, we'll use `JSON.GE`T.

In this section, we'll introduce some RedisJSON commands, using the following simple document as our data source:

```
{
    "base_id": 18161,
    "author": " Jennifer L. Armentrout",
    "title": "Obsidian",
    "pages": 999,
    "inventory": [
        {
            "stock_number": "18161_1",
            "status": "on_loan"
        },
        {
            "stock_number": "18161_3",
            "status": "maintenance"
        }
    ],
    "genres": [
        "Young Adult",
        "Fantasy",
        "Science Fiction (Aliens) ",
        "Science Fiction"
    ]
}
```

2.1. Storing a JSON Document

To create a new JSON document in Redis, use the `JSON.SET` command:
```
JSON.SET ru204:book:18161 $ '{"base_id":18161,"author":"Jennifer L. Armentrout","title":"Obsidian","pages":999,"inventory":[{"stock_number":"18161_1","status":"on_loan"},{"stock_number":"18161_3","status":"maintenance"}],"genres":["Young Adult","Fantasy","Science Fiction (Aliens)","Science Fiction"]}'
```

Redis responds with: "OK". Notice the dollar sign **$** after the key name and before the JSON string in single quotes. This is a JSONPath that represents the root of the document. We'll see how to use this path to perform partial updates on existing documents later.

![alt asset-v1_redislabs+RU204+2022_01+type@asset+block@Screen_Shot_2022-07-26_at_9.52.07_AM.png](img/asset-v1_redislabs+RU204+2022_01+type@asset+block@Screen_Shot_2022-07-26_at_9.52.07_AM.png)

If you are using RedisInsight, you should see the document displayed as above when you navigate to `ru204:book/Keys/book:18161` in the key browser.

2.2. Setting a value within an existing JSON Document

The `JSON.SET` command is also used to update existing documents. For example, to change the number of pages in our book, we need to update the value of the "pages" field. As this field is at the root level, we use the JSONPath $.pages to identify it. To change the number of pages from 999 to 1025 for the book whose ID is 18161, use this command:
```
JSON.SET ru204:book:18161 $.pages 1025
```

Redis responds with: "OK"

$.pages refers to the pages field within the JSON document.

The JSONPath selector syntax to access embedded objects and arrays is similar to using dot notation when working with objects in JavaScript, or square brackets when working with dictionaries in Python.

2.3. Accessing a JSON Document

Use the `JSON.GET` command to retrieve RedisJSON documents from Redis. JSON.GET can be used to retrieve the entire document, multiple fields, or a single field.

Let's get the entire document for book 18161:
```
JSON.GET ru204:book:18161 $
```

Redis returns an array containing the JSON for book 18161:
```
"[{\"base_id\":18161,\"author\":\"Jennifer L. Armentrout\",\"title\":\"Obsidian\",\"pages\":999,\"inventory\":[{\"stock_number\":\"18161_1\",\"status\":\"on_loan\"},{\"stock_number\":\"18161_3\",\"status\":\"maintenance\"}],\"genres\":[\"Young Adult\",\"Fantasy\",\"Science Fiction (Aliens) \",\"Science Fiction\"]}]"
```

In the next module we'll examine how to use JSONPath expressions to retrieve single fields and parts of a document.

3. [RedisJSON Explained Video](https://youtu.be/I-ohlZXXaxs)

Hello, and welcome back. In this video, we'll take a look at what's new with Redis JSON. The big news is that you can now efficiently query and index your JSON documents in Redis. I want to revisit my previous challenge of organizing my favorite food trucks in Oakland, but this time let's add some extra spice with JSON path syntax and querying documents with Redis search. Tuck in, and let's get started

To start, we'll fire up a Redis Stack instance, which supports JSON, indexing, queries, and quite a bit more. We'll also be using RedisInsight, the Redis GUI, in these demos. Let's first check out the JSON we'll be working with. Our food trucks have been busy. Each food truck JSON object, known as a vendor, has a name, an array of cuisines offered, a primary cuisine, and an address. There are events about town that have a number of attending vendors, a start and end time, and an associated location ID. Lastly, there are locations that host events for the vendors. Locations contain an address object with coordinates providing the longitude and latitude. We can use these three JSON object types to discover which food trucks will be at certain locations during specific events. Let's start by inserting a new vendor JSON object into our Redis instance. Our new vendor is one of my favorites-- Tacos Mi Rancho. Here's the JSON object. We haven't inserted any event for Tacos Mi Rancho to attend yet. We'll do that in a bit. I'll call JSON.SET followed by a key name. I'll use the format truck colon and a unique ID number for each vendor. This is a new document. So I'll be storing it at the root path. I'll do this by setting the path option to the dollar sign followed by the JSON document in single quotes. Now we'll add another JSON document that we'll use to store details about a location. Here's a location JSON object representing the San Francisco International Airport. We'll store the entire JSON document in Redis in the same manner we used with the previous truck object. Only this time, the key name will be location:23. 

Finally, to bring everything together, we'll create a third document containing an event object. This object contains a location ID, start and end dates, and the number of vendors attending. Let's create an event at SFO on the 14th of July starting at 10:30 AM and ending at 2:00 PM. I'm converting the start time and end time to Unix timestamps, so we can query the dates. Now, we need to update our vendors that have the events within their object populated with all of the events that they are attending. Since the events property within the vendor is an array, I'll use an array append function. I'll call JSON.ARRAPPEND, truck:42, the JSON path, $.events, and lastly, the idea of the event. Events also need to take place at a location. Fortunately, we have JSON documents representing various locations within the Bay Area that will host the food trucks. Here's the JSON document for our location. Notice the info object within containing the address information and coordinates.

Redis JSON has no problem storing embedded objects-- a vast improvement over storing data as traditional flat hashes. Now, each event must have a location, so I'll insert the location ID into the event JSON with JSON.SET, event:11, $.location_id. I've shown you how to create and manipulate JSON documents in Redis with the newest version of Redis JSON. But did you know you can also index and query your JSON data? RediSearch, another component of Redis Stack, allows us to index data within our JSON documents and perform queries over a collection of documents. I'll show you how to do just that. I'm using Redis Stack, so RediSearch is already installed and ready to go. I'm going to create an index on a few select fields within my JSON data structure. This means I search using terms that I would expect to find within these fields. I want to search for a vendor's name, a particular cuisine, locations of events near me, or maybe events that have more than five food trucks, so we can enjoy some culinary variety. To do this, we'll want to create search indexes on the vendor and event documents. I'll start with the vendors. To create an index on all food trucks, I'll call FT.CREATE followed by a name. I'll call it idx:truck. ON JSON tells RediSearch that will be indexing and searching through JSON documents. PREFIX 1 truck colon instructs RediSearch to look inside all documents of the key prefix truck colon. This means that all subsequent vendor documents should also have the truck colon key prefix. SCHEMA tells RediSearch to create indexes with ensuing property and search type pairs. $.name AS name TEXT allows us to search the name properties as text under the search field name. SORTABLE means we'll receive the return search results in a sortable list. The next line is a bit more complex. We're flagging everything within the array cuisines within the vendor object as a tag search type separated by commas. So as an example, if we had a cuisines array containing BBQ, barbecue, and Texas, all three will be counted as tags. Now, I'll demonstrate searching using the index we just created. I'll look for the food truck we created by their name, Tacos Mi Rancho. Since they have the key, truck:42, RediSearch will have included this document in the index based on the truck colon prefix. I'll call FT.SEARCH, the index, idx:truck, then the query. Since I'll be searching for a name, I'll use @name to indicate I want to search within the name field of the JSON entries. I'll enter the word tacos as the search term. And I've received the vendor object for Tacos Mi Rancho. If I want to search using a phrase with multiple words, I'll want to wrap the entire query in single quotes like this.

Next, I'll search for a tag data type. Remember that we set the cuisines array in our vendor documents as a list of tags in our search index. This allows me to enter one of the tag words as a search term. I'll call FT.SEARCH, idx:truck, followed by the cuisines field. I want to find vendors with a tag word Peruvian within their cuisines array. So I'll enter Peruvian in curly braces. Note that when searching tags, the term must be wrapped in curly braces. Now, I want to create an index for our event JSON documents. For this index, I'll be searching through all keys with the prefix event colon. The SCHEMA will have three fields to search through-- $.assigned_vendors AS assigned_underscore NUMERIC SORTABLE. This indicates that assigned vendors will be a number. I'll want to be able to sort the results, so I'm including the option, SORTABLE. $.name will be treated the same as the vendor object's name. I'll set it as a text search type, and the results will be sortable. I want to treat $.location_name the same as name. I'll set it as location_name TEXT. Now, I'll try to find an event with five or more food trucks. I'll call FT.SEARCH, specifying idx:event as the index the search. In my query, @assigned_vendors tells RediSearch the field to look at and 5 and infinite in square brackets to find the range of values to search for. Pro tip-- if I wanted to search for events with exactly five assigned vendors, I would simply set the range from 5 to 5. The event I created earlier is returned since it has eight assigned vendors. That's a lot of delicious options. OK. That was a lot of info to go over. If you'd like to learn more about the new Redis JSON and how well it interacts with RediSearch at your own pace, check out our new Redis University course, RU204, Storing, Querying, and Indexing JSON at Speed. It's just one of many courses available to you covering specific topics within Redis. If you'd like to try it out Redis Stack, use one of the links in the video description below. You can download Redis Stack, or you can provision a basic instance in the cloud for free. No installation or local configuration necessary. Thanks for watching. I hope you enjoy these delicious new updates to Redis JSON and find them just as appetizing as I do.

4. 
5. 


#### II. Application Development with RedisJSON

1. 
2. 
3. 
4. 
5. 


#### III. Indexing and Searching JSON Documents

1. 
2. 
3. 
4. 
5. 


#### IV. Indexing and Searching in Your Application

1. 
2. 
3. 
4. 
5. 


#### V. Advanced Topics

1. 
2. 
3. 
4. 
5. 


#### Epilogue 


### EOF (2024/09/27) 
