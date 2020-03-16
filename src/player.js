class Player {
    constructor() {
        this._health = new Stat(0, 20, 20);
        this._maxHandSize = 7;
        this._mana = {
            colorless: 0,
            white: 0,
            blue: 0,
            black: 0,
            red: 0,
            green: 0
        };
        this._lands = [];
        this._creatures = [];
        this._artifacts = [];
        this._enchantments = [];
        this._spells = [];
    }

    get health() {
        return this._health;
    }
    get maxHandSize() {
        return this._maxHandSize;
    }
    get mana() {
        return this._mana;
    }
    get lands() {
        return this._lands;
    }
    get creatures() {
        return this._creatures;
    }
    get artifacts() {
        return this._artifacts;
    }
    get enchantments() {
        return this._enchantments;
    }
    get spells() {
        return this._spells;
    }

    heal(amount) {
        this.health.val += amount;
    }
    damage(amount) {
        this.health.val -= amount;
    }

    hasMana(manaCost) {
        for (var m in manaCost) {
            if (manaCost[m] > this.mana[m]) {
                return false;
            }
        }
        return true;
    }
    useMana(manaCost) {
        for (var m in manaCost) {
            this.mana[m] -= manaCost[m];
        }
    }
    addMana(mana) {
        for (var m in mana) {
            var amount = mana[m];
            for (var i = 0; i < amount; i++){
                var current = Math.floor(this._mana[m]);
                var factor = 1 / (current + 1);
                this._mana[m] += factor * factor;        
            }
        }
    }
    addRawMana(mana){
        for (var m in mana) {
            this.mana[m] += mana[m];
        }
    }
    generateMana() {
        for (var i in this.lands) {
            var land = this.lands[i];
            this.addMana(land.mana);
        }
    }
    drawSpell() {
        if (this.spells.length < this.maxHandSize) {
            var newSpell = randomFrom(spells)();
            this.spells.push(newSpell);
            this.renderSpell(newSpell);
            return true;
        } else{
            return false;
        }
    }
    renderSpell(spell) {
        var spellsTab = document.getElementById('playerSpells');
        spellsTab.append(spell);
    }
    cast(spell){
        if (this.hasMana(spell.manaCost)){
            this.useMana(spell.manaCost);
            this.removeSpell(spell);
            spell.effect(enemy);
            updateUI();
        }
    }
    removeSpell(spell){
        for (var s in this.spells){
            if (this.spells[s] === spell){
                this.spells.splice(s,1);
                spell.remove();
            }
        }
    }

    hasArtifact(artifact){
        for (var a in this.artifacts){
            if (this.artifacts[a].name == artifact.name){
                return true;
            }
        }
        return false;
    }
    renderLands() {
        var html = '';
        for (var i in this.lands) {
            var land = this.lands[i];
            html += land.render();
        }
        return html;
    }
    renderCreatures() {
        var html = '';
        for (var i in this.creatures) {
            var creature = this.creatures[i];
            html += creature.render();
        }
        return html;
    }
    renderArtifacts() {
        var html = '';
        for (var i in this.artifacts) {
            var artifact = this.artifacts[i];
            html += artifact.render();
        }
        return html;
    }
}