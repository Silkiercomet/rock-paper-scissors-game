let AiOptions = ["rock", "paper", "scissor"];

let beats = {
  rock: "scissor",
  paper: "rock",
  scissor: "paper",
};

let modalIsActive = false;

// interfaces elements and states
let pickAChoice = document.querySelector(".game__options"),
  resultDisplay = document.querySelector(".game__result"),
  playAgainBtn = document.querySelector(".result__button"),
  playerChoice = document.querySelector(".you"),
  aiChoice = document.querySelector(".house"),
  resultOfGame = document.querySelector(".winner"),
  rulesBtn = document.querySelector("#rules"),
  modalClose = document.querySelector("#close__rules"),
  modalElement = document.querySelector(".rules");

const hidratatedResultContainer = (player, ai, result) => {
  resultOfGame.textContent =
    result === "draw"
      ? result.toUpperCase()
      : result === "player"
      ? "YOU WIN"
      : "YOU LOSE";

  aiChoice.innerHTML = `<div class="game__options_circle ${ai}__circle_result"><button class="game__option" id="${ai}">${ai}</button></div>`;

  playerChoice.innerHTML = `<div class="game__options_circle ${player}__circle_result"><button class="game__option" id="${player}">${player}</button></div>`;
};

let UserOptions = document.querySelectorAll(".game__option");

const getUserChoice = (e) => e.target.textContent;

const getAiChoice = () => AiOptions[Math.floor(Math.random() * 3)];

const addOrSubstrac = (points, num) => points + num;

const evaluateGame = (player) => {
  let ai = getAiChoice();
  let result = player === ai ? "draw" : beats[player] === ai ? "player" : "ai";
  hidratatedResultContainer(player, ai, result);
  console.log(`player choice:${player} vs ${ai}`);
  return result;
};

// impure functions

const changeUiState = (from, to) => {
  from.classList.remove("active");
  to.classList.add("active");
};

const changeScoreCard = (result) => {
  changeUiState(pickAChoice, resultDisplay);
  let scoreDisplay = document.querySelector("#Points");
  let points = +document.querySelector("#Points").textContent;
  switch (result) {
    case "player":
      scoreDisplay.textContent = addOrSubstrac(points, 1);
      break;
    case "ai":
      scoreDisplay.textContent = addOrSubstrac(points, -1);
      break;

    default:
      break;
  }
};

const compose =
  (...fns) =>
  (num) =>
    fns.reduce((composedAccu, f) => f(composedAccu), num);
const gameLogic = compose(getUserChoice, evaluateGame, changeScoreCard);

// changeUiState(resultDisplay, pickAChoice)

UserOptions.forEach((event) =>
  event.addEventListener("click", (e) => {
    gameLogic(e);
  })
);
playAgainBtn.addEventListener("click", () =>
  changeUiState(resultDisplay, pickAChoice)
);

// modal
const toggleModal = () => {
  if (modalIsActive === false) {
    console.log("cheez2");
    modalElement.classList.add("show");
    modalIsActive = true;
  } else {
    console.log("cheez3");
    modalElement.classList.remove("show");
    modalIsActive = false;
  }
};

rulesBtn.addEventListener("click", () => {
  toggleModal();
});
modalClose.addEventListener("click", () => {
  toggleModal();
});
