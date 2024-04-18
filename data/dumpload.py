"""Utility to dump and load keys from Redis. Key values are encoded in JSON. In
this module the following functions are available:

  * dump(fn, compress, match)
  * load(fn, compress)

"""
from redis import StrictRedis
import sys
import json
import base64
import gzip


def dump(redis, filename="/data/ru101.json", compress=False, match="*"):
  """Dump matching keys into JSOn file format"""

  count = 0
  try:
    if compress:
      filen = gzip.open(filename, "wb")
    else:
      filen = open(filename, "wb")
    for k in redis.scan_iter(match=match, count=1000):
      obj = {}
      t = redis.type(k)
      obj['t'] = t
      obj['k'] = k
      obj['ttl'] = redis.ttl(k)
      if t == b"hash":
        obj['v'] = redis.hgetall(k)
      elif t == b"set":
        obj['v'] = list(redis.smembers(k))
      elif t == b"zset":
        obj['v'] = redis.zrange(k, 0, -1, withscores=True)
      elif t == b"list":
        obj['v'] = redis.lrange(k, 0, -1)
      elif t == b"string":
        encoding = redis.object("encoding", obj['k'])
        obj['e'] = encoding
        if encoding == b"embstr":
          obj['v'] = redis.get(k)
        elif encoding == b"raw":
          obj['v'] = base64.b64encode(bytearray(redis.get(k)))
        else:
          print("got a string encoded as {}".format(encoding))
          continue
      else:
        print("got a type I don't do: {}".format(t))
        continue
      count += 1
      # 
      json_str = str(obj).replace("b\'", "'").replace("'", "\"")
      #print(json_str)
      filen.write(json_str.encode('utf-8'))
      filen.write(b"\n")
      #
  finally:
    filen.close()
    print("total keys dumped: {}".format(count))


def load(redis, filename="/data/ru101.json", compress=False):
  """Load keys from file in JSON format"""

  count = 0
  if compress:
    filen = gzip.open(filename, "rb")
  else:
    filen = open(filename, "r")
  try:
    line = filen.readline()
    p = redis.pipeline()
    while line:
      obj = json.loads(line)
      p.delete(obj['k'])
      if obj['t'] == "hash":
        # Needs to be hset but where's the key here?
        p.hset(obj['k'], mapping = obj['v'])
      elif obj['t'] == "set":
        for j in range(len(obj['v'])):
          p.sadd(obj['k'], obj['v'][j])
      elif obj['t'] == "zset":
        for j in range(len(obj['v'])):
          v, s = obj['v'][j]
          p.zadd(obj['k'], {v: s})
      elif obj['t'] == "list":
        for j in range(len(obj['v'])):
          p.rpush(obj['k'], obj['v'][j])
      elif obj['t'] == "string":
        if obj['e'] == "embstr":
          p.set(obj['k'], obj['v'])
        elif obj['e'] == "raw":
          bin_val = bytearray(base64.b64decode(obj['v']))
          vals = ["SET", "u8", 0, 0]
          for i in range(len(bin_val)):
            vals[2] = i * 8
            vals[3] = bin_val[i]
            p.execute_command("BITFIELD", obj['k'], *vals)
      else:
        print("got a type I don't do: {}".format(obj['t']))
        continue
      if 'ttl' in obj and obj['ttl'] >= 0:
        p.expire(obj['k'], obj['ttl'])
      p.execute()
      count += 1
      line = filen.readline()
  finally:
    filen.close()
    print("total keys loaded: {}".format(count))


def main(command, datafile, match="*"):
  """Entry point to execute either the dump or load"""
  import os
  redis_c = StrictRedis(host=os.environ.get("REDIS_HOST", "localhost"),
                        port=os.environ.get("REDIS_PORT", 6379),
                        password=os.environ.get("REDIS_PASSWORD", None),
                        db=0)
  if command == "load":
    load(redis_c, filename=datafile)
  elif command == "dump":
    dump(redis_c, filename=datafile, compress=False, match=match)
  else:
    print("Don't know how to do {}".format(command))


if __name__ == "__main__":
  if len(sys.argv) == 3: 
    print(sys.argv[1], sys.argv[2]) 
    main(sys.argv[1], sys.argv[2])
  elif len(sys.argv) == 4: 
    print(sys.argv[1], sys.argv[2], sys.argv[3]) 
    main(sys.argv[1], sys.argv[2], sys.argv[3]) 
  else:
    print('python dumpload.py dump <input.json> <prefix>')
    print('python dumpload.py load <output.json>')
