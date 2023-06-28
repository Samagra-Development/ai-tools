from cache import AsyncTTL

class CustomAsyncTTL(AsyncTTL):
    def __call__(self, func):
        async def wrapper(*args, use_cache=True, **kwargs):
            key = self._generate_cache_key(args, kwargs)
            response = None
            if key in self.ttl and use_cache:
                response = self.ttl[key]['response']
                # Add custom header to indicate the response is from cache
                response.headers['ai-tools-cached'] = 'true'
            else:
                response = await func(*args, **kwargs)
                # Cache the response for future use
                self.ttl[key] = {'response': response}

            return response

        wrapper.__name__ += func.__name__

        return wrapper
