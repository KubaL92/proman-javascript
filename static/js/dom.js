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
        //         <div class="board" id="board${board.boardid}">
        //             <h3>${board.title}</h3>
        //         </div>;
        let boardList = '';

        for(let board of boards){
            boardList += `
            <div class="card">
                <button class="btn btn-primary btn-dark" type="button" data-toggle="collapse" data-target="#board${board.boardid}" aria-expanded="false" aria-controls="collapseExample">
                    <div id="board-title">${board.title}<i class="fas fa-pen ml-1"></i></div>
                </button>
            </div>
            <div class="collapse" id="board${board.boardid}"><!--showCards() here--></div>
            <br>
            <br>`;
        }

        const outerHtml = `${boardList}`;

        this._appendToElement(document.querySelector('#boards'), outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // <div class="card card-body"></div>
    },
    // here comes more features
};
