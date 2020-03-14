class Creature{

    randomNames = ['Eldrazi Spawn', 'Soldier', 'Wizard', 'Zombie', 'Goblin', 'Elf'];
    
    constructor(power, toughness){
        var seed = Math.random();
        this._name = this.randomNames[Math.floor(seed * (this.randomNames.length))];;
        this._power = new Stat(0, power, power);
        this._toughness = new Stat(0, toughness, toughness);
    }

    get power(){
        return this._power;
    }
    get toughness(){
        return this._toughness;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }

    damage(amount){
        this.toughness.val -= amount;
    }
    
    render(){
        return `<tr><td><b>${this._name}</b>: <span>${this._power.val} / ${this._toughness.val}</span></td></tr>`;
    }

}