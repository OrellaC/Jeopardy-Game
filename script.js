//================== This is the JS for the Jeopardy game page ===== //

// This defines/declares the "game" ID that we called on on the index html page 
const game = document.getElementById('game')

// This defines/declares the "score" ID that we called on on the index html page -- This will track the score of the players 
const scoreDisplay = document.getElementById('score')
let score = 0

const fName = document.querySelector('#fname');

//// I want each player to have 30 seconds to answer as many questions as they can. After player one completes their 30 seconds, the screen should prompt player 2 to begin. After player 2 completes their 30 seconds, the screen should ask users whether or not they would like to continue the game or end the game by declaring a winner. The winner should be the player with the most points.

//Create both players 
// const playerOneName = document.querySelector('#playerOne');
// const playerOneScore = document.querySelector('#playerOne-score');
// const playerTwo = document.querySelector('#playerTwo');
// const playerOneName = document.querySelector('#playerTwo-score');

class playerOne{
    constructor(name, score){
        this.name = name;
        this.score = score;
    }
}
class playerTwo extends playerOne{
    constructor(name, score)
}

// How to switch between players 
function switchPlayers(){
    var 
}



//How to check for winner
function checkWinner(){
    let winner = ''
    if(playerOne.score > 600){
       prompt.innerText = `${playerOne.name} wins!`
    }else if(playerTwo.score > 600){
       prompt.innerText = `${playerTwo.name}wins!`
    }else if (playerOne.score === playerTwo.score)
       prompt.innerText = "It's a tie! Both players win!"
    } else { 
        // playerOne.score < 600 && playerTwo.score <600
        window.prompt = "Would you like to continue playing?", "Yes/No"

    }



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

//this is the levels array
const levels = ['easy', 'medium', 'hard']
function addGenre(genre) {
    // this is how you create an element within JS -- this creates the column on the jeopardy board
    const column = document.createElement('div')
    // This adds a class to the column just created -- this class holds the CSS for the columns
    column.classList.add('genre-column')
    column.innerHTML = genre.name
    //This adds the column just created to the game div on the html page 
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
        // Basically says that for each level in the "levels" array fetch the category and the level (easy, medium, or hard) in addition to each genre by it's id number
        fetch(`https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`)
            //After the question is fetched 
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // In relation to the format of the API -- setAttribute sets the value of the card/row. Data references the data within the API - ex. data-question callus upon the question within a specific category
                card.setAttribute('data-question', data.results[0].question)
                card.setAttribute('data-answer', data.results[0].correct_answer)
                card.setAttribute('data-value', card.getInnerHTML())
            })
            //Every time the card is clicked on, it will flip 
            .then(done => card.addEventListener('click', flipCard))

    })
}

//creates a column for each genre in th array. Allows each category to display the questions via the API
genres.forEach(genre => addGenre(genre))


function flipCard() {
    this.innerHTML = ''
    this.style.fontSize = '15px'
    //a button for each card - true/false buttons. Each question can be answered using true or false buttons
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

// This functions generates the score for each player 
function getResult(Player) {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    // Shows whether or not the user's selection is correct or incorrect -- the parent element is the card button

    const cardOfButton = this.parentElement

    // The if statement states that if the user's button/answer selection is the same as the API's answer, then they should get the value of that card. If not, they get 0 points

    if (cardOfButton.getAttribute('data-answer') === this.innerHTML) {


        // Generate score for player 1 
        // If correct, the player earns the value of the card/question according to API
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
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


const startingTime = 30
document.querySelector("#timer")

let playerTimer = 31

function countDown() {
if(startingTime === 0){
  clearTimeout()
} else{
    startingTime--
   timer.innerText = startingTime
   setTimeout(countDown, 1000)
}
}

countDown()






