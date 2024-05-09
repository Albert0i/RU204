
-- retrieve string value in "prefix:data:key" format 
local key = KEYS[1]..'data:'..KEYS[2] 
local value = redis.call('GET', key)

return value