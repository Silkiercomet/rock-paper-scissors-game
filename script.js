/* 

   

   

   una que cambie la interfaz 

   una que muestre el resultado



   una ultima que devuelva todo a su estado inicial
*/
let AiOptions = ["rock", "paper", "scissor"]

let beats = {
    rock: "scissor",
    paper: "rock",
    scissor: "paper"
}

// interfaces elements and states  
let pickAChoice = document.querySelector(".game__options"),
resultDisplay = document.querySelector(".game__result"),
playAgainBtn = document.querySelector(".result__button")

let UserOptions = document.querySelectorAll(".game__option")

const getUserChoice = (e) => e.target.textContent

const getAiChoice = () => AiOptions[Math.floor(Math.random() * 3)]

const addOrSubstrac = (points, num) => points + num 

const evaluateGame = (player) =>  {
    let ai = getAiChoice()
    console.log(`player choice:${player} vs ${ai}`)
    return player === ai ? "draw" : beats[player] === ai ? "player" : "ai"
}

// impure functions

const changeUiState = (from, to) => {
    from.classList.remove("active")
    to.classList.add("active")
}

const changeScoreCard = (result) => {
    changeUiState(pickAChoice, resultDisplay)
    let scoreDisplay = document.querySelector("#Points")
    let points = +document.querySelector("#Points").textContent
    switch (result) {
        case "player":
            scoreDisplay.textContent = addOrSubstrac(points, 1)
            break;
        case "ai":
            scoreDisplay.textContent = addOrSubstrac(points, -1)
            break;
    
        default:
            break;
    }
}

const compose = (...fns) => num => fns.reduce((composedAccu, f) => f(composedAccu), num)
const gameLogic = compose(getUserChoice,evaluateGame,changeScoreCard)


// changeUiState(resultDisplay, pickAChoice)

UserOptions.forEach(event =>  event.addEventListener("click", (e) => {
    gameLogic(e)
    
}))
playAgainBtn.addEventListener("click", () => changeUiState(resultDisplay, pickAChoice))
