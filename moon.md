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
``

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