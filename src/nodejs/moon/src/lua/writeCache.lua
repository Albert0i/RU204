
-- store string value in "prefix:data:key" format 
local key = KEYS[1]..'data:'..KEYS[2] 
local value = ARGV[1]

local result = redis.call('SET', key, value)
-- result is "OK"

-- also store key in tag set(s)
result = 0
for i = 2, #ARGV do
    result = result + redis.call('SADD', KEYS[1]..'tag:'..ARGV[i], key)
end

return result