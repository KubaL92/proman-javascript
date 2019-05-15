from data import queries
from pprint import pprint
from data import db_connection


def get_board_list():
    board_dict = queries.get_boards()
    return board_dict


def get_columns_with_tasks_by_board_id(board_id):
    return None


def test_db_conn():
    print(db_connection.test_connection_db())


if __name__ == '__main__':
    pprint(get_board_list())
