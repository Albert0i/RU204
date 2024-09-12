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

To create a new JSON document in Redis, use the JSON.SET command:
```
JSON.SET ru204:book:18161 $ '{"base_id":18161,"author":"Jennifer L. Armentrout","title":"Obsidian","pages":999,"inventory":[{"stock_number":"18161_1","status":"on_loan"},{"stock_number":"18161_3","status":"maintenance"}],"genres":["Young Adult","Fantasy","Science Fiction (Aliens)","Science Fiction"]}'
```

Redis responds with: "OK". Notice the dollar sign $ after the key name and before the JSON string in single quotes. This is a JSONPath that represents the root of the document. We'll see how to use this path to perform partial updates on existing documents later.

![alt asset-v1_redislabs+RU204+2022_01+type@asset+block@Screen_Shot_2022-07-26_at_9.52.07_AM.png](img/asset-v1_redislabs+RU204+2022_01+type@asset+block@Screen_Shot_2022-07-26_at_9.52.07_AM.png)

If you are using RedisInsight, you should see the document displayed as above when you navigate to `ru204:book/Keys/book:18161` in the key browser.

2.2. Setting a value within an existing JSON Document

The JSON.SET command is also used to update existing documents. For example, to change the number of pages in our book, we need to update the value of the "pages" field. As this field is at the root level, we use the JSONPath $.pages to identify it. To change the number of pages from 999 to 1025 for the book whose ID is 18161, use this command:
```
JSON.SET ru204:book:18161 $.pages 1025
```

Redis responds with: "OK"

$.pages refers to the pages field within the JSON document.

The JSONPath selector syntax to access embedded objects and arrays is similar to using dot notation when working with objects in JavaScript, or square brackets when working with dictionaries in Python.

2.3. Accessing a JSON Document

Use the JSON.GET command to retrieve RedisJSON documents from Redis. JSON.GET can be used to retrieve the entire document, multiple fields, or a single field.

Let's get the entire document for book 18161:
```
JSON.GET ru204:book:18161 $
```

Redis returns an array containing the JSON for book 18161:
```
"[{\"base_id\":18161,\"author\":\"Jennifer L. Armentrout\",\"title\":\"Obsidian\",\"pages\":999,\"inventory\":[{\"stock_number\":\"18161_1\",\"status\":\"on_loan\"},{\"stock_number\":\"18161_3\",\"status\":\"maintenance\"}],\"genres\":[\"Young Adult\",\"Fantasy\",\"Science Fiction (Aliens) \",\"Science Fiction\"]}]"
```

In the next module we'll examine how to use JSONPath expressions to retrieve single fields and parts of a document.

3. 
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
