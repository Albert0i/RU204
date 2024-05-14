import {expect, jest, test} from '@jest/globals';
import { redisClient, readCache, writeCache } from "../src/config/redisClientCombo.js";
import { leonard, sheldon, rajesh, howard, penny, bernadette, amy, stuart, leslie, barry } from "../src/bbt.js"

const testSuiteName = 'cacheDemo2';
const testKey = 'rajesh';

beforeAll(async () => {
    jest.setTimeout(60000);

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
});

afterAll(async () => {
    // Release Redis connection.
    redisClient.disconnect();
});

test(`${testSuiteName}: basic readCache`, async () => {
    const keyValue = await readCache(testKey);
    expect(keyValue).toMatch(JSON.stringify(rajesh));
});

test(`${testSuiteName}: basic readCache (60 seconds later)`, async () => {
    setTimeout(async () => {
        const keyValue = await readCache(testKey);
        expect(keyValue).toBe(null);
    }, 60000 )
});

/*
   npm run test -t demo2 
   
   "Uncaught SyntaxError: Cannot use import statement outside a module" when importing ECMAScript 6
   https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import
*/