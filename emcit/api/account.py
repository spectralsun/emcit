"""User login/logout/profile etc API"""

from datetime import datetime, timedelta
from flask import Blueprint, current_app, request
from flask.ext.login import (
    login_user, logout_user, login_required, current_user
)

from emcit.forms import (
    LoginForm
)
from emcit.models import User
from emcit.util import api_error, required_access


account_api = Blueprint('account_api', __name__)


@account_api.route('/current_user', methods=['GET'])
def get_current_user():
    user = None
    if current_user.is_authenticated:
        user = current_user
    return jsonify(current_user=user)


@account_api.route('/login', methods=['POST'])
def login():
    """
    Authenticate with the application.
    """
    # TODO: issue API key here instead of cookie
    form = LoginForm(request.json_multidict)
    if not form.validate_on_submit():
        return api_error(form.errors)
    user = User.get_by_email(form.email.data.lower())
    password = form.password.data
    if user is not None and user.check_password(password):
        login_user(user)
        return jsonify(user)
    return api_error(dict(form=['Invalid username/password.']))

@account_api.route('/logout', methods=['POST'])
@login_required
def logout():
    """
    Deauthenticate with the application.
    """
    # TODO: de-auth API key
    logout_user()
    return jsonify(csrf_token=csrf_protect._get_csrf_token())
