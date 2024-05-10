import { redisClient, readCache, writeCache, invalidateCache, flushCache } from "./config/redisClientCombo.js";
import { leonard, sheldon, rajesh, howard, penny, bernadette, amy, stuart, leslie, barry } from "./bbt.js"

// Store all main characters, use TTL to do housekeeping. 
await writeCache('leonard', leonard, [], 60)
await writeCache('sheldon', sheldon, [], 60)
await writeCache('rajesh', rajesh, [], 60)
await writeCache('howard', howard, [], 60)
await writeCache('penny', penny, [], 60)

await writeCache('bernadette', bernadette, [], 60)
await writeCache('amy', amy, [], 60)
await writeCache('stuart', stuart, [], 60)
await writeCache('leslie', leslie, [], 60)
await writeCache('barry', barry, [], 60)

// Retrieve individual 
console.log(await readCache('rajesh'))

// Retrieve individual after 60 seconds 
//console.log(await readCache('rajesh'))
setTimeout(async () => {
    console.log('60 seconds later...')
    console.log(await readCache('rajesh'))
    await redisClient.disconnect()    
}, 60000 )

// Flush cache 
//await flushCache()
//await redisClient.disconnect()
