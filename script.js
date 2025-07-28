const COMPUTER_OPTIONS = 3;
const ROUNDS = 5;

const mapped_choices = { 
    0: "rock", 
    1: "paper", 
    2: "scissors"
};

let humanScore = 0, computerScore = 0;

function getComputerChoice(max = COMPUTER_OPTIONS) {
    const choice = Math.floor(Math.random() * max);
    
    return mapped_choices[choice];
}




function getHumanChoice() {
    let choice = "";
    
    do {
        let input = prompt("Enter your choice: ").toLowerCase();
        if (Object.values(mapped_choices).includes(input)) {
            choice = input;
        }
    } while (choice === "");

    return choice;
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "It's a tie!";
    }
    
    const combination = humanChoice + "-" + computerChoice;

    switch (combination) {
        case "rock-scissors":
        case "paper-rock":
        case "scissors-paper":
            humanScore++;
            return `You win! ${humanChoice} beats ${computerChoice}`;
        default: 
            computerScore++;
            return `You lose! ${computerChoice} beats ${humanChoice}`;
    }
}

function playGame() {
    for (let i = 0; i < ROUNDS; i++) {
        let humanChoice = getHumanChoice();
        let computerChoice = getComputerChoice();
        
        playRound(humanChoice, computerChoice);
    }
    if (humanScore > computerScore) {
        console.log("You won against the computer!");
    }

    else {
        console.log("You lost against the computer");
    }
}