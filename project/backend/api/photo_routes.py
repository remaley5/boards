#import the model you need to add the photo url to
import os
from backend.models import Photo, Board, db, PhotoFolder
from flask import Blueprint, request, jsonify
from ..aws import upload_file_to_s3, change_name

photo_routes = Blueprint('photo_routes', __name__)

@photo_routes.route("/<int:folderId>", methods=['POST'])
def upload(folderId):
    print('FOLDER IDDDD', folderId)
    f = request.files['file']
    f.filename = change_name(f.filename)
    photo_url = upload_file_to_s3(f, 'sophie-boards-bucket')
    if f:
        try:
            photo = Photo(
                folder_id=folderId, photo_url=photo_url)
            db.session.add(photo)
            db.session.commit()

            return {'photo': photo.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400
    else:
        print('something went wrong-----------------')

@photo_routes.route("/sketchbook/<int:sketchBookId>", methods=['POST'])
def uploadBoard(sketchBookId):
    f = request.files['file']
    title = request.form['title']
    print('TITLE-----------------', title)
    f.filename = change_name(f.filename)
    photo_url = upload_file_to_s3(f, 'sophie-boards-bucket')
    if f:
        try:
            board = Board(
                sketchbook_id=sketchBookId, title=title, photo_url=photo_url)
            db.session.add(board)
            db.session.commit()

            return {'board': board.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400
    else:
        print('something went wrong-----------------')

@photo_routes.route("/<int:folderId>")
def get_photos(folderId):
    photos = Photo.query.filter(Photo.folder_id == folderId)
    photo_urls = [p.photo_url for p in photos]
    return jsonify(photo_urls)

@photo_routes.route("/folders/<int:currentUserId>")
def get_folders(currentUserId):
    print('in get_folders')
    response = PhotoFolder.query.filter(PhotoFolder.user_id == currentUserId).join(Photo)
    folders = [{'folder_info': folder.to_dict(), 'photos': [photo.to_dict() for photo in folder.photos]} for folder in response]
    # photos = [{folder.id: [photo.to_dict() for photo in folder.photos]} for folder in response]
    return jsonify({'folders': folders})
