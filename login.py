from data import data_manager
from data import queries
import bcrypt

def save_new_user_data(user_data):
    hashed_pass = hash_password(user_data['password'])
    user_data['password'] = hashed_pass
    data_manager.add_user(user_data)


def user_login(user_data):
    hashed_pass = data_manager.get_pass_by_email(user_data['email'])[0]['password']
    authenticate = verify_password(user_data['password'], hashed_pass)

    return authenticate  # True/False


def hash_password(plain_text_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    if bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password):
        boolean = True
    else:
        boolean = False
    return boolean