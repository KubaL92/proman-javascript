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
                        <div id="board-title">${board.title}<i class="fas fa-caret-down ml-1"></i></div>
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
        const columns = cards[0];
        const tasks = cards[1];

        let boardContent = document.querySelector(`#board${boardID}-content`);
        boardContent.innerHTML = '';

        for (let columnID = 0; columnID < columns.length; columnID++){
            boardContent.insertAdjacentHTML('beforeend',`
            <div class="card">
                <div class="card-body">
                    <div class="card-header bg-dark text-white text-center">${columns[columnID].title}</div>
                    <div class="card border-0 column" id="column${columnID + 1}-board${boardID}"></div>
                </div>
            </div>`);
        }
        this.showTasks(boardID, tasks); //calls function showTasks with tasks Array
    },
    showTasks: function (boardID, tasks){
        //inserting tasks into column by columnID
        for (let taskID = 0; taskID < tasks.length; taskID++){
            document.querySelector(`#column${tasks[taskID].columnid}-board${boardID}`).insertAdjacentHTML('beforeend', `
            <div class="card border-info text-center p-3 mt-2">
                <div class="card-header text-white bg-secondary">${tasks[taskID].title}</div>
                <p class="card-text">${tasks[taskID].content}</p>
                <button class="btn btn-sm btn-info">Edit task</button>
            </div>`);
        }
        this.dragNdrop(boardID)
    },
    dragNdrop: function(boardID){
        dragula(
            [document.querySelector(`#column1-board${boardID}`),
            document.querySelector(`#column2-board${boardID}`),
            document.querySelector(`#column3-board${boardID}`),
            document.querySelector(`#column4-board${boardID}`)]);
    }
    // here comes more features
};
