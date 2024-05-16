### [Far side of the Moon](https://www.skyatnightmagazine.com/space-science/moon-far-side)

```
The moving Moon went up the sky,
And no where did abide:
Softly she was going up,
And a star or two beside—
```


### Prologue
A sense of remembrance and exoticism surges within and without upon beholding her, it just thicks my blood and ceases my heart... 

Being an embedded scriping language by design, Lua emits an odour of linguistic features of old, such as array subscript starts with one (instead of zero), goto statement and coroutine (協同子程式) which are not presents in most of the modern programming languages. 

This is doomed to be a small article in which I am going to pen down. A note of bizarreness and strangeness of Lua with the help of ChatGPT. 


### 1. Terminator and separator 
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


### 2. Comments
In Lua, there are two types of comments: single-line comments and multi-line comments.

Single-line comments start with a double hyphen (`--`) and continue until the end of the line. They are used to add explanatory or descriptive comments to your code.

```lua
-- This is a single-line comment in Lua
local age = 25  -- Variable assignment
```

Multi-line comments, also known as block comments, are enclosed between `--[[` and `]]--`. They can span multiple lines and are typically used for longer explanations or for temporarily disabling blocks of code.

```lua
--[[ 
    This is a multi-line comment
    in Lua. It can span
    multiple lines.
--]]

--[[
    This is another example of a multi-line comment.
    You can include as many lines as needed
    between the opening and closing delimiters.
]]
```


### 3. String literals
In Lua, string literal are either encased by single quote (`'`) or double quote:(`"`) 

```lua
'I fear thee, ancient Mariner!'

"I fear thy skinny hand!"
```

Multiple line string literal are encased by `--[[` and `]]--`. 

```lua
--[[ 
    An orphan's curse would drag to hell
    A spirit from on high;
    But oh! more horrible than that
    Is the curse in a dead man's eye!
    Seven days, seven nights, I saw that curse,
    And yet I could not die.
--]]
```


### 4. Global and local
In Lua, variable and function prefixed by keyword *local* are of local scope otherwise they are supposed to be global. By convention, global variable and function *should* starts with capital letter although it is not compulsory to do so. In addition, uppercase and lowercase are perceived to be different.

```lua
-- local to the defined block 
local var1 = 123
local var2 = 'lua'

-- global in everywhere 
Var1 = 123
Var2 = 'lua'
```


### 5. String concatenate 
In Lua, strings and other objects can be concatenate using two-dot (`..`) operator:

```lua
local last_name = "Taylor"
local age = 61 

print(first_name .. ' ' .. last_name)
print('Die on age ' .. age)

-- Output: 
-- Samuel Taylor
-- Die on age 61
```


### 6. Tables 
In Lua, a table is the primary data structure used to store collections of values. Tables can be thought of as associative arrays, dictionaries, or objects, depending on how they are used. They are extremely versatile and can be used to represent arrays, key-value pairs, and even objects with methods and properties.

Here are some key characteristics and features of Lua tables:

#### 6.1. Creation
Tables are created using curly braces `{}` or the `table` constructor function. For example:

```lua
local myTable = {}  -- Empty table
local person = {name = "John", age = 30}  -- Table with initial values
```

#### 6.2. Indexing
Tables can be indexed using both numerical and string keys. Numerical indices start from 1, while string indices can be any valid string. The values associated with keys can be accessed or modified using the indexing syntax:

```lua
local fruits = {"apple", "banana", "orange"}
print(fruits[1])  -- Output: apple

local person = {name = "John", age = 30}
print(person.name)  -- Output: John
```

#### 6.3. Length Operator 
The length operator `#` can be used to obtain the number of elements in an array-like table:

```lua
local fruits = {"apple", "banana", "orange"}
print(#fruits)  -- Output: 3
```

#### 6.4. Iteration
Tables can be iterated using various looping constructs, such as `for` loops and the `pairs` function:

```lua
local person = {name = "John", age = 30}
for key, value in pairs(person) do
    print(key, value)
end
-- Output: 
--         name   John
--         age    30
```

#### 6.5. Metatables
Tables in Lua can have metatables, which allow you to define custom behavior for certain operations. Metatables enable operator overloading and implement object-oriented programming concepts like inheritance and method invocation.

```lua
-- Create a 2D array with size 3x3
local array = {}
for i = 1, 3 do
  array[i] = {}
  for j = 1, 3 do
    array[i][j] = 0
  end
end

-- Access and modify elements
array[2][3] = 5
print(array[2][3])  -- Output: 5
```

#### 6.6. Dynamic Nature
Tables in Lua are dynamic and can be modified at runtime. You can add new elements, remove existing ones, or change the values associated with keys.


### 7. Function with variable number of parameters
In Lua, a function can take variable number of parameters, ie: 

```lua
-- Function that accepts variable parameters and sums them
function sum(...)
  local total = 0
  local args = {...}  -- Collect variable arguments into a table

  for i = 1, #args do
    total = total + args[i]
  end

  return total
end

-- Call the function with different numbers of arguments
print(sum(1, 2, 3))         -- Output: 6
print(sum(4, 5, 6, 7, 8))   -- Output: 30
print(sum(10))              -- Output: 10
print(sum())                -- Output: 0
```
In this example, the sum function accepts variable parameters using the `...` notation. The function collects all the arguments into a table named args. It then iterates over the elements of args and accumulates the sum of all the values.

You can call the sum function with any number of arguments, and it will dynamically handle them. In the example, we call the function with different numbers of arguments to demonstrate its flexibility.

Note that the ellipsis ... represents a table of all the passed arguments within the function. You can access individual arguments using indexing, similar to how you would access elements in a regular Lua table.


### 8. Function returns multiple values 
In Lua, a function can return multiple values, ie: 

```lua
-- Function that returns multiple values
function getCoordinates()
  local x = 10
  local y = 20
  local z = 30
  return x, y, z
end

-- Call the function and store the returned values
local a, b, c = getCoordinates()

-- Output the returned values
print(a, b, c)  -- Output: 10 20 30
```

Lua supports returning multiple values from a function by simply separating them with commas in the return statement. When calling a function that returns multiple values, you can assign them to multiple variables using multiple assignment, as shown in the example.

You can also capture the returned values in a table if you prefer, like this:

```lua
local coordinates = {getCoordinates()}

print(coordinates[1], coordinates[2], coordinates[3])  -- Output: 10 20 30
```

In this case, the returned values are collected into a table coordinates using a single assignment.


### 9. Coroutine 
Note: Copied verbatim from section **2.6 – Coroutines** of [Lua 5.4 Reference Manual](https://www.lua.org/manual/5.4/). 

Lua supports coroutines, also called collaborative multithreading. A coroutine in Lua represents an independent thread of execution. Unlike threads in multithread systems, however, a coroutine only suspends its execution by explicitly calling a yield function.

You create a coroutine by calling coroutine.create. Its sole argument is a function that is the main function of the coroutine. The create function only creates a new coroutine and returns a handle to it (an object of type thread); it does not start the coroutine.

You execute a coroutine by calling coroutine.resume. When you first call coroutine.resume, passing as its first argument a thread returned by coroutine.create, the coroutine starts its execution by calling its main function. Extra arguments passed to coroutine.resume are passed as arguments to that function. After the coroutine starts running, it runs until it terminates or yields.

A coroutine can terminate its execution in two ways: normally, when its main function returns (explicitly or implicitly, after the last instruction); and abnormally, if there is an unprotected error. In case of normal termination, coroutine.resume returns true, plus any values returned by the coroutine main function. In case of errors, coroutine.resume returns false plus the error object. In this case, the coroutine does not unwind its stack, so that it is possible to inspect it after the error with the debug API.

A coroutine yields by calling coroutine.yield. When a coroutine yields, the corresponding coroutine.resume returns immediately, even if the yield happens inside nested function calls (that is, not in the main function, but in a function directly or indirectly called by the main function). In the case of a yield, coroutine.resume also returns true, plus any values passed to coroutine.yield. The next time you resume the same coroutine, it continues its execution from the point where it yielded, with the call to coroutine.yield returning any extra arguments passed to coroutine.resume.

Like coroutine.create, the coroutine.wrap function also creates a coroutine, but instead of returning the coroutine itself, it returns a function that, when called, resumes the coroutine. Any arguments passed to this function go as extra arguments to coroutine.resume. coroutine.wrap returns all the values returned by coroutine.resume, except the first one (the boolean error code). Unlike coroutine.resume, the function created by coroutine.wrap propagates any error to the caller. In this case, the function also closes the coroutine (see coroutine.close).

As an example of how coroutines work, consider the following code:

```lua
function foo (a)
       print("foo", a)
       return coroutine.yield(2*a)
     end
     
     co = coroutine.create(function (a,b)
           print("co-body", a, b)
           local r = foo(a+1)
           print("co-body", r)
           local r, s = coroutine.yield(a+b, a-b)
           print("co-body", r, s)
           return b, "end"
     end)
     
     print("main", coroutine.resume(co, 1, 10))
     print("main", coroutine.resume(co, "r"))
     print("main", coroutine.resume(co, "x", "y"))
     print("main", coroutine.resume(co, "x", "y"))
```

When you run it, it produces the following output:

```lua
co-body 1       10
     foo     2
     main    true    4
     co-body r
     main    true    11      -9
     co-body x       y
     main    true    10      end
```

You can also create and manipulate coroutines through the C API: see functions lua_newthread, lua_resume, and lua_yield.


### 10. [Executing Lua in Redis](https://redis.io/docs/latest/develop/interact/programmability/lua-api/)
Note: Copied verbatim from **Runtime libraries** sectioin of [Redis Lua API reference](https://redis.io/docs/latest/develop/interact/programmability/lua-api/). 

Redis includes an embedded [Lua 5.1](https://www.lua.org/) interpreter. The interpreter runs user-defined [ephemeral scripts and functions](https://redis.io/docs/latest/develop/interact/programmability/eval-intro/). Scripts run in a sandboxed context and can only access specific Lua packages. This page describes the packages and APIs available inside the execution's context.

The following [standard Lua libraries](https://www.lua.org/manual/5.1/manual.html#5) are available to use:

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
I was from ancient times and love ancient things... My very first programming language was BASIC on [The TRS-80 Model I](http://www.trs-80.org/model-1/) which came with 4K of RAM, and a 4K ROM. 


### EOF (2024/05/17)
