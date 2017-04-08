from flask import jsonify
from flask_login import current_user
from functools import wraps


def required_access(role):
    def templated(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if current_user.is_anonymous or not user_has_role_or_higher(current_user, role):
                return 'Access Denied.', 403
            return f(*args, **kwargs)
        return decorated
    return templated

def user_has_role_or_higher(user, role):
    if user.role == 'admin':
        return True
    elif user.role == 'analyzer' and role != 'admin':
        return True
    elif user.role == role:
        return True

def api_error(message='Bad Request', code=400):
    return jsonify(error=message, _status_code=code)
