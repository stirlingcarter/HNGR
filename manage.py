#!/usr/bin/python
import os
from flask_script import Manager # class for handling a set of commands
from flask_migrate import Migrate, MigrateCommand
from instance.config import app_config
from app import db, app
from app import models

app = app
config_name = os.getenv('APP_SETTINGS')
app.config.from_object(app_config[config_name])
migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()