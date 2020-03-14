class Spell{
    static spells = {
        'exile': new Spell('Exile', {colorless:5}, function(target){    
            target.toughness.val = 0;
            target.toughness.max = 0;
        }, 'Instantly kills the enemy.'),

        'heal': new Spell('Heal', {white:2}, function(target){
            player.heal(5);
        },'Heals you for 5 health.'),

        'frogify': new Spell('Frogify', {blue:3}, function(target){
            target.power.val = 0; 
            target.toughness.val = 1;
            target.name = 'Frog';
        }, 'Turns the enemy into a 0/1 Frog creature.'),

        'drain': new Spell('Drain', {black: 4}, function(target){
            player.heal(3); 
            target.damage(3);
        }, 'Drains the enemy for 3 life.'),

        'lightningBolt': new Spell('Lightning Bolt', {red:1}, function(target){
            target.damage(3)
        }, 'Bolts the enemy for 3 damage.'),

        'rampantGrow': new Spell('Rampant Growth', {green:2}, function(target){
            player.lands.push(randomFrom(Land.lands));
        }, 'Add a random land.'),
    }

    constructor(name, manaCost, effect, hoverText){
        this._name = name;
        this._manaCost = manaCost;
        this._effect = effect;
        this._hoverText = hoverText;
    }

    get name(){
        return this._name;
    }
    get manaCost(){
        return this._manaCost;
    }
    get effect(){
        return this._effect;
    }
    get hoverText(){
        return this._hoverText;
    }

    render(){
        return `<tr><td><button class="tooltip" onmousedown=\"cast(\'${this._name}\')\">${this._name}<span class=\"tooltiptext\">${this._hoverText}</span></button></td></tr>`;
    }
}