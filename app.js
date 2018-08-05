var scores, roundScore, activePlayer, gamePlaying, lastDice, lastSecondDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){

        randomNumber();
        var dice = randomNumber();
        var secondDice = randomNumber();
        
        displayResult(dice, secondDice);
        
        if(conditionSix(dice, secondDice, lastDice, lastDice)){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if( dice !== 1 && secondDice !==1){
            roundScore += (dice + secondDice);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }else {
            nextPlayer();
        }

        lastDice = 6;
        lastSecondDice = 6;
    }
}); 
function randomNumber(){
    return Math.floor(Math.random() * 6) + 1;
}
function displayResult(dice, secondDice){
    var diceDOM = document.querySelector('.dice'); 
    var diceSecondDOM = document.querySelector('.second-dice'); 

    diceDOM.style.display = 'block';
    diceSecondDOM.style.display = 'block';


    diceDOM.src = 'images/dice-' + dice + '.png';
    diceSecondDOM.src = 'images/dice-' + secondDice + '.png';
}
function conditionSix(dice, secondDice, lastDice, lastDice){
    return dice === 6 && lastDice === 6 && secondDice === 6 && lastSecondDice === 6;
}


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        globalScore();

        //Getting value Max Score
        var input = document.querySelector('.final-score').value;
        var winningScore
        //Undefined, 0, null or " " are COERCED to false;
        // Anything else is COERCED to true
        if(input){
            winningScore = input;
        } else {
            alert('Please, set up a winning score!');
            init();
        }

        // Check if player won the game
        if(scores[activePlayer] >= winningScore && winningScore !== null){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        }   
        else {
            //Next Player
            nextPlayer(); 
        }
    }
});

function globalScore(){
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}

function nextPlayer(){
    //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //Remove "active" from player-0-panel ( toggle ) -> add or remove
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        // Hide dice again
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.second-dice').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // Making the dice disappear in the start
    document.querySelector('.second-dice').style.display = 'none';

    //getElementByID = faster than 'querySelector'. Just works for IDS
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Reseting Content
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); // Remove BUG

}



/***********************************
* NEW THINGS I'VE LEARNED

SELECTING CONTENT 

LISTENER ( pass information )
document.querySelector('#current-' + activePlayer).textContent = dice;
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';


GETTER ( get information )
var x = document.querySelector('#score-0').textContent;


REMOVE "active" FROM player-0-panel USING ( remove && add )
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.add('active');
*/