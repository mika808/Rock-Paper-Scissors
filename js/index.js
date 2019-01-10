'use strict';

var compMove = function () {

    var player2 = Math.floor(Math.random() * 3) + 1;
    var compChoose;

    if (player2 == 1) {
        compChoose = 'ROCK';
    }
    else if (player2 == 2) {
        compChoose = 'PAPER';
    }
    else {
        compChoose = 'SCISSORS';
    }
    return compChoose;
};

var player1Points = 0;
var player2Points = 0;
var rounds = 0;

var result = function (player1, player2) {

    if (player1 == player2) {
        return 'Tie game!';
    }
    else if ((player1 == 'ROCK' && player2 == 'SCISSORS') ||
        (player1 == 'PAPER' && player2 == 'ROCK') ||
        (player1 == 'SCISSORS' && player2 == 'PAPER')) {
        player1Points++;
        return 'You get a point! :) :) :)';
    }
    else {
        player2Points++;
        return 'A point for the opponent! :[';
    }
};

var playerMove = function (playerChoose) {
    if (rounds == '' || rounds == null || isNaN(rounds) || rounds <= 0) {
        window.alert('You did not give the right number of rounds :(');
    }
    else if (player1Points == rounds || player2Points == rounds) {
        window.alert('Game over, please press the new game button!');
    }
    else {
        var compChoose = compMove();
        displayResult(playerChoose, compChoose);
    }
};


var rockBtn = document.getElementById('rock');
rockBtn.addEventListener('click', function () {
    playerMove('ROCK');
});

var paperBtn = document.getElementById('paper');
paperBtn.addEventListener('click', function () {
    playerMove('PAPER');
});

var scissorsBtn = document.getElementById('scissors');
scissorsBtn.addEventListener('click', function () {
    playerMove('SCISSORS');
});

var displayResult = function (playerChoose, compChoose) {
    var outputDiv = document.getElementById('output');

    var score = result(playerChoose, compChoose);

    outputDiv.innerHTML = score + '<br>' +
        'You played ' + playerChoose + ' computer played ' + compChoose + '.<br>';

    var outputCounter = document.getElementById('counter');
    outputCounter.innerHTML = player1Points + ' : ' + player2Points;
    if (player1Points == rounds) {
        outputDiv.innerHTML = "YOU WON THE ENTIRE GAME !!! :]";
    }
    else if (player2Points == rounds) {
        outputDiv.innerHTML = "YOU LOST THE ENTIRE GAME !!! :'[";
    }
};


var newGame = document.getElementById('newGame');

newGame.addEventListener('click', function () {
    rounds = window.prompt('How many won rounds will the game end??');
    if (rounds == '' || rounds == null || isNaN(rounds) || rounds <= 0) {
        window.alert('You did not give the right number of rounds :(');
    }
    else {
        player1Points = 0;
        player2Points = 0;
        var outputD = document.getElementById('output');
        var outputC = document.getElementById('counter');
        var info = document.getElementById('info');
        info.innerHTML = 'Game has <strong class = "red"> ' + rounds + ' </strong> rounds. ';
        outputD.innerHTML = "";
        outputC.innerHTML = "";
    }
});