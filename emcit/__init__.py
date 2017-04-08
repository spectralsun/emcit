from flask import Flask, render_template, request
from urlparse import urlparse

from emcit.api import (
    #account_api,
    #user_api,
    report_api
)

app = Flask(__name__)

@app.route('/')
def index():
    if urlparse(request.url).hostname[:6] == 'mobile':
        return render_template('mobile.html')
    else:
        return render_template('desktop.html')


#app.register_blueprint(account_api, url_prefix='/api/v1/account')
#app.register_blueprint(user_api, url_prefix='/api/v1/user')
app.register_blueprint(report_api, url_prefix='/api/v1/report')
