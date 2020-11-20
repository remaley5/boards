from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User, Photo, SketchBook, Board, PhotoFolder
# from .sketchbooks import SketchBook, Board
