import {expect, jest, test} from '@jest/globals';
import { redisClient, readCache, writeCache, removeCache, invalidateCache, flushCache } from "../src/config/redisClientCombo.js";
import { leonard, sheldon, rajesh, howard, penny, bernadette, amy, stuart, leslie, barry } from "../src/bbt.js"

const testSuiteName = 'cacheDemo1';
const testKey1 = 'rajesh';
const testKey2 = 'penny';

beforeAll(async () => {
    jest.setTimeout(60000);

    // Store all main characters, use TTL to do housekeeping. 
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
});

afterAll(async () => {
    // Flush cache 
    await flushCache()
    // Release Redis connection.
    redisClient.disconnect();
});

test(`${testSuiteName}: basic readCache`, async () => {
    const keyValue = await readCache(testKey1);   
    expect(keyValue).toMatch(JSON.stringify(rajesh));
});

test(`${testSuiteName}: basic removeCache`, async () => {
    const num = await removeCache(testKey2, ['friends', 'apartment-4B', 'The-Cheesecake-Factory', 'second-couple']); 
    expect(num).toEqual(4);
});

test(`${testSuiteName}: basic readCache`, async () => {
    const keyValue = await readCache(testKey2);
    expect(keyValue).toBe(null);
});

test(`${testSuiteName}: basic invalidateCache`, async () => {
    const num = await invalidateCache(['apartment-4A'])
    expect(num).toEqual(3);
});

test(`${testSuiteName}: basic readCache`, async () => {
    const keyValue = await readCache('leonard');
    expect(keyValue).toBe(null);
});

test(`${testSuiteName}: basic readCache`, async () => {
    const keyValue = await readCache('sheldon');
    expect(keyValue).toBe(null);
});

/*
   npm run test -t demo1 

   "Uncaught SyntaxError: Cannot use import statement outside a module" when importing ECMAScript 6
   https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import
*/