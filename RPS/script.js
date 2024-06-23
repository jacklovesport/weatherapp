
function getComputerChoice() {
    let randomInt = Math.floor(Math.random() * 3);

    let computerChoice = "Rock";
    if (randomInt === 1) {
      computerChoice = "Paper";
    } else if (randomInt === 2) {
      computerChoice = "Scissors";
    } 
    return computerChoice;
  } 
  
  function getHumanChoice() {
    let rightChoice = false;
    let humanChoice;
  
    while (!rightChoice) {
      humanChoice = prompt("What's your choice? Choose between Rock, Paper and Scissors. Out of 5 rounds.");
      let humanChoiceUpper = humanChoice.toUpperCase();
      if (humanChoiceUpper === "ROCK" || humanChoiceUpper === "PAPER" || humanChoiceUpper === "SCISSORS") {
        rightChoice = true;
      } 
      else { alert("Incorrect selection. Choose Your fighter!")};
    }
  
    humanChoice = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
  
    return humanChoice;
  }
  
  

  function playGame() {
  
    
    let humanScore = 0;
    let computerScore = 0;
  
   
    for (let round = 0; round < 5; round++) {
      const humanSelection = getHumanChoice();
      const computerSelection = getComputerChoice();
  
      playRound(humanSelection, computerSelection);
    }
    
    function playRound(humanChoice, computerChoice) {
        humanChoice = humanChoice.toLowerCase();
        computerChoice = computerChoice.toLowerCase(); 
      
        if (
          (humanChoice === "rock" && computerChoice === "scissors") || 
          (humanChoice === "paper" && computerChoice === "rock") ||
          (humanChoice === "scissors" && computerChoice === "paper")
        ) {
          humanScore++;
          alert(`You win! ${humanChoice} beats ${computerChoice}`);
        } else if (humanChoice === computerChoice) {
          alert("It's a tie!");
        } else {
          computerScore++;
          alert(`You lose! ${computerChoice} beats ${humanChoice}`);
        }
      }
    

    if (humanScore > computerScore) {
      alert(`You win! Your score: ${humanScore}. Computer score: ${computerScore}`);
    } else if (humanScore === computerScore) {
      alert(`It's a tie! Your score: ${humanScore}. Computer score: ${computerScore}`);
    } else {
      alert(`You lose! Your score: ${humanScore}. Computer score: ${computerScore}`);
    }
  }
  
  playGame();

