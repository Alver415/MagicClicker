class Artifact{
    
    static artifacts = {
        'solRing': new Artifact('Sol Ring', function(){ player.mana.colorless+=2; return true;}, 10, 'Ancient and powerful mana source.'),
        'howlingMine': new Artifact('Howling Mine', function(){ return player.drawSpell()}, 5, 'Draw an extra spell.'),
    }
    constructor(name, ability, cooldown, hoverText){
        this._name = name;
        this._ability = ability;
        this._cooldown = cooldown;
        this._hoverText = hoverText;
        this._lastTick = 0;
    }

    get name(){
        return this._name;
    }
    get ability(){
        return this._ability;
    }
    
    isReady(){
        return tick - this._lastTick >= this._cooldown;
    }
    activate(){
        if (this.isReady()){
            var success = this._ability();
            if (success){
                this._lastTick = tick;
            }
        }
    }

    render(){
        return `<tr><td><button class="tooltip" onmousedown=\"activate(\'${this._name}\')\" ${this.isReady() ? '' : 'disabled'}>${this._name}<span class=\"tooltiptext\">${this._hoverText}</span></button></td></tr>`;
    }
}