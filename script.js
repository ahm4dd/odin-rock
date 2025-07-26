const COMPUTER_OPTIONS = 3;

const mapped_choices = { 
    0: "rock", 
    1: "paper", 
    2: "scissors"
};

function getComputerChoice(max = COMPUTER_OPTIONS) {
    const choice = Math.floor(Math.random() * max);
    
    return mapped_choices[choice];
}