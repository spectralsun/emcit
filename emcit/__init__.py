from flask import Flask, render_template


app = Flask(__name__)

@app.route('/mobile')
def mobile():
    return render_template('mobile.html')

@app.route('/desktop')
def desktop():
    return render_template('desktop.html')
