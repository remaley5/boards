from . import db
from . import utcnow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_digest = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        raise AttributeError('Password not readable.')

    @password.setter
    def password(self, password):
        self.password_digest = generate_password_hash(password)

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter(User.email == email).scalar()
        if user is None:
            return False, user
        return check_password_hash(user.password_digest, password), user

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    photo_url = db.Column(db.String, nullable=False)

    user = db.relationship("User")

    def to_dict(self):
        return {
        'photo_url': self.photo_url,
        'user_id': self.user_id
        }

class SketchBook(db.Model):
    __tablename__ = 'sketchbooks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    title = db.Column(db.String)
    cover_img = db.Column(db.String, nullable=True)
    description = db.Column(db.String)
    archived = db.Column(db.Boolean, nullable=True)

    user = db.relationship("User")

    def to_dict(self):
        return {
        'id': self.id,
        'title': self.title,
        'color': self.cover_img,
        'description': self.description
        }


class Board(db.Model):
    __tablename__ = 'boards'

    id = db.Column(db.Integer, primary_key=True)
    sketchbook_id = db.Column(db.Integer, db.ForeignKey(
        "sketchbooks.id"), nullable=False)
    photo_url = db.Column(db.String, nullable=False)
    title = db.Column(db.String)

    sketchbook = db.relationship("SketchBook")

    def to_dict(self):
        return {
        'sketchbook_id': self.sketchbook_id,
        'photo_url': self.photo_url,
        'title': self.title
        }
