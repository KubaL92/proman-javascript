from data import queries
from pprint import pprint


def create_board_data_object():
    board_dict = queries.get_boards()
    all_boards = {}
    for board in range(1, len(board_dict) + 1):
        columns_dict = queries.get_columns_to_board(board)
        tasks_dict = queries.get_tasks_to_board_and_column(board)
        board_obj = {
            'boards': board_dict,
            'columns': columns_dict,
            'tasks': tasks_dict
        }
        all_boards[str(board)] = board_obj

    return all_boards


if __name__ == '__main__':
    pprint(create_board_data_object())
