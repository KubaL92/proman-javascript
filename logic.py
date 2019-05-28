from data import queries
from pprint import pprint
from data import db_connection
import login



def get_board_list():
    board_dict = queries.get_boards()
    return board_dict


def get_columns_with_tasks_by_board_id(board_id):
    columns = queries.get_columns_to_board(board_id)
    tasks = queries.get_tasks_to_board_and_column(board_id)
    # cards = {
    #     columns:
    # }
    return columns, tasks


def test_db_conn():
    print(db_connection.test_connection_db())

def save_new_user_data(user_data):
    hashed_pass = login.hash_password(user_data['password'])
    user_data['password'] = hashed_pass
    added = login.save_new_user_data(user_data)
    return added

def add_new_board():
    board_data = {
        'title': 'new board',
        'user_id': 1
    }
    return queries.add_board(board_data)

def add_fixed_columns(board_id):
    columns = [{'title':'NEW','board_id':board_id},
               {'title':'TO DO','board_id':board_id},
               {'title':'IN PROGRESS','board_id':board_id},
               {'title':'DONE','board_id':board_id}]
    for column in columns:
        queries.add_column(column)


if __name__ == '__main__':
    pprint(get_columns_with_tasks_by_board_id(1))

