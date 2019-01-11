"use strict";

var compMove = function() {
  var player2 = Math.floor(Math.random() * 3) + 1;
  var compChoose;

  if (player2 == 1) {
    compChoose = "ROCK";
  } else if (player2 == 2) {
    compChoose = "PAPER";
  } else {
    compChoose = "SCISSORS";
  }
  return compChoose;
};

var params = {
  player1Points: 0,
  player2Points: 0,
  rounds: 0,
  progress: []
};

var result = function(player1, player2) {
  if (player1 == player2) {
    return "Tie game!";
  } else if (
    (player1 == "ROCK" && player2 == "SCISSORS") ||
    (player1 == "PAPER" && player2 == "ROCK") ||
    (player1 == "SCISSORS" && player2 == "PAPER")
  ) {
    params.player1Points++;
    return "You get a point! :) :) :)";
  } else {
    params.player2Points++;
    return "A point for the opponent! :[";
  }
};

var playerMove = function(playerChoose) {
  if (
    params.rounds == "" ||
    params.rounds == null ||
    isNaN(params.rounds) ||
    params.rounds <= 0
  ) {
    window.alert("You did not give the right number of rounds :(");
  } else if (
    params.player1Points == params.rounds ||
    params.player2Points == params.rounds
  ) {
    window.alert("Game over, please press the new game button!");
  } else {
    var compChoose = compMove();

    displayResult(playerChoose, compChoose);
  }
};

// var rockBtn = document.getElementById('rock');
// rockBtn.addEventListener('click', function () {
//     playerMove('ROCK');
// });

// var paperBtn = document.getElementById('paper');
// paperBtn.addEventListener('click', function () {
//     playerMove('PAPER');
// });

// var scissorsBtn = document.getElementById('scissors');
// scissorsBtn.addEventListener('click', function () {
//     playerMove('SCISSORS');
// });

var playerMoveButtons = document.querySelectorAll(".player-move");
for (var i = 0; i < playerMoveButtons.length; i++) {
  playerMoveButtons[i].addEventListener("click", function(event) {
    var playerMoveType = this.getAttribute("data-move");
    playerMove(playerMoveType);
  });
}

var displayResult = function(playerChoose, compChoose) {
  var outputDiv = document.getElementById("output");

  var score = result(playerChoose, compChoose);

  params.progress.push({
    ruchGracza: playerChoose,
    ruchKomputera: compChoose,
    wynikRundy: score,
    wynikGry: params.player1Points + "-" + params.player2Points
  });  


  outputDiv.innerHTML =
    score +
    "<br>" +
    "You played " +
    playerChoose +
    " computer played " +
    compChoose +
    ".<br>";

  var scoreModalContent = document.querySelector("#modal-score .content");
  var outputCounter = document.getElementById("counter");
  outputCounter.innerHTML = params.player1Points + " : " + params.player2Points;

  if (params.player1Points == params.rounds) {
    outputDiv.innerHTML = "YOU WON THE ENTIRE GAME !!! :]";
    scoreModalContent.innerHTML = outputDiv.innerHTML;  

    // var progressTable = document.querySelector("#modal-score #progress-table");
    // for(var i=0; i< params.progress.length ; i++){
    //   var row = "<tr>";
    //   row += "<td>" + params.progress[i].ruchGracza + "</td>";
    //   row += "<td>" + params.progress[i].ruchKomputera + "</td>";
    //   row += "</tr>";
    //   function addRow(tableID) {
    //     // Get a reference to the table
    //     let tableRef = document.getElementById(tableID);
      
    //     // Insert a row at the end of the table
    //     let newRow = tableRef.insertRow(-1);
      
    //     // Insert a cell in the row at index 0
    //     let newCell = newRow.insertCell(0);
      
    //     // Append a text node to the cell
    //     let newText = document.createTextNode('New bottom row');
    //     newCell.appendChild(newText);
    //   }
      
    //   // Call addRow() with the table's ID
    //   addRow('my-table');
    //   // progressTable.appendChild(row);
    

    showModal("modal-score");

  } else if (params.player2Points == params.rounds) {
    outputDiv.innerHTML = "YOU LOST THE ENTIRE GAME !!! :'[";
    scoreModalContent.innerHTML = outputDiv.innerHTML;

    showModal("modal-score");
  }
};

var newGame = document.getElementById("newGame");

newGame.addEventListener("click", function() {
  params.rounds = window.prompt("How many won rounds will the game end??");
  if (
    params.rounds == "" ||
    params.rounds == null ||
    isNaN(params.rounds) ||
    params.rounds <= 0
  ) {
    window.alert("You did not give the right number of rounds :(");
  } else {
    params.player1Points = 0;
    params.player2Points = 0;
    var outputD = document.getElementById("output");
    var outputC = document.getElementById("counter");
    var info = document.getElementById("info");
    info.innerHTML =
      'Game has <strong class = "red"> ' +
      params.rounds +
      " </strong> rounds. ";
    outputD.innerHTML = "";
    outputC.innerHTML = "";
  }
});

/* MODALE */
function showModal(modalId) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.add("show");
  //1.Usuwało klasę show ze wszystkich modali,
  var modals = document.querySelectorAll(".modal");
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove("show");
  }

  document.querySelector("#" + modalId).classList.add("show");
}

// Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close".

function hideModal() {
  document.querySelector("#modal-overlay").classList.remove("show");
}

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

// Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay.

document.querySelector("#modal-overlay").addEventListener("click", hideModal);

// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go.

var modals = document.querySelectorAll(".modal");

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function(event) {
    event.stopPropagation();
  });
}
