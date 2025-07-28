const COMPUTER_OPTIONS = 3;
const MAX_SCORE = 3;
let isMatchGoing = true;

const mapped_choices = { 
    0: "Rock", 
    1: "Paper", 
    2: "Scissors"
};

let humanScore = 0, computerScore = 0;

const container = document.querySelector(".container");
const scoreboard = document.querySelector(".scoreboard");
const boardText = document.querySelector(".board-text");

const botScoreText = document.querySelector(".bot-score");
const humanScoreText = document.querySelector(".player-score");

const resetBtn = document.querySelector(".status");

scoreboard.addEventListener("score", (e) => {
    const computerChoice = getComputerChoice();
    
    const roundResult = playRound(e.detail.value, computerChoice);
    
    if (roundResult.win && !(roundResult.tie)) humanScoreText.textContent = `You: ${humanScore}`;
    else botScoreText.textContent = `Bot: ${computerScore}`;

    boardText.textContent = roundResult.message;
        
    if (humanScore >= MAX_SCORE || computerScore >= MAX_SCORE) {
        boardText.textContent = `The match has ended, ${humanScore >= MAX_SCORE ? "You won": "Bot won"}`;
        resetBtn.hidden = false;
        isMatchGoing = false;
    }
});


container.addEventListener("click", (e) => {
    const target = e.target;
    
    if (!isMatchGoing) {
        boardText.textContent = "The match has ended. Reset to play again!"
        return;
    }
    
    switch (target.id) {
        case "Rock":
        case "Paper":
        case "Scissors":
            const scoreEvent = new CustomEvent("score", {
                "detail": {
                    value: target.id
                },
            })
            scoreboard.dispatchEvent(scoreEvent);
            break;
    }
});

resetBtn.addEventListener("click", () => {
    humanScore = 0, computerScore = 0;
    resetBtn.hidden = true;
    
    botScoreText.textContent = "Bot: 0";
    humanScoreText.textContent = "You: 0";
    
    isMatchGoing = true;
    
    boardText.textContent = "Select any option to start";
});

function getComputerChoice(max = COMPUTER_OPTIONS) {
    const choice = Math.floor(Math.random() * max);
    
    return mapped_choices[choice];
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return {
            "win": false,
            "tie": false,
            "message": "It's a tie!"
        };
    }
    
    const combination = humanChoice + "-" + computerChoice;

    switch (combination) {
        case "Rock-Scissors":
        case "Paper-Rock":
        case "Scissors-Paper":
            humanScore++;
            return {
                "win": true,
                "tie": false,
                "message": `You win! ${humanChoice} beats ${computerChoice}`
            };
        default: 
            computerScore++;
            return {
                "win": false,
                "tie": false,
                "message": `You lose! ${computerChoice} beats ${humanChoice}`
        };
    }
}
