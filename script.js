let battleState = "playerTurn";
let enemyWaitTimer;
let enemyAttackType = "normal";
let enemyEnraged = false;
let justEnraged = false;

let normalAttackReady = true;
let attackCooldownInterval;
let attackCooldownRemaining = 0;

let skillReady = true;
let skillCooldownTimer;
let skillCooldownInterval;
let skillCooldownRemaining = 0;

let playerHP = 100;
const maxPlayerHP = 100;

let enemyHP = 100;
const maxEnemyHP = 100;
const damage = 10;


function attack() {
    if (!canPlayerAct() || !normalAttackReady || enemyHP <= 0 || playerHP <= 0) {
    return;
}

    normalAttackReady = false;
    battleState = "enemyWaiting";

    updateActionButtons();
    
const heroCharacter = document.querySelector(".hero-character");

heroCharacter.classList.remove("attacking", "skill-effect");
void heroCharacter.offsetWidth;

heroCharacter.classList.add("attacking");

    
attackCooldownRemaining = 1;

const attackButton = document.getElementById("attackButton");
attackButton.disabled = true;
attackButton.textContent = `Attack Cooldown: ${attackCooldownRemaining}s`;

clearInterval(attackCooldownInterval);

attackCooldownInterval = setInterval(() => {
    attackCooldownRemaining--;

    if (attackCooldownRemaining <= 0) {
        clearInterval(attackCooldownInterval);
        normalAttackReady = true;
        updateActionButtons();
        attackButton.textContent = "Attack";
    } else {
        attackButton.textContent =
            `Attack Cooldown: ${attackCooldownRemaining}s`;
    }
}, 1000);


    enemyHP = Math.max(0, enemyHP - damage);

    showEnemyHitEffect();

    document.getElementById("enemyHPText").textContent =
        `HP: ${enemyHP} / ${maxEnemyHP}`;

    document.querySelector(".enemy-health").style.width =
        `${enemyHP / maxEnemyHP * 100}%`;

    if (enemyHP === 0) {
        battleState = "gameOver";

        document.getElementById("battleMessage").textContent =
            "You Win!";
    } else {
        waitForEnemy();
    }

}


function enemyAttack() {
    if (
    battleState !== "enemyTurn" ||
    playerHP <= 0 ||
    enemyHP <= 0
) {
    return;
}

    if (enemyAttackType === "heavy") {
    document.getElementById("battleMessage").textContent =
        "Enemy uses Heavy Attack!";

        screenShake();
    } else {
        document.getElementById("battleMessage").textContent =
        "Enemy uses Normal Attack!";
}
    let damage = 10;

if (enemyAttackType === "heavy") {
    damage = 20;
}

playerHP = Math.max(0, playerHP - damage);

    document.getElementById("playerHPText").textContent =
        `HP: ${playerHP} / ${maxPlayerHP}`;
        const playerHealthBar = document.querySelector(".hero-health");

playerHealthBar.style.width =
    `${playerHP / maxPlayerHP * 100}%`;

if (playerHP <= 30) {
    playerHealthBar.style.backgroundColor = "#ef4444";
} else if (playerHP <= 60) {
    playerHealthBar.style.backgroundColor = "#facc15";
} else {
    playerHealthBar.style.backgroundColor = "#4ade80";
}

    if (playerHP === 0) {
    battleState = "gameOver";

    document.getElementById("battleMessage").textContent =
        "You Lose!";
} else {
    battleState = "playerTurn";
}
    
    updateActionButtons();

}

function restartGame() {
    battleState = "playerTurn";
    enemyEnraged = false;
    justEnraged = false;

    const enemyCharacter =
        document.querySelector(".enemy-character");
    enemyCharacter.classList.remove("enraged", "hit");
   
    clearTimeout(enemyWaitTimer);
    enemyWaitTimer = null;
const heroCharacter = document.querySelector(".hero-character");

heroCharacter.classList.remove("attacking", "skill-effect");
void heroCharacter.offsetWidth;
    
clearInterval(attackCooldownInterval);
attackCooldownRemaining = 0;
normalAttackReady = true;

const attackButton = document.getElementById("attackButton");
attackButton.disabled = false;
attackButton.textContent = "Attack";

    
clearTimeout(skillCooldownTimer);
clearInterval(skillCooldownInterval);
skillCooldownRemaining = 0;

const skillButton = document.getElementById("skillButton");
skillButton.disabled = false;
skillButton.textContent = "Special Skill";

    playerHP = maxPlayerHP;
    enemyHP = maxEnemyHP;
    
    normalAttackReady = true;
    clearTimeout(skillCooldownTimer);
    skillReady = true;


    document.getElementById("playerHPText").textContent =
        `HP: ${playerHP} / ${maxPlayerHP}`;

    document.getElementById("enemyHPText").textContent =
        `HP: ${enemyHP} / ${maxEnemyHP}`;

    document.querySelector(".hero-health").style.width = "100%";
    document.querySelector(".hero-health").style.backgroundColor = "#4ade80";

    document.querySelector(".enemy-health").style.width = "100%";

    document.getElementById("battleMessage").textContent = "";
    
    battleState = "playerTurn";
    updateActionButtons();  
}

function useSkill() {
    if (!canPlayerAct() || !skillReady || enemyHP <= 0 || playerHP <= 0) {
    return;
}

    skillReady = false;
    battleState = "enemyWaiting";
    
    updateActionButtons();
    
const heroCharacter = document.querySelector(".hero-character");

heroCharacter.classList.remove("attacking", "skill-effect");
void heroCharacter.offsetWidth;

heroCharacter.classList.add("skill-effect");

screenShake();

    
skillCooldownRemaining = 5;

const skillButton = document.getElementById("skillButton");
skillButton.disabled = true;
skillButton.textContent = `Skill Cooldown: ${skillCooldownRemaining}s`;

clearInterval(skillCooldownInterval);

skillCooldownInterval = setInterval(() => {
    skillCooldownRemaining--;

    if (skillCooldownRemaining <= 0) {
        clearInterval(skillCooldownInterval);
        skillReady = true;
        updateActionButtons();
        skillButton.textContent = "Special Skill";
    } else {
        skillButton.textContent =
            `Skill Cooldown: ${skillCooldownRemaining}s`;
    }
}, 1000);


    enemyHP = Math.max(0, enemyHP - 40);

    showEnemyHitEffect();

    document.getElementById("enemyHPText").textContent =
        `HP: ${enemyHP} / ${maxEnemyHP}`;

    document.querySelector(".enemy-health").style.width =
        `${enemyHP / maxEnemyHP * 100}%`;

    if (enemyHP === 0) {
        battleState = "gameOver";

        document.getElementById("battleMessage").textContent =
            "You Win!";
    } else {
        waitForEnemy();
    }

    clearTimeout(skillCooldownTimer);

    skillCooldownTimer = setTimeout(() => {
    skillReady = true;
    }, 5000);
}

function showEnemyHitEffect() {
    const enemyCharacter = document.querySelector(".enemy-character");

    enemyCharacter.classList.remove("hit");
    void enemyCharacter.offsetWidth;
    enemyCharacter.classList.add("hit");
}
function canPlayerAct() {
    return battleState === "playerTurn";
}
function waitForEnemy() {
        battleState = "enemyWaiting";
        chooseEnemyAttack();
            
        if (justEnraged) {
    document.getElementById("battleMessage").textContent =
        "Enemy has entered Enraged Mode!";
} else if (enemyEnraged) {
    document.getElementById("battleMessage").textContent =
        enemyAttackType === "heavy"
            ? "Enraged Enemy is preparing a heavy attack!"
            : "Enraged Enemy is preparing to attack...";
} else if (enemyAttackType === "heavy") {
    document.getElementById("battleMessage").textContent =
        "Enemy is preparing a heavy attack!";
} else {
    document.getElementById("battleMessage").textContent =
        "Enemy is preparing to attack...";
}

        enemyWaitTimer = setTimeout(() => {
    if (
        battleState !== "enemyWaiting" ||
        playerHP <= 0 ||
        enemyHP <= 0
    ) {
        return;
    }

    battleState = "enemyTurn";
    enemyAttack();
}, 1000);
}

function updateActionButtons() {
    const canAct = battleState === "playerTurn"
        && playerHP > 0
        && enemyHP > 0;

    document.getElementById("attackButton").disabled =
        !canAct || !normalAttackReady;

    document.getElementById("skillButton").disabled =
        !canAct || !skillReady;
}
function chooseEnemyAttack() {
    const randomNumber = Math.random();
    
    justEnraged = false;

if (enemyHP <= maxEnemyHP / 2 && !enemyEnraged) {
    enemyEnraged = true;
    justEnraged = true;

    const enemyCharacter =
        document.querySelector(".enemy-character");

    enemyCharacter.classList.add("enraged");
}
    
    let heavyAttackChance = 0.3;

    if (enemyHP <= maxEnemyHP / 2) {
        heavyAttackChance = 0.6;
    }

    if (randomNumber < 1 - heavyAttackChance) {
        enemyAttackType = "normal";
    } else {
        enemyAttackType = "heavy";
    }

    console.log("Enemy attack type:", enemyAttackType);
}

function screenShake() {
    document.body.classList.remove("screen-shake");
    void document.body.offsetWidth;
    document.body.classList.add("screen-shake");

    console.log("Screen Shake activated!");
}
