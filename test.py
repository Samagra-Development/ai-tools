from src.text_lang_detection.bhashini.remote import *
import asyncio, aiohttp
from quart import Quart

app = Quart(__name__)


async def bench_text_lang_detection(app):
    str_to_test = "महात्मा गांधी का जन्म कहाँ हुआ था?"
    for i in range(len(str_to_test)):
        m = Model(app)
        resp = await m.inference(ModelRequest(text=str_to_test[0:i]))
        print("Here ", i, resp)


async def main():
    app.client = aiohttp.ClientSession()
    await bench_text_lang_detection(app)
    await app.client.close()


asyncio.run(main())
