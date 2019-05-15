DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS columns CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;


CREATE TABLE users (
    userID   SERIAL NOT NULL,
    email    VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY(userID)
);


CREATE TABLE boards (
    boardID   SERIAL NOT NULL,
    title     VARCHAR NOT NULL,
    userID    INTEGER,
    PRIMARY KEY(boardID),
    FOREIGN KEY(userID) REFERENCES users(userID)
);


CREATE TABLE columns (
    columnID  SERIAL NOT NULL,
    title     VARCHAR NOT NULL,
    boardID   INTEGER NOT NULL,
    PRIMARY KEY(columnID),
    FOREIGN KEY(boardID) REFERENCES boards(boardID)
);


CREATE TABLE tasks (
    taskID     SERIAL NOT NULL,
    columnID   INTEGER NOT NULL,
    boardID    INTEGER NOT NULL,
    title      VARCHAR NOT NULL,
    content    TEXT,
    PRIMARY KEY(taskID),
    FOREIGN KEY(columnID) REFERENCES columns(columnID),
    FOREIGN KEY(boardID) REFERENCES boards(boardID)
);

-- sample data

--first board
INSERT INTO users (email, username, password)
VALUES('pornman@gmail.com', 'PornMan', '12345678');

INSERT INTO boards (title, userID)
VALUES('TEST BOARD', 1);


INSERT INTO columns (title, boardID)
VALUES('NEW', 1);

INSERT INTO columns (title, boardID)
VALUES('TO DO', 1);

INSERT INTO columns (title, boardID)
VALUES('IN PROGRESS', 1);

INSERT INTO columns (title, boardID)
VALUES('DONE', 1);


INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 1, 'IMPROVISE', 'Lorem Ipsum');

INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 1, 'ADAPT', 'Lorem Ipsum');

INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 1, 'OVERCOME', 'Lorem Ipsum');

--second board
INSERT INTO boards (title, userID)
VALUES('TEST BOARD 2', 1);

INSERT INTO columns (title, boardID)
VALUES('NEW', 2);

INSERT INTO columns (title, boardID)
VALUES('TO DO', 2);

INSERT INTO columns (title, boardID)
VALUES('IN PROGRESS', 2);

INSERT INTO columns (title, boardID)
VALUES('DONE', 2);


INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 2, 'SSIJ', 'Lorem Ipsum');

INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 2, 'MI', 'Lorem Ipsum');

INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 2, 'PALE', 'Lorem Ipsum');
