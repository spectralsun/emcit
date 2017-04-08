from flask import jsonify
from flask_login import current_user
from functools import wraps


def required_access(*roles):
    def templated(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if current_user.is_anonymous or current_user.role not in roles:
                return 'Access Denied.', 403
            return f(*args, **kwargs)
        return decorated
    return templated

def api_error(message='Bad Request', code=400):
    return jsonify(error=message, _status_code=code)
