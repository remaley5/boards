from backend.models import User
from backend import app, db
from dotenv import load_dotenv

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(first_name='Ian', last_name='Smith', email='ian@aa.io',
               password='password')

    db.session.add(ian)

    one = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/TueNov31743522020.png')
    two = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/TueNov31745162020.png')
    three = Photo(user_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/TueNov32222192020.png')

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()
