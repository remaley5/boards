from backend.models import User, Photo, SketchBook, Board, PhotoFolder
from backend import app, db
from dotenv import load_dotenv

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(first_name='Ian', last_name='Smith', email='ian@aa.io',
               password='password')

    db.session.add(ian)

    sketchbook_one = SketchBook(user_id=1, title='chairs', color='#f9e1b8', description='inspiration and thought maps for chair designs')
    sketchbook_two = SketchBook(user_id=1, title='tester', color='#cadae8', description='open me up and add some boards!')

    db.session.add(sketchbook_one)
    db.session.add(sketchbook_two)

    folder_one = PhotoFolder(user_id=1, title='soft chair inspiration', color='#d1dee1', description='favorite soft chair designs')
    folder_two = PhotoFolder(user_id=1, title='Cherubs', color='#E2C1C1', description='soft flying babies')

    db.session.add(folder_one)
    db.session.add(folder_two)

    photo_one = Photo(folder_id=2, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339012020.png')
    photo_two = Photo(folder_id=2, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339202020.png')
    photo_three = Photo(folder_id=2, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/WedNov41339252020.png')

    db.session.add(photo_one)
    db.session.add(photo_two)
    db.session.add(photo_three)

    board_one = Board(sketchbook_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/MonNov160803002020.png', title='soft chair inspiration')
    board_two = Board(sketchbook_id=1, photo_url='https://sophie-boards-bucket.s3-us-west-2.amazonaws.com/MonNov160752542020.png', title='rigid chair inpsiration')

    db.session.add(board_one)
    db.session.add(board_two)

    db.session.commit()
