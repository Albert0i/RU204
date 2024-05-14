
import {expect, jest, test} from '@jest/globals';
import { redisClient } from "../src/config/redisClientCombo.js";

const testSuiteName = 'Hello';
const testKey = 'hello';

/* eslint-disable no-undef */

beforeAll(() => {
  jest.setTimeout(60000);
});

afterAll(async () => {
  // Delete the key we may have created.
  await redisClient.del(testKey);

  // Release Redis connection.
  redisClient.disconnect();
});

test(`${testSuiteName}: basic hello world test`, async () => {
  const reply = await redisClient.set(testKey, 'world');
  expect(reply).toBe('OK');

  const keyValue = await redisClient.get(testKey);
  expect(keyValue).toBe('world');
});

/* eslint-enable */

/*
   npm run test -t hello 

   "Uncaught SyntaxError: Cannot use import statement outside a module" when importing ECMAScript 6
   https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import
*/