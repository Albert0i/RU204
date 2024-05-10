local cursor = "0"
local sum = 0

repeat
    local result = redis.call('SSCAN', KEYS[1], cursor)
    cursor = result[1]
    local members = result[2]
    
    for i, member in ipairs(members) do
        if tonumber(member) then 
          sum = sum + tonumber(member)
        end
    end
until cursor == "0"

return sum

-- Generated by ChatGPT