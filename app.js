/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;
init();

// Two prop. || Call back Function - Event call it for us
// Anonymous Function - without a name in the 2nd prop.
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // 1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice'); 
        diceDOM.style.display = 'block'; // Dice appears
        diceDOM.src = 'dice-' + dice + '.png'; // Replace Image of the dice
        
        //4.reseting case it is two 6 in a row
        if(dice === 6 && lastDice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if( dice !== 1){ // 3. Update the roung score IF the rolled number was NOT a 1
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        }else {
            //Next Player
            nextPlayer();
        }
        
        lastDice = 6;
    }
}); 

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //Getting value Max Score
        var input = document.querySelector('.final-score').value;
        var winningScore
        //Undefined, 0, null or " " are COERCED to false;
        // Anything else is COERCED to true
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        }  else {
            //Next Player
            nextPlayer(); 
        }
    }
});

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
    
}

//NEW GAME
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none'; // Making the dice disappear in the start


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