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

    for [s, x] in [[str(x), x] for x in range(10)]:
        models.Report.from_json({
            "location": "somewhere" + s,
            "room_number": "156" + s,
            "geo_latitude": 44.04534 + x,
            "geo_longitude": -100.432 + x,
            "people": [{
                "name": "name" + s,
                "category": ["victim", "suspicious_person", "buyer"][x % 3],
                "height": "height" + s,
                "weight": "weight" + s,
                "hair_color ": "hair_color" + s,
                "hair_length": "hair_length" + s,
                "eye_color": "eye_color" + s,
                "skin": "skin" + s,
                "sex": "sex" + s
            }],
            "vehicles": [{
                "make": "subaru" + s,
                "model": "outback" + s,
                "color": "white" + s
            }]
        }).save()


if __name__ == '__main__':
    manager.run()
