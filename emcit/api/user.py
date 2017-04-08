"""User administration API"""
from flask import jsonfiy
from flask.ext.login import current_user

from emcit.forms import BaseUserForm, FullUserForm
from emcit.models import User
from emcit.resource import UserAdministrationResource
from emcit.util import required_access, api_error


user_api = Blueprint('user_api', __name__)


@user_api.route('', methods=['GET'])
@required_access('admin')
def get_users():
    """
    Get a list of all users.
    """
    return jsonify(User.all().map(UserAdministrationResource))


@user_api.route('/<int:user_id>', methods=['GET'])
@required_access('admin')
def get_user(user_id):
    """
    Gets a user by id.
    """
    return jsonify(UserAdministrationResource(User.get(user_id)))


@user_api.route('', methods=['POST'])
@required_access('admin')
def create_user():
    """
    Create an user account.
    """
    form = FullUserForm()
    if not form.validate_on_submit():
        return api_error(form.errors)
    user = User(
        name=form.name.data,
        organization=form.organization.data,
        email=form.email.data,
        password=form.password.data,
        phone_number=form.phone_number.data,
        role=form.role.data
    )
    user.save()
    return jsonify(UserAdministrationResource(user))

@user_api.route('/<int:user_id>', methods=['PUT'])
@required_access('admin')
def update_user(user_id):
    """
    Update an user account.
    """
    user = User.get(user_id)
    if not user:
        return api_error('User not found', 404)
    form_kwargs = dict(
        validate_unique_email=user.email != request.json.get('email')
    )
    if 'password' in request.json:
        form = FullUserForm(**form_kwargs)
    else:
        form = BaseUserForm(**form_kwargs)
    if not form.validate_on_submit():
        return api_error(form.errors)
    user.email = form.email.data
    if 'password' in request.json:
        user.set_password(form.password.data)
    user.name = form.name.data
    user.organization = form.organization.data
    user.phone_number = form.phone_number.data
    user.role = form.role.data
    user.save()
    return jsonify(user)


@user_api.route('/<int:id>', methods=['DELETE'])
@required_access('admin')
def delete_user(id):
    """
    Delete an user.
    """
    user = User.get(id)
    if not user:
        return api_error('User not found', 404)
    if user.id == current_user.id:
        return api_error('Cannot delete self', 404)
    user.delete()
    return '', 202
