const board =document.querySelector("#board");
const message= document.querySelector("#message");
const time = document.querySelector("#timer");
const startBtn = document.querySelector(".startGame");
const resetBtn = document.querySelector(".resetGame");

//game variable
//Tracks whose turn it is (either "1" or "2").
var currentPlayer = "X";

//a flag indicates if the game is still ongoing
let gameActive =false;

//Holds the interval for the countdown.
let timer;

//Stores the remaining time for the current turn.
let timeLeft=10;

let boardState= ["", "", "", "", "", "", "", "", "",];

//An array of possible winning combination for the game.
const winConditions = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//check if game is active.
function checkGameActive(){
    if(!gameActive){
        message.innerHTML = "Start the game please";
        message.innerHTML ="";
    }
}

//Start game
startBtn.addEventListener("click", ()=>{
boardState = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";
    gameActive = true;
    message.innerText= `Player ${currentPlayer}'s Turn`;
    createBoard();
    clearInterval(timer);
    time.innerText= "10";
    startTimer();
})

//createBoard Function: Generates the game board dynamically.
//clears the current board.
//Iterates over boardState to create cells.
//Each cell has click event listener that calls handleCellClick
function createBoard(){
     board.innerHTML ="";

     boardState.forEach((cell, index)=>{
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.innerText = cell;
        cellElement.addEventListener("click", ()=>{
        handleCellClick(index);
       }) 

       board.appendChild(cellElement);
     })

    
}

//handleCellCLick Function:
//Checks if the cell is already filled or if the game has ended.
//Updates the board state and creates a new board.
//Calls checkResult to see if the game has been won or drawn, and restarts the timer.
function handleCellClick(index){
    if(boardState[index] || !gameActive){
        return;
    }

    boardState[index] = currentPlayer;
    createBoard();
    checkResult();
}

//Checking results
//checkout function:
//Checks if the current player has won by iterating throuht the winng conditions.
//Updates the message if there's a win or a draw.
//Switches the player and Starts a new timr if the game continues.
function checkResult(){
    let roundWon = false;

    for(const condition of winConditions){
        const [a, b, c] = condition;

        if(boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]){
            roundWon = true;

            document.querySelectorAll(".cell")[a].classList.add("winning-cell");
            document.querySelectorAll(".cell")[b].classList.add("winning-cell");
            document.querySelectorAll(".cell")[c].classList.add("winning-cell");

            break;
        }
    }

    if(roundWon){
        message.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        clearInterval(timer);
        time.innerText = "10";
    }else if(!boardState.includes("")) {
        message.innerHTML = "It's a draw."
        gameActive =false;
        clearInterval(timer);
    } else {
        currentPlayer = currentPlayer === "X"? "O" : "X";
        message.innerHTML = `Player ${currentPlayer}'s turn`;
        startTimer();
    }
}

//timer
//startTimer function.
//Resets and starts the countdown timer.
//Updates the displayed time every second.
//Ends the game if the timer reaches zero.
function startTimer(){
    clearInterval(timer);
    timeLeft=10;
    time.innerText = timeLeft;

    timer=setInterval(()=>{
        timeLeft--;
        time.innerText = timeLeft;

        if(timeLeft <= 0){
            clearInterval(timer);
            message.innerText= `Player ${currentPlayer} ran out of time! switching player....`;
      

        //switch player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.innerText = `Player ${currentPlayer}'s Turn.`;
        startTimer();
    }
    },1000);
}

//reset Button
resetBtn.addEventListener("click", ()=>{
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.innerText = `Player ${currentPlayer}'s Turn`;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("winning-cell");
      });
    createBoard();
    clearInterval(timer);
    time.innerText = '10';
    startTimer();
})


checkGameActive();

