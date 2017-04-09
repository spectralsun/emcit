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


def next_item(l, i):
    return l[i % len(l)]


locations = ["Hotel Eastlund, Northeast Grand Avenue, Portland, OR",
             "Lancaster Mall, Lancaster Drive Northeast, Salem, OR"]
lats = [45.5295934, 45.5295934, 45.5295934, 45.5269735, 45.5269735, 45.5269735]
lngs = [-122.6929498, -122.6929498, -122.6929498, -122.7670257, -122.7670257, -122.7670257]
categories = ["victim", "suspicious_person", "buyer"]
height = [36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81]
weight = [130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240]
sex = ['male', 'female']
hair_color = ['blond', 'brown', 'red', 'black', 'gray']
eye_color = ['amber', 'blue', 'brown', 'gray', 'green', 'hazel', 'red_violet']

make_models = [['ford', 'f150'], ['ford', 'pinto'], ['honda', 'accord'], ['honda', 'civic'], ['subaru', 'forester'],
               ['subaru', 'outback']]
car_colors = ['blue', 'red', 'yellow']


@manager.command
def seed_db():
    """Seed the database with users."""
    # Seed an admin, analyst, and a reporter
    models.User(
        'Admin Alice', 'alice@example.com', '1234', '5415551234',
        'admin').save()
    models.User(
        'Analyst Adam', 'adam@example.com', '1234', '5415551234',
        'analyst').save()
    models.User(
        'Repoter Rob', 'rob@example.com', '1234', '5415551234',
        'reporter').save()

    for [s, i] in [[str(i), i] for i in range(200)]:
        models.Report.from_json({
            "location": next_item(locations, i),
            "room_number": "12" + s,
            "geo_latitude": next_item(lats, i),
            "geo_longitude": next_item(lngs, i),
            "people": [{
                "name": "name" + s,
                "category": next_item(categories, i),
                "height": next_item(height, i),
                "weight": next_item(weight, i),
                "hair_color ": next_item(hair_color, i),
                "eye_color": next_item(eye_color, i),
                "sex": next_item(sex, i)
            }],
            "vehicles": [{
                "make": next_item(make_models, i)[0],
                "model": next_item(make_models, i)[1],
                "color": next_item(car_colors, i)
            }]
        }).save()


@manager.command
def drop_db():
    Model.metadata.drop_all(bind=engine)


@manager.command
def reseed_db():
    drop_db()
    create_db()
    seed_db()


if __name__ == '__main__':
    manager.run()
