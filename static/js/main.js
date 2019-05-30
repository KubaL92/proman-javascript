import { dom } from "./dom.js";
import {dataHandler} from "./data_handler.js";



// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
}



init();

let newBoardButton = document.querySelector("#new-board-button");
newBoardButton.addEventListener("click", function () {
    dataHandler.createNewBoard();
});


