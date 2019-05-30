import logic
def new_task(board_id: int):
    task_data = logic.add_new_task(board_id)
    return task_data
    print(task_data)

new_task(3)