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
        $('#hint-button, #submit').prop("disabled", true);
        $('#main-title').text('You Win!');
        $('#sub-title').text('Hit the reset button to play again!');
        return 'You Win!';
    } else {
        if (this.pastGuesses.indexOf(this.playersGuess) >= 0) {
            $('#main-title').text('You have already guessed that number.');
            return 'You have already guessed that number.'
        } else {
            this.pastGuesses.push(this.playersGuess);
            $('#guesses li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);

            if (this.pastGuesses.length === 5 && this.playersGuess !== this.winningNumber) {
                $('#hint-button, #submit').prop("disabled", true);
                $('#main-title').text('You Lose.');
                $('#sub-title').text('Hit the reset button to play again!');
                return 'You Lose.'
            } else {        
                if (this.isLower()) {
                    $('#sub-title').text("Guess higher!")
                } else {
                    $('#sub-title').text("Guess lower!")
                }
            
                if (this.difference() < 10) {
                    $('#main-title').text("You're burning up!")
                    return "You're burning up!";
                } else if (this.difference() < 25) {
                    $('#main-title').text("You're lukewarm.")
                    return "You're lukewarm.";
                } else if (this.difference() < 50) {
                    $('#main-title').text("You're a bit chilly.")
                    return "You're a bit chilly.";
                } else if (this.difference() < 100) {
                    $('#main-title').text("You're ice cold!")
                    return "You're ice cold!";
                }
            }
        }
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

function makeAGuess(game) {
    let guess = $("#player-input").val();
    $("#player-input").val("")
    let output = game.playersGuessSubmission(Number(guess));
    $('#main-title').text(output);
}

$(document).ready(function() {
    let game = new Game();

    $('#submit').on('click', function() {
        makeAGuess(game);
    });

    $("#player-input").keypress(function(event) {
        if (event.which === 13) makeAGuess(game)
    });

    $('#reset-button').on('click', function() {
        game = new Game();
        $("#main-title").text("Play the Guessing Game!");
        $("#sub-title").text("Guess a number between 1 and 100...");
        $("#guesses li").text("-");
        $('#hint-button, #submit').prop("disabled", false);
    });

    $('#hint-button').on('click', function() {
        let hintArray = game.provideHint();
        $("#main-title").text(`The winning number is either ${hintArray[0]}, ${hintArray[1]}, or ${hintArray[2]}.`);
        $("#sub-title").text("Good luck!");
    });

})