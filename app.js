const gameInfo = document.querySelector('#info');
const name1 = document.querySelector('#player1');
const name2 = document.querySelector('#player2');
const gameType = document.querySelector('#gameType');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const reset = document.querySelector('#reset');
const add1 = document.querySelector('#addPlayer1');
const add2 = document.querySelector('#addPlayer2');
const main_div = document.querySelector('#main');

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
    add1.disabled = true;
    add2.disabled = true;
    remove_num();
});

add1.addEventListener('click', () => {
    remove_num();
    addScores(name1.innerText, 1);
    add1.disabled = true;
    add2.disabled = false;

});


add2.addEventListener('click', () => {
    remove_num();
    addScores(name2.innerText, 2);
    add2.disabled = true;
    add1.disabled = false;
});

const formParent = document.querySelector('#main');
formParent.addEventListener('submit', (e) => {
    e.preventDefault();
    const pointsForm = e.target.closest('#main > #score_row > #points');
    if (pointsForm) {
        const scoreNum = document.querySelector('#points > input');
        if (scoreNum.id === 'scoreNum1') {
            let new_score = parseInt(score1.innerText);
            update_score(score1, scoreNum, new_score);
        }
        if (scoreNum.id === 'scoreNum2') {
            let new_score = parseInt(score2.innerText);
            update_score(score2, scoreNum, new_score);
        }
        remove_num();
    }
});

function remove_num() {
    if (document.querySelector(`#score_row`)) {
        document.querySelector(`#score_row`).remove();
    }
}

function addScores(name, n) {
    newRow = document.createElement('row');
    newRow.setAttribute("id", `score_row`);
    newRow.innerHTML = "<form id='points'><span>" + name + " scores: </span><input class='form-control w-25 m-auto my-2' id='scoreNum" + n + "'type='number'></input><button class='btn btn-secondary'>Submit</button></form>";
    document.querySelector("#main").appendChild(newRow);
}


function check(name, playerName, n) {
    if (name != '') {
        playerName.innerText = name;
    } else {
        playerName.innerText = `Player ${n}`
    }
}

function update_score(score, score_num, new_score) {
    new_score -= score_num.valueAsNumber;
    if (new_score > 0 && new_score != 1) {
        score.innerText = new_score;
    } else if (new_score === 0) {
        alert('End of game')
        document.querySelector("#reset").click()
    } else {
        alert('To much points!');

    }
}