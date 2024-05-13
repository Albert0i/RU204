import { redisClient, readCache, writeCache, removeCache, invalidateCache, flushCache } from "./config/redisClientCombo.js";
import { leonard, sheldon, rajesh, howard, penny, bernadette, amy, stuart, leslie, barry } from "./bbt.js"

// Store all main characters as well as their relationalships. 
await writeCache('leonard', leonard, ['friends', 'apartment-4A', 'schoolmate', 'second-couple'])
await writeCache('sheldon', sheldon, ['friends', 'apartment-4A', 'schoolmate', 'third-couple'])
await writeCache('rajesh', rajesh, ['friends', 'schoolmate'])
await writeCache('howard', howard, ['friends', 'schoolmate', 'first-couple'])
await writeCache('penny', penny, ['friends', 'apartment-4B', 'The-Cheesecake-Factory', 'second-couple'])

await writeCache('bernadette', bernadette, ['friends', 'first-couple'])
await writeCache('amy', amy, ['friends', 'third-couple'])
await writeCache('stuart', stuart, ['friends'])
await writeCache('leslie', leslie, ['schoolmate'])
await writeCache('barry', barry, ['schoolmate'])

// Retrieve individual 
console.log(await readCache('rajesh'))

// Remove 'penny' 
//console.log(await removeCache('penny', ['friends', 'apartment-4B', 'The-Cheesecake-Factory', 'second-couple']))

// Invalidate two tags 
//console.log(await invalidateCache(['apartment-4A', 'apartment-4B']))

// Retrieve individual 
console.log(await readCache('rajesh'))

// Flush cache 
//await flushCache()
await redisClient.disconnect()
