import logging
from flask import session

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def logging_decorator(func):
    def wrapper(*args, **kwargs):
        logger.info(f"Calling function: {func.__name__}")
        result = func(*args, **kwargs)
        logger.info(f"Function {func.__name__} returned: {result}")
        return result
    return wrapper

def user_session_decorator(func):
    def wrapper(*args, **kwargs):
        if 'user' not in session:
            logger.warning("User session not found.")
            return None
        logger.info(f"User session found: {session['user']}")
        result = func(*args, **kwargs)
        return result
    return wrapper
