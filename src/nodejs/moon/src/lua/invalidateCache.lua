
-- invalidate tag set(s)
local result = nil
local cursor = "0"
local members = nil

-- iterate through all tag set(s)
for _, value in pairs(ARGV) do
    repeat
        result = redis.call("SSCAN", KEYS[1]..'tag:'..value, cursor)
        cursor = result[1]
        members = result[2]
        
        for _, member in pairs(members) do
            -- Remove each stored value 
            redis.call('DEL', member) 
        end
    until cursor == "0"
    -- also remove the tag set 
    redis.call('DEL', KEYS[1]..'tag:'..value)
end

return result