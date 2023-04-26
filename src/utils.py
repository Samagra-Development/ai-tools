import aiohttp
import asyncio
from functools import wraps
from time import time


async def _request(method, url, headers, payload):
    async with aiohttp.ClientSession() as session:
        async with session.request(method=method, url=url, headers=headers, data=payload) as resp:
            return await resp.json()


def async_request(method: str, url: str, headers, payload):
    """ Make async request calls with aiohttp

    Args:
        method (str): HTTP method - POST | GET | PUT 
    """
    return asyncio.run(_request(method, url, headers, payload))


def timing(f):
    @wraps(f)
    def wrap(*args, **kw):
        ts = time()
        result = f(*args, **kw)
        te = time()
        print('func:%r args:[%r, %r] took: %2.4f sec' % \
          (f.__name__, args, kw, te-ts))
        return result
    return wrap

