

-- local modules = '' 
-- for moduleName, module in pairs(package.loaded) do
--     if modules == '' then
--         modules = moduleName
--     else
--         modules = modules .. ', ' .. moduleName
--     end    
-- end
-- return 'Version: ' .. _VERSION .. ', modules: '.. modules 

print(package.loaded)