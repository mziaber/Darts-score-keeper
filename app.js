const gameInfo = document.querySelector('#info');
const name1 = document.querySelector('#player1');
const name2 = document.querySelector('#player2');
const gameType = document.querySelector('#gameType');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const reset = document.querySelector('#reset');

const add1 = document.querySelector('#addPlayer1');
const add2 = document.querySelector('#addPlayer2')

gameInfo.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.querySelector('#player1Name').value;
    check(name, name1, 1);
    name = document.querySelector('#player2Name').value;
    check(name, name2, 2);
    score1.innerText = gameType.value;
    score2.innerText = gameType.value;
    document.querySelector("#start").disabled = true;
    add1.disabled = false;
    add2.disabled = false;

});

reset.addEventListener('click', () => {
    gameInfo.reset(); 
    score1.innerText = 0;
    score2.innerText = 0;
    name1.innerText = 'Player 1'
    name2.innerText = 'Player 2'
    document.querySelector("#start").disabled = false;
    remove_num(1);
    remove_num(2);
});

add1.addEventListener('click', () => {
    remove_num(2);
    addScores(1);
    add1.disabled = true;
    add2.disabled = false;
    
});

add2.addEventListener('click', () => {
    remove_num(1);
    addScores(2);
    add2.disabled = true;
    add1.disabled = false;
});

function remove_num(n){
    if (document.querySelector(`#score_row${n}`)){
        document.querySelector(`#score_row${n}`).remove();
    }
}

function addScores(n){
    newRow = document.createElement('row');
    newRow.setAttribute("id", `score_row${n}`);
    newRow.innerHTML = "<div class='col py-2' ><form><span>Player "+ n +" scores: </span><input class='form-control w-25 m-auto my-2' id='scoreNum" + n +"'type='number'></input><button class='btn btn-secondary' id='addScores'>Submit</button></form></div>";
    document.querySelector("#main").appendChild(newRow);
}


function check(name,playerName,n) {
    if (name != ''){
        playerName.innerText = name;
    } else {
        playerName.innerText = `Player ${n}`
    }
}