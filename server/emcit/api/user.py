"""User administration API"""
from flask import request, jsonify, Blueprint
from flask_login import current_user
from emcit.models import User
from emcit.resources import UserAdministrationResource
from emcit.util import required_access, api_error, form_error, validate
from emcit.schemas import user_schema, update_user_schema

user_api = Blueprint('user_api', __name__)


@user_api.route('', methods=['GET'])
@required_access('admin')
def get_users():
    return jsonify(map(UserAdministrationResource, User.all()))


@user_api.route('/<int:user_id>', methods=['GET'])
@required_access('admin')
def get_user(user_id):
    return jsonify(UserAdministrationResource(User.get(user_id)))


@user_api.route('', methods=['POST'])
@required_access('admin')
@validate(user_schema)
def create_user():
    data = request.get_json()
    if User.get_by_email(data.get('email')):
        return api_error(dict(email=['Email already exists']))
    user = User.from_json(data)
    user.save()
    return jsonify(UserAdministrationResource(user))


@user_api.route('/<int:user_id>', methods=['PUT'])
@required_access('admin')
@validate(update_user_schema)
def update_user(user_id):
    user = User.get_by_id(user_id)

    if not user:
        return form_error('User not found')

    data = request.get_json()

    if data['email'] != user.email and User.get_by_email(data['email']):
        return api_error(dict(email=['Email already in use']))

    if 'password' in data and len(data['password']) > 0:
        user.set_password(data.get('password'))

    user.name = data['name']
    user.email = data['email']
    user.phone_number = data['phone_number']
    user.role = data['role']
    user.save()

    return jsonify(UserAdministrationResource(user))


@user_api.route('/<int:user_id>', methods=['DELETE'])
@required_access('admin')
def delete_user(user_id):
    user = User.get(user_id)

    if not user:
        return form_error('User not found')
    if user.id == current_user.id:
        return form_error('Cannot delete self')

    user.delete()

    return '', 202
