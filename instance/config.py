import os

class Config(object):
    """Parent configuration class."""
    DEBUG = False
    CSRF_ENABLED = True
    SECRET = os.getenv('SECRET')
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_secret')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    BCRYPT_LOG_ROUNDS = 13

class DevelopmentConfig(Config):
    """Configurations for Development."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4

class TestingConfig(Config):
    """Configurations for Testing, with a separate test database."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql:///test_db'
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4

class StagingConfig(Config):
    """Configurations for Staging."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4

class ProductionConfig(Config):
    """Configurations for Production."""
    DEBUG = False
    TESTING = False
    BCRYPT_LOG_ROUNDS = 4

app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'staging': StagingConfig,
    'production': ProductionConfig,
}