from data import queries
from pprint import pprint
from data import db_connection




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

# def save_new_user_data(user_data):
#     hashed_pass = login.hash_password(user_data['password'])
#     user_data['password'] = hashed_pass
#     added = queries.add_user(user_data)
#     return added
#
# def user_login(user_data):
#     hashed_pass = data_manager.get_pass_by_email(user_data['email'])[0]['password']
#     authenticate = verify_password(user_data['password'], hashed_pass)
#
#     return authenticate  # True/False

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


def change_task_col(task_id, new_col):
    queries.change_task_column(task_id, new_col)


if __name__ == '__main__':
    pprint(get_columns_with_tasks_by_board_id(1))

