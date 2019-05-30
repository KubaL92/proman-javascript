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
VALUES('Ask-Mate Project', 1);

INSERT INTO columns (title, boardID)
VALUES('NEW', 2);

INSERT INTO columns (title, boardID)
VALUES('TO DO', 2);

INSERT INTO columns (title, boardID)
VALUES('IN PROGRESS', 2);

INSERT INTO columns (title, boardID)
VALUES('DONE', 2);


INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 2, 'List questions', 'As a User, When I open the website, I''d like to see a list of questions, sorted by the latest question on top.Route:/list');

INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 2, 'Ask a question', 'As a User,
When I click on a "Ask a question" button/link,
I''d like to be able to fill in a form with my question and it''s details.
Then I''d like to be redirected to the "Display a question" page of this new question.
route:
/add-question');

INSERT INTO tasks (columnID, boardID, title, content)
VALUES(1, 2, 'Post an answer', 'There should be a page where I can post an answer to an existing question.' ||
 ' The answer must be at least 10 characters long. (/question/<question_id>/new-answer).' ||
 ' There should be a link at each question detail page that leads to this page.');

--second board
INSERT INTO boards (title, userID)
VALUES('API-WARS Project', 1);

INSERT INTO columns (title, boardID)
VALUES('NEW', 3);

INSERT INTO columns (title, boardID)
VALUES('TO DO', 3);

INSERT INTO columns (title, boardID)
VALUES('IN PROGRESS', 3);

INSERT INTO columns (title, boardID)
VALUES('DONE', 3);


INSERT INTO tasks (columnID, boardID, title, content)
VALUES(4, 3, 'NAVBAR', 'Lorem Ipsum');
