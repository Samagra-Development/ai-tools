from src.coref.spacy.local import *
import asyncio, aiohttp, time
from quart import Quart

str_to_test = 'How can I increase the yield of my tomato crop? Using high-quality seeds and proper fertilization techniques can increase tomato yield. When should I apply them?'

app = Quart(__name__)

async def single_inference(app, text, index):
    m = Model(app)
    resp = await m.inference(ModelRequest(text=text))
    print(f"{index}: {resp}")



async def bench_text_lang_detection(app):
    tasks = []

    for i in range(len(str_to_test)):
        task = single_inference(app, str_to_test[0:i], i)
        tasks.append(task)

    await asyncio.gather(*tasks)



async def main():
    app.client = aiohttp.ClientSession()
    start_time = time.perf_counter()
    await bench_text_lang_detection(app)
    end_time = time.perf_counter()

    print(f"Time taken: {end_time - start_time:.4f} seconds for {len(str_to_test)} characters")
    await app.client.close()


asyncio.run(main())