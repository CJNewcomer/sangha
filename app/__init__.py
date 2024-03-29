from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_socketio import SocketIO, send, emit
from .seeds import seed_commands
import os
import json

from .models import db, User, Message


from .api.auth_routes import auth_routes
from .api.user_routes import user_routes
from .api.class_routes import class_routes
from .api.review_routes import review_routes
from .api.message_routes import message_routes
from .api.quotes import quotes

from .config import Config
app = Flask(__name__)

app.config.from_object(Config)

# socketio setup -> server using socket and fix cors errors
socketio = SocketIO(app, cors_allowed_origins="*")

# run app with socketio
if __name__ == '__main__':
    socketio.run(app)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


# message handler function will be called and send message to each client on server

@socketio.on("message")
def handleMessage(msg):
    msg = json.loads(msg)
    message, sender_id, receiver_id = msg.values()

    message = Message(message=message, sender_id=sender_id,
                      receiver_id=receiver_id)
    db.session.add(message)
    db.session.commit()
    emit('message', {'msg': message.to_dict(), })
    print('received message' + message.message)


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(class_routes, url_prefix='/api/classes')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(message_routes, url_prefix='/api/messages')
app.register_blueprint(quotes, url_prefix='/api/quotes')


db.init_app(app)
Migrate(app, db,
        compare_type=True)


# Application Security
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
