import os
from flask import Flask, render_template, request, session, jsonify
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_login import (
    LoginManager,
    current_user,
    login_user,
    logout_user,
    login_required
)

from backend.models import (
    db,
    User,
)

from backend.api import note_routes, sketchbook_routes, tool_routes, user_routes, photo_routes

from backend.config import Config


app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(note_routes, url_prefix='/api-notes')
app.register_blueprint(sketchbook_routes, url_prefix='/api-sketchbook')
app.register_blueprint(tool_routes, url_prefix='/api-tools')
app.register_blueprint(user_routes, url_prefix='/api-user')
app.register_blueprint(photo_routes, url_prefix='/api-photos')

db.init_app(app)
login_manager = LoginManager(app)

# included so alembic migrations folder within models folder
MIGRATION_DIR = os.path.join('backend', 'models', 'migrations')
Migrate(app, db, directory=MIGRATION_DIR)

# Application Security
# CORS(app)
CSRFProtect(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route('/api/csrf/restore')
def restore_csrf():
    id = current_user.id if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user_id": id}


@app.route('/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return {"errors": ["Missing required parameters"]}, 400

    authenticated, user = User.authenticate(email, password)
    print(authenticated)
    print(user)
    if authenticated:
        login_user(user)
        return {"current_user_id": current_user.id, 'current_user_first_name': current_user.first_name}

    return {"errors": ["Invalid email or password"]}, 401


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {"msg": "You have been logged out"}, 200
