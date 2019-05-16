from data import db_connection
import psycopg2


@db_connection.connection_handler
def execute_select(cursor, statement, variables=None):
    """
    Execute SELECT statement optionally parameterized

    Example:
    > execute_select('SELECT %(title)s; FROM shows', variables={'title': 'Codecool'})

    :statement: SELECT statement

    :variables:  optional parameter dict"""
    result_set = []
    cursor.execute(statement, variables)
    result_set = cursor.fetchall()
    return result_set


@db_connection.connection_handler
def execute_dml_statement(cursor, statement, variables=None):
    """
    Execute data manipulation query statement (optionally parameterized)

    :statment: SQL statement

    :variables:  optional parameter dict"""
    result = None

    cursor.execute(statement, variables)
    try:
        result = cursor.fetchone()
    except psycopg2.ProgrammingError as pe:
        print(pe, 'error, suk dik')
    return result

@db_connection.connection_handler
def add_user(cursor, data: dict):
    try:
        cursor.execute("""
                INSERT INTO users
                (email, username, password)
                VALUES(%(email)s, %(username)s, %(password)s); """, data)
    except psycopg2.IntegrityError:
        return False

