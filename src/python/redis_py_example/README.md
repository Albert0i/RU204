# RU204 redis-py Example

The following example demonstrates the execution of RedisJSON commands using the [redis-py](https://github.com/redis/redis-py) client.

## Prerequisites

* You'll need [Python 3.7](https://www.python.org/downloads/) or higher installed.
* You will need an instance of Redis Stack.  See the [setup instructions](/README.md) in the README at the root of this repo.
* If you are running your Redis Stack instance in the cloud or somewhere that isn't localhost:6379, you'll need to set the `REDIS_URL` environment variable to point at your instance before running the code.  If you need help with the format for this, check out the [Redis URI scheme specification](https://www.iana.org/assignments/uri-schemes/prov/redis).

## Setup

First, create a Python virtual environment and activate it:

```bash
python3 -m venv venv
. ./venv/bin/activate
```

You need to make a few adjustments since the Windows command prompt uses a different syntax. 

```cmd
python -m venv venv
venv\Scripts\activate
```

After running the activation command, you will see the name of the virtual environment (in this case, "venv") displayed in the command prompt. This indicates that you are working within the virtual environment.

Remember to use the deactivate command to exit the virtual environment when you're done working within it.

```
venv\Scripts\deactivate
```

Install redis-py and any other dependencies before running the code:

```bash
pip install -r requirements.txt
```

Ensure that your Redis Stack instance is running, and that you have set the `REDIS_URL` environment variable if necessary.  Example:

```bash
export REDIS_URL=redis://user:password@host:port
```

On Windows 10, the equivalent command to set an environment variable is slightly different than using export on Unix/Linux-based systems. 

```
set REDIS_URL=redis://user:password@host:port
```

To confirm that the environment variable is set correctly, you can run the echo command followed by the environment variable name:

```
echo %REDIS_URL%
```

This will display the value of the REDIS_OM_URL environment variable.

## Run the Code

```bash
python json_example.py
```

## View the Code

The code is contained in [`json_example.py`](./json_example.py).
