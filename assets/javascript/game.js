// declare variables
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var compLetter;
var userGuess;
var guessed = "";

// generate a random letter (lowercase)
function random_character() {
    var chars = "abcdefghijklmnopqurstuvwxyz";
    return chars.substr( Math.floor(Math.random() * 26), 1);
}

// start game
// set compLetter
function startGame(){
    //reset guesses
    guessesLeft = 9;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;

    // set compLetter
    compLetter=random_character();
    console.log("computer letter is: "+compLetter);

    //reset guessed letters here
    guessed = "";
    document.getElementById("guessed").innerHTML = "";
}

    // give user a chance to guess
    document.onkeyup = function(event) {
        userGuess = event.key;

        // verify guess is a string/letter
        if (typeof userGuess === "string"){

            //reduce guessesLeft
            guessesLeft--;
            document.getElementById("guessesLeft").innerHTML = guessesLeft;
            console.log(guessesLeft,userGuess);

            // convert guess to lowercase
            userGuess.toLowerCase();

            // add letter to guessed letters
            guessed += userGuess+", ";
            document.getElementById("guessed").innerHTML = guessed;

            // if userGuess = compLetter, add 1 to wins, reset guessesLeft, reset guessed letters
            if(userGuess === compLetter){
                wins++;
                document.getElementById("wins").innerHTML = wins;
                alert("YOU WIN! My letter was " +compLetter);
                startGame();
            }
        }
        if (guessesLeft===0){
            console.log("you lose!");
            losses++;
            document.getElementById("losses").innerHTML = losses;
            alert("YOU LOSE! My letter was " +compLetter);
            startGame();
        } 
      };








