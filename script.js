//================== This is the JS for the Jeopardy game page (game.html) ===== //
//// I want each player to have 30 seconds to answer as many questions as they can. After player one completes their 30 seconds, the screen should prompt player 2 to begin. After player 2 completes their 30 seconds, the screen should ask users whether or not they would like to continue the game or end the game by declaring a winner. The winner should be the player with the most points.


//I followed this tutorial (https://www.youtube.com/watch?v=zgHim4ZDpZY) to create my game and also made changes of my own (The tutorial is one player. I manipulated my project to make it two player, track the score of each player, add a win/lose state and created a timer)


// This defines/declares the "game" ID and the timer that we called on the game.html page 
const game = document.getElementById('game')
let startingTime = 0;
let iterations = 0;

// This defines/declares the score, names of play one and two, and allows players to be switched by using a boolean statement
let playerOneName = ''
let playerTwoName = ''
let playerOneScore = 0
let playerTwoScore = 0
let score = 0
let playOneTurn = true;
const fName = document.querySelector('#fname');



// Each ID number corresponds with the category via the API  -- this creates the questions in under each category as an array
const genres = [
    {
        name: 'Books',
        id: 10
    },
    {
        name: 'Film',
        id: 11
    },
    {
        name: 'Music',
        id: 12
    },
    {
        name: 'Video Games',
        id: 15
    },
    {
        name: 'Celebrities',
        id: 26
    },
    {
        name: 'Cartoons',
        id: 32
    }
]

//The levels array - based on the difficulty of each question asked 
const levels = ['easy', 'medium', 'hard']


function addGenre(genre) {
    // this is how you create an element within JS -- this creates the column on the jeopardy board
    const column = document.createElement('div')
    // This adds a class to the column just created -- this class holds the CSS for the columns
    column.classList.add('genre-column')
    column.innerHTML = genre.name
    //This adds the column just created to the game div on the game.html page 
    game.append(column)


    levels.forEach(level => {
        // This creates the rows of the board 
        const card = document.createElement('div')
        card.classList.add('card')
        // this puts the rows aka "card" within the columns
        column.append(card)
        // This if statement indicates the level of the question and its value 
        if (level === 'easy') {
            card.innerHTML = 100

        }
        if (level === 'medium') {
            card.innerHTML = 200
        }
        if (level === 'hard') {
            card.innerHTML = 300
        }
        // For each level in the "levels" array fetch the category and the level (easy, medium, or hard) in addition to each genre by it's id number by using a template literal

        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            //After the question is fetched (https://www.w3schools.com/js/js_promise.asp)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // In relation to the format of the API -- setAttribute sets the value of the card/row. Data references the data within the API - ex. data-question calls upon the question within a specific category
                card.setAttribute('data-question', data.results[0].question)
                card.setAttribute('data-answer', data.results[0].correct_answer)
                card.setAttribute('data-value', card.getInnerHTML())
            })
            //Every time the card is clicked on, it will flip 
            .then(done => card.addEventListener('click', flipCard))

    })
}
//Occurs after timer ends - once time ends the continue and play again button become visible 
function gameStart(){
    startingTime = 30;
    if (iterations < 2){
        countDown();
    }else {
        winner();
        document.getElementById("continueBtn").style.visibility = 'visible';
        document.getElementById("playAgainBtn").style.visibility = 'visible';

    }
//Creates a column for each genre in the array. Allows each category to display the questions via the API
    genres.forEach(genre => addGenre(genre))
}

function flipCard() {
    this.innerHTML = ''
    this.style.fontSize = '20px'
    //A button for each card - true/false buttons. Each question can be answered using true or false buttons
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')
    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'
    trueButton.classList.add('true-button')
    falseButton.classList.add('false-button')
    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)

    //Removing the event listener forces the player to answer the question before moving on to another question -- this prevents players from cheating
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

// Generates the score for each player 
function getResult(Player) {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    // Shows whether or not the user's selection is correct or incorrect -- the parent element is the card button

    const cardOfButton = this.parentElement

    // If the user's button/answer selection is the same as the API's answer, then the player should get the value of that card. If not, they get 0 points

    if (cardOfButton.getAttribute('data-answer') === this.innerHTML) {


        // Generate score for player 1 
        // If correct, the player earns the value of the card/question according to API
        score =  parseInt(cardOfButton.getAttribute('data-value'))
        if (playOneTurn){
            playerOneScore += score;
            document.getElementById("namePlayerOne").innerHTML = playerOneName+" "+playerOneScore
        }else {
            playerTwoScore += score;
            document.getElementById("namePlayerTwo").innerHTML = playerTwoName+" "+playerTwoScore

        }

        cardOfButton.classList.add('correct-answer')

        // This while loop removes the options from the questions after the answer is selected - otherwise players can cheat by repeatedly pressing button
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipCard)
}

// Timer function
let timer = document.querySelector("#timer")


function countDown() {

    if(startingTime === 0){
        iterations ++;
        clearTimeout()
        playOneTurn=false
        gameStart();

    } else{
        startingTime--
       timer.innerText =" "+startingTime
        setTimeout(countDown, 1000)
    }
    console.log(iterations)

}

//Submit button function - game will not run if players do not submit a name 

function onSubmitBtn() {
     playerOneName = document.getElementById('pOneNameInput').value;
     playerTwoName = document.getElementById('pTwoNameInput').value;
    if (playerOneName!== "" && playerTwoName !== "") {
        document.getElementById("namePlayerOne").innerHTML = playerOneName;
        document.getElementById("namePlayerTwo").innerHTML = playerTwoName;
        document.getElementById('inputInfo').style.visibility = 'hidden';
        gameStart()
    }

}

//Continue button function - allows players to continue playing the game after first round has completed 
function onContinueBtn(){
    playOneTurn =true;
    iterations = 0;
    gameStart();
    document.getElementById('continueBtn').style.visibility = 'hidden';
    document.getElementById('playAgainBtn').style.visibility = 'hidden';

}

//Winner function - shows which player has the most points after first round - also declares winner
function winner(){
    let text = "lost this round"
    let winnerText = document.getElementById("winner");
if (playerOneScore === playerTwoScore) winnerText.innerHTML = "Draw";
if(playerOneScore > playerTwoScore){
    winnerText.innerHTML = `${playerOneName} ${text}`
}
  winnerText.innerHTML = `${playerTwoName} ${text}`
}







