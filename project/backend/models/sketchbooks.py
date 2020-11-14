# from . import db
# from . import utcnow
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin

# class SketchBook(db.Model):
#     __tablename__ = 'sketchbooks'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(
#         "users.id"), nullable=False)
#     title = db.Column(db.String)
#     cover_img = db.Column(db.String, nullable=True)
#     description = db.Column(db.String)
#     archived = db.Column(db.Boolean, nullable=True)

#     user = db.relationship("User")

#     def to_dict(self):
#         return {
#         'title': self.title,
#         'cover_img': self.cover_img,
#         'description': self.description
#         }


# class Board(db.Model):
#     __tablename__ = 'boards'

#     id = db.Column(db.Integer, primary_key=True)
#     sketchbook_id = db.Column(db.Integer, db.ForeignKey(
#         "sketchbooks.id"), nullable=False)
#     photo_url = db.Column(db.String, nullable=False)
#     title = db.Column(db.String)

#     sketchbook = db.relationship("Sketchbook")

#     def to_dict(self):
#         return {
#         'sketchbook_id': self.sketchbook_id,
#         'pdf': self.pdf
#         }
