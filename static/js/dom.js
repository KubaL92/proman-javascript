// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            console.log(boards);
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        for(let board of boards){
            document.querySelector('#boards').insertAdjacentHTML('afterbegin',  `
            <div class="card" id="board-wrap${board.boardid}" data-id="${board.boardid}">
                <button class="btn btn-primary btn-dark" type="button" data-toggle="collapse" data-target="#board${board.boardid}" aria-expanded="false" aria-controls="collapseExample">
                    <div id="board-title">${board.title}<i class="fas fa-pen ml-1"></i></div>
                </button>
            </div>
            <div class="collapse" id="board${board.boardid}">
                    <div class="card-group" id="board${board.boardid}-content"></div>
            </div>
            <br>
            <br>`);
            document.querySelector(`#board-wrap${board.boardid}`).addEventListener('click', function(){
                dom.loadCards(board.boardid);
            });
        }
    },
    loadCards: function (boardId) {
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(boardId, cards);
        });


    },
    showCards: function (boardID, cards) {
        let columns = cards[0];
        let tasks = cards[1];
        console.log(columns, tasks);
        let boardContnet = document.querySelector(`#board${boardID}-content`);
        boardContnet.innerHTML = '';

        for(let column in columns){
            boardContnet.insertAdjacentHTML('afterbegin',`
            <div class="card">
                <div class="card-body">
                    <div class="card-title">${columns[column].title}</div>
                </div>
            </div>`);
        }

    },
    // here comes more features
};
