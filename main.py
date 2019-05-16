from flask import Flask, render_template, url_for, jsonify
from util import json_response
import logic

app = Flask(__name__)


@app.route("/")
def index():
    logic.test_db_conn()
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():

    """
    All the boards
    """
    return logic.get_board_list()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return logic.get_columns_with_tasks_by_board_id(board_id)


if __name__ == '__main__':
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))
