from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User, Photo, SketchBook, Board
# from .sketchbooks import SketchBook, Board
