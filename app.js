const gameInfo = document.querySelector('#info');
const gameType = document.querySelector('#gameType');
const reset = document.querySelector('#reset');
const main_div = document.querySelector('#main');

const player1 = {
    num: 1,
    name: document.querySelector('#player1'),
    score: document.querySelector('#score1'),
    addButton: document.querySelector('#p1Button')
};
const player2 = {
    num: 2,
    name: document.querySelector('#player2'),
    score: document.querySelector('#score2'),
    addButton: document.querySelector('#p2Button')
};

const players = [player1, player2];

gameInfo.addEventListener('submit', (e) => {
    e.preventDefault();
    for (let player of players){
        add_names(document.querySelector(`#p${player.num}Name`).value, player);
        player.score.innerText = gameType.value;
        player.addButton.disabled = false;
    }
    document.querySelector("#start").disabled = true;
});

reset.addEventListener('click', () => {
    gameInfo.reset();
    for (let player of players){
        player.score.innerText = 0;
        player.name.innerText = `Player ${player.num}`
        player.addButton.disabled = true;
    }
    document.querySelector("#start").disabled = false;
    remove_score_form();
    if (document.contains(document.querySelector("#winner"))) {
        document.querySelector("#winner").remove();
    }
});

player1.addButton.addEventListener('click', () => {
    remove_score_form();
    addScores(player1);
    player1.addButton.disabled = true;
    player2.addButton.disabled = false;

});

player2.addButton.addEventListener('click', () => {
    remove_score_form();
    addScores(player2);
    player2.addButton.disabled = true;
    player1.addButton.disabled = false;
});

main_div.addEventListener('submit', (e) => {
    e.preventDefault();
    const pointsForm = e.target.closest('#main > #score_row > #points');
    if (pointsForm) {
        const score = document.querySelector('#points > input');
        if (score.id === 'scoreNum1') {
            update_score(player1, score);
        }
        if (score.id === 'scoreNum2') {
            update_score(player2, score);
        }
        remove_score_form();
    }
});

function update_score(player, score) {
    let new_score = parseInt(player.score.innerText) - score.valueAsNumber;
    if (new_score > 1) {
        player.score.innerText = new_score;
    } else if (new_score === 0){
        player.score.innerText = new_score;
        const new_elem = document.createElement('h1');
        new_elem.setAttribute('id', 'animete');
        new_elem.classList.add('mt-5', 'text-center');
        new_elem.innerHTML = "<span id='winner' style='font-size: 3em; color: #343a40; text-shadow: 0px 0px 6px #ccff33, 0px 0px 6px #38b000'>"+player.name.innerText+" wins!</span>";
        document.querySelector('body').appendChild(new_elem);
        player1.addButton.disabled = true;
        player2.addButton.disabled = true;
    } else {
        alert('To much points!');
    }
}

function add_names(name, player) {
    if (name != '') {
        player.name.innerText = name;
    } else {
        player.name.innerText = `Player ${player.num}`
    }
}

function remove_score_form() {
    if (document.querySelector(`#score_row`)) {
        document.querySelector(`#score_row`).remove();
    }
}

function addScores(player) {
    const newRow = document.createElement("row");
    newRow.setAttribute("id", "score_row");
    newRow.setAttribute("class","p-2")
    newRow.innerHTML = "<form id='points'><span>" + player.name.innerText + " scores: </span><input class='form-control w-25 m-auto my-3' id='scoreNum" + player.num + "'type='number' required></input><button class='btn btn-secondary my-2'>Submit</button></form>";
    document.querySelector("#main").appendChild(newRow);
}

