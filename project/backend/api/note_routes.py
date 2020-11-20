from flask import Blueprint, redirect, render_template, url_for, request, jsonify
import os
from backend.models import db, Board
from ..aws import upload_file_to_s3, change_name
note_routes = Blueprint('note_routes', __name__)

@note_routes.route("/<int:sketchbookId>", methods=['POST'])
def upload(sketchbookId):
    f = request.files['file']
    f.filename = change_name(f.filename)
    photo_url = upload_file_to_s3(f, 'sophie-boards-bucket')
    # D.
    if f:
        try:
            board = Board(
                sketchbook_id=sketchbookId, photo_url=photo_url, name='test_board')
            db.session.add(board)
            db.session.commit()

            return {'photo': board.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400


    else:
        print('something went wrong-----------------')
