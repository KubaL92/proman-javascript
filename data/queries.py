from data import data_manager


def get_boards():
    return data_manager.execute_select('SELECT * FROM boards;')


def get_columns_to_board(board_id):
    return data_manager.execute_select("SELECT title FROM columns WHERE boardID=%(relatedBoard)s",
                                       {'relatedBoard': board_id})


def get_tasks_to_board_and_column(board_id):
    return data_manager.execute_select("SELECT taskID, columnID, title, content FROM tasks "
                                       "WHERE boardID=%(relatedBoard)s ",
                                       {'relatedBoard': board_id})


def get_pass_by_email(email):
    return data_manager.execute_select(" SELECT password FROM users WHERE "
                                       "email=%(email)s;",
                                       {'email': email})


def change_task_column(task_id, new_col):
    return data_manager.execute_dml_statement("UPDATE tasks "
                                            " SET columnid = %(new_column)s "
                                            " WHERE taskid=%(task_id)s;",
                                            {'task_id': task_id, 'new_column': new_col})
