import aiohttp
import asyncio

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

