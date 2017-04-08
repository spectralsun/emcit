#!/usr/bin/env python
from flask_script import Manager

from emcit import app, models
from emcit.database import Model, engine


manager = Manager(app)

@manager.command
@manager.option('-n', '--name', help='First and/or Last Name')
@manager.option('-o', '--org', help='User\'s organization')
@manager.option('-e', '--email', help='Email')
@manager.option('-c', '--number', help='Phone Number')
@manager.option('-p', '--password', help='Password')
@manager.option('-r', '--role', help='Set role')
def create_user(name, org, email, number, password, role):
    user = models.User(
        name, org, email, password, number, [], role)
    user.save()


@manager.command
def create_db():
    Model.metadata.create_all(bind=engine)


@manager.command
def seed_db():
    """Seed the database with users."""
    # Seed an admin, analyist, and a reporter
    models.User(
        'Admin Alice', 'alice@example.com', '1234', '5415551234',
        'admin').save()
    models.User(
        'Analyst Adam', 'adam@example.com', '1234', '5415551234',
        'analyst').save()
    models.User(
        'Repoter Rob', 'rob@example.com', '1234', '5415551234',
        'reporter').save()

if __name__ == '__main__':
    manager.run()
