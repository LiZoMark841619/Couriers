from dotenv import load_dotenv
from app.settings import logger
import os

load_dotenv()

def get_env_variable(var_name, default_value=None, vartype=str):
    value = os.getenv(var_name)
    if value is None:
        if default_value is None:
            logger.error(f"Environment variable '{var_name}' not set and no default value provided.")
            raise ValueError(f"Environment variable '{var_name}' not set and no default value provided.")
        else:
            logger.warning(f"Environment variable '{var_name}' not set, using default value: {default_value}")
            return default_value
    if vartype == bool:
        value = value.lower() == 'true'
    try:
        return vartype(value)
    except ValueError as e:
        logger.error(f"Environment variable '{var_name}' is not a valid {vartype.__name__}: {e}")
        raise ValueError from e


class Config:
    DB_HOST = get_env_variable('DB_HOST', 'localhost')
    DB_PORT = get_env_variable('DB_PORT', 5432, int)
    DB_NAME = get_env_variable('DB_NAME', 'test_db')
    DB_USER = get_env_variable('DB_USER', 'test_user')
    DB_PASSWORD = get_env_variable('DB_PASSWORD', 'test_password')
    JWT_SECRET_KEY = get_env_variable('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"