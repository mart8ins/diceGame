// vienā rindā definējams visus variable
let scores, roundScores, activePlayer, gamePlaying, previousScore, previousScore2, winningScore, scoreInput; //dice

init();

/****************
set winning score
*****************/

scoreInput = document.getElementById("settingScoreInput");
scoreInput.addEventListener("input", () => winningScore = scoreInput.value); // user can input hes prefered winning score target or there will be default 50

/****************
Event listener
*****************/

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {


        // random skaitlis no 1 līdz 6
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        console.log(dice2);

        // display the result for dice 1
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // display the result for dice 2
        let diceDOM2 = document.querySelector(".dice2");
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice2 + ".png";

        // update the round score IF rolled number was not a 1
        if (dice !== 1 && dice2 !== 1) {
            // add score
            roundScore += dice + dice2;
            if (dice == 6 && previousScore == 6 || dice2 == 6 && previousScore2 == 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            } else {
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }
        } else {
            // next player
            nextPlayer();
        }
        previousScore = dice;
        previousScore2 = dice2;
    }

});


// HOLD function in game
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore; // iekš array

        // update UI - user interface
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Won the game!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer(); // next player
        }
    }

});


// funkcija, kas pārslēgs spēlētājus, ja spēlētājs uzmet kauliņu 1 un, ja nospiež pogu HOLD
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousScore = 0;
    previousScore2 = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    //document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");

    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice2").style.display = "block";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    previousScore = 0;
    previousScore2 = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore = 20; // predifined winning score target



    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");

}

