var version = 0,
devmode = true,
logging = false,
tick = 0,
difficulty = 1,
player = new Player();
enemy = new Creature(1,1),
mapping = {
    'enemyPowerCurrent' : function(){return enemy.power.val},
    'enemyPowerBase' : function(){return enemy.power.max},
    'enemyToughnessCurrent' : function(){return enemy.toughness.val},
    'enemyToughnessBase' : function(){return enemy.toughness.max},
    'enemyName' : function(){return enemy.name},
}

function reset(){
    if (devmode){
        return;
    }
    var playerName = prompt('What is your name?','');
    var playerTitle = prompt('What is your title?','');
    set('playerName', playerName);
    set('playerTitle', playerTitle);
    player = new Player();
    enemy = new Creature(1,1);
    player.drawSpell();
    player.drawSpell();
    player.drawSpell();
    
    tick = 0;
    difficulty = 1;
    updateUI();
}

function getMana(mana){
    player.addMana(mana);
    updateUI();
}
function attack(){
    enemy.toughness.val -= 1;
    if (enemy.toughness.val <= 0){
        enemyDied();
    }
    updateUI();
}

function activate(artifactName){
    var artifacts = player.artifacts;
    for (i in artifacts){
        var artifact = artifacts[i];
        if (artifact.name == artifactName){
            if (artifact.isReady()){
                artifact.activate();
                break;
            }
        }
    }
    updateUI();
}
function doTick(){
    tick++;
    playerTurn();
    enemyTurn();
    update();
}
function update(){
    log("update");
    updateUI();
    if (player.health.val <= 0){
        playerDied();
    } 
    if (enemy.toughness.val <= 0){
        enemyDied();
    }
}
function playerDied(){
    reset();
}

function enemyDied(){
    difficulty++;
    player.health.max++;
    player.health.val = player.health.max;
    if (randomChance(0.2)){
        player.lands.push(randomFrom(Land.lands));
    } 
    if (randomChance(0.2)){
        var artifact = randomFrom(Artifact.artifacts);
        if (!player.hasArtifact(artifact)){
            player.artifacts.push(artifact);
        }
    }

    var factor = difficulty / 3;
    var power = randomInt(factor, factor * 2);
    var toughness = randomInt(factor + 1, (factor + 1) * 2);
    enemy = new Creature(power, toughness);
}

function updateUI(){
    for (key in mapping){
        set(key, mapping[key]());
    }
    
    set('Lands', player.renderLands());
    set('Creatures', player.renderCreatures());
    set('Artifacts', player.renderArtifacts());

    document.querySelector('health-bar').update();

    for (var mana in player.mana){
        updateManaButton(mana);
    }

    document.querySelector('time-spinner').setProgress(tick % 10 * 10);
}

function updateManaButton(mana){
    var id = `#${mana}Mana`;
    var amount = player.mana[mana];
    var remainder = amount - Math.floor(amount);
    document.querySelector(id).setAmount(Math.floor(amount));
    document.querySelector(id).setProgress(remainder * 100);

}

function playerTurn(){
    player.generateMana();
    if (tick % 10 == 0){
        player.drawSpell();
    }
}
function enemyTurn(){
    enemy.lastAttack = tick;
    player.health.val -= enemy.power.val;
}


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

function randomChance(percent){
    return Math.random() < percent;
}
function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomFrom(object){
    var keys = Object.keys(object);
    return object[keys[randomInt(0, keys.length - 1)]];
}

function log(message){
    if (logging){
        console.log(message);
    }
}
function set(id, value){
	document.getElementById(id).innerHTML = value;
}
function get(id){
	return document.getElementById(id);
}
function rgb(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}
window.onload = reset;
window.setInterval(doTick, 1000);

