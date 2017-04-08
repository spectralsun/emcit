from flask import Flask, render_template, request
from urlparse import urlparse
from flask_login import LoginManager, UserMixin, login_required

from emcit.api import (
    account_api,
    user_api,
    report_api
)
from emcit.models import User

app = Flask(__name__)


try:
    app.config.from_object('config')
except:
    app.config.from_object('configdist')

app.secret_key = app.config['SECRET_KEY']
app.register_blueprint(account_api, url_prefix='/api/v1/account')
app.register_blueprint(user_api, url_prefix='/api/v1/user')
app.register_blueprint(report_api, url_prefix='/api/v1/report')

login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

login_manager.init_app(app)

@app.route('/')
@app.route('/<path:path>')
def index(path=None):
    if urlparse(request.url).hostname[:6] == 'mobile':
        return render_template('mobile.html')
    else:
        return render_template('desktop.html')
