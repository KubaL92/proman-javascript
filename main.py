from flask import Flask, render_template, jsonify, redirect, url_for, flash, request, session
from forms import RegistrationForm, LoginForm
from util import json_response
import logic
import users

app = Flask(__name__)

app.config['SECRET_KEY'] = 'dd7355cb749a3c15f82d84af2ee43f32'


@app.route("/")
def index():
    logic.test_db_conn()
    if 'username' in session:
        logged = session['username']
    else:
        logged = False

    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html', title='HOME', logged=logged)


@app.route('/logout')
def logout():
    flash(f'Logged out!', 'success')
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        if not users.save_new_user_data(form.data):  # if username is occupied flash danger message
            flash(f'Username {form.username.data} is already taken, try another!', 'danger')
        else:
            flash(f'Account created for {form.username.data}!', 'success')
            return redirect(url_for('index'))
    return render_template('register.html', form=form, title='register')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if users.user_login(form.data):  # check if user gave correct data
            flash(f'Logged In. Nice to see u again!', 'success')
            session['username'] = form.data['email']
            return redirect(url_for('index'))
        else:
            flash(f'Login Unsuccessful. Check your Username and Password!', 'danger')
    return render_template('login.html', form=form, title='login')


@app.route("/get-boards")
@json_response
def get_boards():

    """
    All the boards
    """
    return logic.get_board_list()


@app.route("/new-board", methods=['GET'])
@json_response
def new_board():
    logic.add_new_board()
    boards_data = logic.get_board_list()
    latest_board = boards_data[-1]
    logic.add_fixed_columns(latest_board['boardid'])
    return latest_board


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return logic.get_columns_with_tasks_by_board_id(board_id)


@app.route("/change-task-column/<int:task_id>/<int:new_col>")
@json_response
def change_task_column(task_id, new_col):
    logic.change_task_col(task_id, new_col)
    return "{'jazda': 'zkurwami'}"


if __name__ == '__main__':
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))
