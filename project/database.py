from backend.models import User, Photo, SketchBook
from backend import app, db
from dotenv import load_dotenv

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(first_name='Ian', last_name='Smith', email='ian@aa.io',
               password='password')

    db.session.add(ian)

    photo_one = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339012020.png')
    photo_two = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339202020.png')
    photo_three = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339252020.png')

    db.session.add(photo_one)
    db.session.add(photo_two)
    db.session.add(photo_three)

    sketchbook_one = SketchBook(user_id=1, title='test book', cover_img='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339012020.png', description="this is my first sketchbook and I'm doing my best!" )
    sketchbook_two = SketchBook(user_id=1, title='Best book', description="I'm testing you!")

    db.session.add(sketchbook_one)
    db.session.add(sketchbook_two)

    db.session.commit()
