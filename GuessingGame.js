function Game() {
    this.winningNumber = generateWinningNumber();
    this.playersGuess = null;
    this.pastGuesses = [];
}

function newGame() {
    return new Game();
}

Game.prototype.playersGuessSubmission = function(playersGuess) {
    if (playersGuess < 1 || playersGuess > 100 || isNaN(playersGuess)) {
        throw 'That is an invalid guess.';
    } else {
        this.playersGuess = playersGuess; 
        return this.checkGuess();
    }
}

Game.prototype.checkGuess = function() {
    if (this.playersGuess === this.winningNumber) {
        return 'You Win!';
    } else if (this.pastGuesses.length >= 4 && this.playersGuess !== this.winningNumber) {
        return 'You Lose.'
    } else if (this.pastGuesses.indexOf(this.playersGuess) >= 0) {
        return 'You have already guessed that number.'
    } else {
        this.pastGuesses.push(this.playersGuess);
    }

    if (this.difference() < 10) {
        return "You're burning up!";
    } else if (this.difference() < 25) {
        return "You're lukewarm.";
    } else if (this.difference() < 50) {
        return "You're a bit chilly.";
    } else if (this.difference() < 100) {
        return "You're ice cold!";
    }
}

Game.prototype.difference = function() {
    let difference = this.playersGuess - this.winningNumber;
    return Math.max(difference, difference * -1);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber
}

Game.prototype.provideHint = function() {
    return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

function generateWinningNumber() {
    return randomNumber = generateRandomNumber(100) + 1;
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let index = generateRandomNumber(i + 1);
        [ arr[i], arr[index] ] = [ arr[index], arr[i] ] 
    }
    return arr;
}

$(document).ready(function() {

    $('#submit').click(function(e) {
       console.log('Submit button has been clicked')
    })


})