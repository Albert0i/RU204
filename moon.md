### 

```
The moving Moon went up the sky,
And no where did abide:
Softly she was going up,
And a star or two beside—
```


### Prologue
A sense of remembrance and exoticism surges within and without on beholding her, whick thicks my blood and stops my heart. 

Being an embedded scriping language by design, Lua bears many old style language characteristic, such as array subscript starts with one instead of zero and goto statements which are seldom seen in modern programming languages. 

This dooms to be a small article. I am going to pen down some of the bizarreness or strangeness (I think) of Lua. 


### 1. Comment and multiline comment 
Single line comment starts with double dash characters, ie:
```
-- This is a single line comment 
```

Multiline comments starts with double dash characters and enclosed with double square brackets.
```
-- [[ This is a 
multiline comment]]
```

### 2. String and multiline string
string literal are either enclosed by single quote or double quote: 
```
"string literal 1"
'string literal 2'
```

multiple line string literal are enclosed with double square brackets. 
```
[[ This is a 
multiline string literal]]
```

### 3. Global and local variable/function
Variable/function prefixed by keyword *local* are local variable/function otherwise they are global. By convention, global variable/function *should* starts with capital letters although it is not enforced. Uppercase and lowercase are perceived to be different.  
```
local var1 = 123
local var2 = 'lua'

Global_var1 = 123
Global_var2 = 'lua'
```

### 4. String concatenate 
Strings are concatenate using two-dot (..) operator:
```
var1 .. var2 
'name' .. first_name
```


### 5. Core data structure - table
The core data structure in Lua is table, which can be used as indexed array and associated list. 


### 6. Variable parameters 
Function with variable parameters can be defiend with three-dot (...) after function name
```
function foo(...)
end 
```

### 7. Function return multiple values 
```
function foo() 
    return some_value, other_value
end 

local value1, value2 = foo()
```

### 8. 
```
```

### 9. Coroutine 
```
```

### 10. [Executing Lua in Redis](https://redis.io/docs/latest/develop/interact/programmability/lua-api/)

> Redis includes an embedded [Lua 5.1](https://www.lua.org/) interpreter. The interpreter runs user-defined [ephemeral scripts and functions](https://redis.io/docs/latest/develop/interact/programmability/eval-intro/). Scripts run in a sandboxed context and can only access specific Lua packages. This page describes the packages and APIs available inside the execution's context.

> The following [standard Lua libraries](https://www.lua.org/manual/5.1/manual.html#5) are available to use:

- The [String Manipulation (string) library](https://www.lua.org/manual/5.1/manual.html#5.4)
- The [Table Manipulation (table) library](https://www.lua.org/manual/5.1/manual.html#5.5)
- The [Mathematical Functions (math) library](https://www.lua.org/manual/5.1/manual.html#5.6)
- The [Operating System Facilities (os) library](https://redis.io/docs/latest/develop/interact/programmability/lua-api/#os-library)

In addition, the following external libraries are loaded and accessible to scripts:

- The [struct library](https://redis.io/docs/latest/develop/interact/programmability/lua-api/#struct-library)
- The [cjson library](https://redis.io/docs/latest/develop/interact/programmability/lua-api/#cjson-library)
- The [cmsgpack library](https://redis.io/docs/latest/develop/interact/programmability/lua-api/#cmsgpack-library)
- The [bitop library](https://redis.io/docs/latest/develop/interact/programmability/lua-api/#bitop-library)


### Bibliography 
1. [Full Lua Crash Course 💥 2.5 Hours 🖥️⌨️ Beginner's Programming Fundamentals Guide for Developers](https://youtu.be/zi-svfdcUc8)
2. [Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/)
3. [Redis programmability](https://redis.io/docs/latest/develop/interact/programmability/)
4. [Scripting with Lua](https://redis.io/docs/latest/develop/interact/programmability/eval-intro/)
5. [Redis Lua API reference](https://redis.io/docs/latest/develop/interact/programmability/lua-api/)
6. [The Rime of the Ancient Mariner, BY SAMUEL TAYLOR COLERIDGE](https://www.poetryfoundation.org/poems/43997/the-rime-of-the-ancient-mariner-text-of-1834)


### Epilogue


### EOF (2024/05/17)

Certainly! Here's a Lua tutorial with examples to help you understand the language better:

1. Variables and Basic Operations:

```lua
-- Variable assignment
local age = 25
local name = "John"
local isStudent = true

-- Basic operations
local sum = 10 + 5
local concatenation = name .. " Doe"
local logicalResult = isStudent and (age > 18)

print(sum)             -- Output: 15
print(concatenation)    -- Output: John Doe
print(logicalResult)    -- Output: true
```

2. Conditional Statements:

```lua
local temperature = 25

if temperature > 30 then
    print("It's hot!")
elseif temperature > 20 then
    print("It's warm.")
else
    print("It's cool.")
end
```

3. Loops:

```lua
-- While loop
local count = 1
while count <= 5 do
    print(count)
    count = count + 1
end

-- For loop
for i = 1, 5 do
    print(i)
end
```

4. Functions:

```lua
-- Function definition
function greet(name)
    print("Hello, " .. name .. "!")
end

-- Function call
greet("Alice")    -- Output: Hello, Alice!
```

5. Tables:

```lua
-- Creating and accessing tables
local fruits = {"apple", "banana", "orange"}
print(fruits[2])   -- Output: banana

-- Adding elements to a table
fruits[4] = "grape"
fruits.color = "red"

-- Iterating over a table
for key, value in pairs(fruits) do
    print(key, value)
end
```

6. Modules:

```lua
-- file: mymodule.lua
local M = {}

function M.sayHello()
    print("Hello from MyModule!")
end

return M

-- main.lua
local myModule = require("mymodule")
myModule.sayHello()   -- Output: Hello from MyModule!
```

7. Error Handling:

```lua
local success, result = pcall(function()
    -- Code that might throw an error
    error("Something went wrong!")
end)

if success then
    print("Success!")
else
    print("Error:", result)
end
```

8. Metatables:

```lua
-- Creating a table with a metatable
local person = {name = "John", age = 30}
local metatable = {
    __index = function(table, key)
        return "Unknown"
    end
}
setmetatable(person, metatable)

print(person.name)    -- Output: John
print(person.city)    -- Output: Unknown
```

These examples cover some of the basic concepts in Lua. Experimenting with these examples and exploring the official Lua documentation will help you gain a better understanding of the language and its capabilities.

(Generated by Chat-GPT)


In Lua, a table is the primary data structure used to store collections of values. Tables can be thought of as associative arrays, dictionaries, or objects, depending on how they are used. They are extremely versatile and can be used to represent arrays, key-value pairs, and even objects with methods and properties.

Here are some key characteristics and features of Lua tables:

1. Creation: Tables are created using curly braces `{}` or the `table` constructor function. For example:
   ```lua
   local myTable = {}  -- Empty table
   local person = {name = "John", age = 30}  -- Table with initial values
   ```

2. Indexing: Tables can be indexed using both numerical and string keys. Numerical indices start from 1, while string indices can be any valid string. The values associated with keys can be accessed or modified using the indexing syntax:
   ```lua
   local fruits = {"apple", "banana", "orange"}
   print(fruits[1])  -- Output: apple

   local person = {name = "John", age = 30}
   print(person.name)  -- Output: John
   ```

3. Length Operator: The length operator `#` can be used to obtain the number of elements in an array-like table:
   ```lua
   local fruits = {"apple", "banana", "orange"}
   print(#fruits)  -- Output: 3
   ```

4. Iteration: Tables can be iterated using various looping constructs, such as `for` loops and the `pairs` function:
   ```lua
   local person = {name = "John", age = 30}
   for key, value in pairs(person) do
       print(key, value)
   end
   -- Output: name   John
   --         age    30
   ```

5. Metatables: Tables in Lua can have metatables, which allow you to define custom behavior for certain operations. Metatables enable operator overloading and implement object-oriented programming concepts like inheritance and method invocation.

6. Dynamic Nature: Tables in Lua are dynamic and can be modified at runtime. You can add new elements, remove existing ones, or change the values associated with keys.

Tables are a fundamental part of Lua and are widely used for data storage, organizing code, implementing data structures, and more. Their flexibility makes them a powerful tool for various programming tasks.


In Lua, the semicolon (;) can be used as an optional line terminator or separator, similar to C/C++. However, it is not required in Lua as a line terminator because Lua uses line breaks as implicit line terminators. 

Lua allows multiple statements on the same line, separated by semicolons, but it is more common and idiomatic to write each statement on a separate line. Here's an example:

```lua
local a = 10; local b = 20; print(a + b)
```

Although the semicolon is used as a separator in this example, you could also write it as:

```lua
local a = 10
local b = 20
print(a + b)
```

Both versions are functionally equivalent.

It's worth noting that Lua's style guide and conventions generally encourage the use of line breaks for readability, unless there is a specific reason to use semicolons for separation.


In Lua, there are two types of comments: single-line comments and multi-line comments.

1. Single-line comments:
   Single-line comments start with a double hyphen (`--`) and continue until the end of the line. They are used to add explanatory or descriptive comments to your code.

   Example:
   ```lua
   -- This is a single-line comment in Lua
   local age = 25  -- Variable assignment
   ```

2. Multi-line comments:
   Multi-line comments, also known as block comments, are enclosed between `--[[` and `]]--`. They can span multiple lines and are typically used for longer explanations or for temporarily disabling blocks of code.

   Example:
   ```lua
   --[[ This is a multi-line comment
      in Lua. It can span
      multiple lines.
   --]]

   --[[
   This is another example of a multi-line comment.
   You can include as many lines as needed
   between the opening and closing delimiters.
   ]]
   ```

Both single-line and multi-line comments are ignored by the Lua interpreter and do not have any impact on the execution of the code. They are solely for human-readable documentation or annotating the code.

Comments are useful for providing context, explanations, or reminders within your Lua code, making it easier for yourself and others to understand your intentions and logic.