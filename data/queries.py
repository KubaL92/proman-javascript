from data import data_manager


def get_boards():
    return data_manager.execute_select('SELECT * FROM boards;')


def get_columns_to_board(board_id):
    return data_manager.execute_select("SELECT title FROM columns WHERE boardID=%(relatedBoard)s",
                                       {'relatedBoard': board_id})


def get_tasks_to_board_and_column(board_id):
    return data_manager.execute_select("SELECT columnID, title, content, taskid FROM tasks WHERE "
                                       "boardID=%(relatedBoard)s",
                                       {'relatedBoard': board_id})


def get_pass_by_email(email):
    return data_manager.execute_select(" SELECT password FROM users WHERE "
                                       "email=%(email)s;",
                                       {'email': email})


def change_column_of_task(taskid, new_column):
    return data_manager.execute_dml_statement(" UPDATE tasks "
                                                "SET columnid=%(newCol)s"
                                                "WHERE taskid=%(taskID)s;",
                                                {'newCol': new_column, 'taskID': taskid})


