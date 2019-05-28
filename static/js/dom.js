// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
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
                        <div class="card-group" id="board${board.boardid}-content">//</div>
                </div>
                <br>
                <br>`);
            document.querySelector(`#board-wrap${board.boardid}`).addEventListener('click', function(){
                dom.loadCards(board.boardid);
            });
        }
    },
    loadCards: function (boardId) {
        //get cards from database and runs functions that shows board content-(cards)
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            console.log(cards);
            dom.showCards(boardId, cards);
            dom.showTasks(boardId, cards);
            dom.dragNdrop(boardId);
        });
    },
    showCards: function (boardID, cards) {
        const columns = cards[0];

        let boardContent = document.querySelector(`#board${boardID}-content`);
        boardContent.innerHTML = '';

        for (let columnID = 0; columnID < columns.length; columnID++){
            boardContent.insertAdjacentHTML('beforeend',`
            <div class="card">
                <div class="card-body">
                    <div class="card-header bg-dark text-white text-center">${columns[columnID].title}</div>
                    <div class="card border-0 column" id="column${columnID + 1}-board${boardID}" data-col-id="${columnID + 1}"></div>
                </div>
            </div>`);
        }
    },
    showTasks: function (boardID, cards){
        const tasks = cards[1];
        //inserting tasks into column by columnID
        for (let taskID = 0; taskID < tasks.length; taskID++){
            document.querySelector(`#column${tasks[taskID].columnid}-board${boardID}`).insertAdjacentHTML('beforeend', `
            <div class="card border-info text-center p-3 mt-2" data-task-id="${tasks[taskID].taskid}">
                <div class="card-header text-white bg-secondary">${tasks[taskID].title}</div>
                <p class="card-text">${tasks[taskID].content}</p>
                <button class="btn btn-sm btn-info">See details</button>
            </div>`);
        }
    },
    dragNdrop: function(boardID){

        const containers = [document.querySelector(`#column1-board${boardID}`),
                document.querySelector(`#column2-board${boardID}`),
                document.querySelector(`#column3-board${boardID}`),
                document.querySelector(`#column4-board${boardID}`)];

        let drake = dragula({ containers: containers });

        drake.on('dragend', function(el){
            console.log(el.parentNode.dataset.colId);
            dataHandler.changeTaskColumn(el);
        })
    },
    newBoard: function (board) {
        document.querySelector('#boards').insertAdjacentHTML('afterbegin',  `
        
                <div class="card" id="board-wrap${board.boardid}" data-id="${board.boardid}">
                    <button class="btn btn-primary btn-dark" type="button" data-toggle="collapse" data-target="#board${board.boardid}" aria-expanded="false" aria-controls="collapseExample">
                        <div id="board-title">${board.title}<i class="fas fa-pen ml-1"></i></div>
                    </button>
                </div>
                <div class="collapse" id="board${board.boardid}">
                        <div class="card-group" id="board${board.boardid}-content">//</div>
                </div>
                <br>
                <br>`);
        document.querySelector(`#board-wrap${board.boardid}`).addEventListener('click', function(){
            dom.loadCards(board.boardid);
        });
    }
    // here comes more features
};
