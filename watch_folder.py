from watchgod import awatch


# flag to avoid multiple watch_task running at the same time
watch_task_running = False


async def restart_quart(app):
    """
    Restart the Quart application.

    Parameters:
    - app: The Quart application instance to restart.
    """
    print("Reloading Quart...")
    await app.shutdown()
    await app.startup()
    print("Quart reloaded.")


async def watch_src_folder(app, watch_dir):
    """
    Monitor changes in the 'src' folder and restart Quart on change.

    Parameters:
    - app: The Quart application instance to monitor and restart.
    - watch_dir: The path to the directory to monitor for changes.
    """
    global watch_task_running
    if watch_task_running or not app.debug:
        return
    watch_task_running = True
    async for changes in awatch(watch_dir):
        await restart_quart(app)
    watch_task_running = False