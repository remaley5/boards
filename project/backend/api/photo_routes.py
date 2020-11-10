#import the model you need to add the photo url to
import os
from backend.models import Photo, db
from flask import Blueprint, request, jsonify
from ..aws import upload_file_to_s3, change_name

photo_routes = Blueprint('photo_routes', __name__)

@photo_routes.route("/<int:userId>", methods=['POST'])
def upload(userId):
    f = request.files['file']
    f.filename = change_name(f.filename)
    photo_url = upload_file_to_s3(f, 'sophie-boards-bucket')
    """
        These attributes are also available

        file.filename               # The actual name of the file
        file.content_type
        file.content_length
        file.mimetype
    """
    # D.
    if f:
        try:
            photo = Photo(
                user_id=userId, photo_url=photo_url)
            db.session.add(photo)
            db.session.commit()

            return {'photo': photo.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400


    else:
        print('something went wrong-----------------')

@photo_routes.route("/<int:userId>")
def get_photos(userId):
    photos = Photo.query.filter(Photo.user_id == userId)
    photo_urls = [p.photo_url for p in photos]
    return jsonify(photo_urls)
