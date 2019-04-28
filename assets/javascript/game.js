// declare variables
var wins = 0;
var losses = 0;
var guessesLeft = 12;
var country;
var userGuess;
var guessed = " ";
var countries = ["azerbaijan","bangladesh","belarus","ghana","lithuania","montenegro","morocco","mozambique","papua new guinea","togo"];
var cardsList=[];
var testConditions =[];
var allLetters = true;

// select random country
function random_country() {
    return countries[Math.floor(Math.random() * 10)];
}

// start game
// set compLetter
function startGame(){

    testConditions = [];
    document.getElementById("countryHolder").innerHTML = '';

    //reset guesses
    guessesLeft = 12;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;

    // set compLetter
    country=random_country();
    console.log("country is: "+country);

    //set flag image to country
    document.getElementById("flag").src="assets/images/" + country +".svg"

    //create empty div for each letter in string, apply bottom border class
    // if character is a space, do not apply bottom border
    for (var i=0; i< country.length; i++){
        //create a div for each character
        var outerCard = document.createElement("DIV");

        //if the character is a space...
        var currentChar = country.charAt(i).toUpperCase();

        if (currentChar === " "){

            //add class for blanks
            outerCard.classList.add("blank");
            document.getElementById("countryHolder").appendChild(outerCard);

        //otherwise...
        } else {

            //add outer card container class
            outerCard.classList.add("flip-card");

            //create inner card, style it and add as child of outer card
            var innerCard = document.createElement("DIV");
            innerCard.classList.add("flip-card-inner");
            outerCard.appendChild(innerCard);

            //create card front and attach as child to inner card
            var cardFront = document.createElement("DIV")
            cardFront.classList.add("flip-card-front");
            
            //create question mark logo
            var questionMk = document.createElement("P");
            questionMk.innerHTML = "?";
            questionMk.classList.add("letter");
            cardFront.appendChild(questionMk);

            innerCard.appendChild(cardFront);

            //create card back and inner paragraph
            var cardBack = document.createElement("DIV");
            cardBack.classList.add("flip-card-back");
            

            //create inner paragraph w/ letter
            var innerLetter = document.createElement("P");
            innerLetter.innerHTML=currentChar;
            innerLetter.classList.add("letter");
            cardBack.appendChild(innerLetter);
            
            //attach card back as child of innerCard
            innerCard.appendChild(cardBack);

            //add outer card, and children, to country holder
            document.getElementById("countryHolder").appendChild(outerCard); 

        }

    }
    
    //reset guessed letters here
    guessed = "";
    document.getElementById("guessed").innerHTML = "";

    //store cards cerated as array to access/compare letters to later    
    cardsList = document.getElementsByClassName("flip-card");
    for (i=0; i<cardsList.length; i++){
        testConditions.push(false);
    }
    
}

    // give user a chance to guess
    document.onkeyup = function(event) {
        userGuess = event.key;

        // verify guess is a string/letter
        if (typeof userGuess === "string"){

            // convert guess to upperCase
            var capsGuess = userGuess.toUpperCase();

            //compare letter to guessed letters
            if (guessed.indexOf(capsGuess)<0){
                // add letter to guessed letters
                guessed += capsGuess+", ";
                document.getElementById("guessed").innerHTML = guessed;

                //For each card..
                for(i=0;i<cardsList.length;i++){
                    // if capsGuess = a letter in the div, rotate card
                    if(capsGuess===cardsList[i].lastChild.textContent.slice(1)){
                        cardsList[i].firstChild.style.transform = "rotateY(180deg)";
                        testConditions[i]=true;
                        function checkLetters(letter) {
                            return letter;
                        }
                        function checkAll(){
                            if(testConditions.every(checkLetters)){
                                wins++;
                                document.getElementById("wins").innerHTML = wins;
                                alert("you WIN! You guessed " + country);
                                startGame();
                            }
                        }
                        cardsList[i].firstChild.addEventListener("transitionend", checkAll);

                    }
                }                
            }

        }

        if (guessesLeft===0){
            losses++;
            document.getElementById("losses").innerHTML = losses;
            alert("YOU LOSE! The country was " +country);
            startGame();
        } 

        //reduce guessesLeft
        guessesLeft--;
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        console.log(guessesLeft,userGuess);
      };








