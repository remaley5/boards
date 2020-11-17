from flask import Blueprint, redirect, render_template, url_for, request
from backend.models import SketchBook, Board, db
sketchbook_routes = Blueprint('sketchbook_routes', __name__)
import json

@sketchbook_routes.route("/new/<int:userId>", methods=['POST'])
def createNewSketchbook(userId):
    data = json.loads(request.data)
    sketchbook = SketchBook(user_id=userId, title=data['title'], cover_img=data['color'], description=data['description'])
    db.session.add(sketchbook)
    db.session.commit()
    return sketchbook.to_dict()

@sketchbook_routes.route('/<int:userId>', methods=['GET'])
def getSketchbooks(userId):
    sketchbooks = SketchBook.query.filter(SketchBook.user_id==userId)
    sketchbooks = [sketchbook.to_dict() for sketchbook in sketchbooks]
    print(sketchbooks)
    return {'sketchbooks': sketchbooks}

@sketchbook_routes.route('/boards/<int:sketchbookId>', methods=['GET'])
def getBoards(sketchbookId):
    boards = Board.query.filter(Board.sketchbook_id==sketchbookId)
    boards = [board.to_dict() for board in boards]
    print(boards)
    return {'boards': boards}
