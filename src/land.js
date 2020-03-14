class Land{
    
    static lands = {
        'wastes': new Land('Waste', {colorless:1}),
        'plains': new Land('Plains', {white:1}),
        'island': new Land('Island', {blue:1}),
        'swamp': new Land('Swamp', {black:1}),
        'mountain': new Land('Mountain', {red:1}),
        'forest': new Land('Forest', {green:1}),
        
        'ancientTomb': new Land('Ancient Tomb', {colorless:2}),

        'azoriusGuildgate': new Land('Azorius Guildgate', {white:0.5,blue:0.5}),
        'dimirGuildgate': new Land('Dimir Guildgate', {blue:0.5,black:0.5}),
        'rakdosGuildgate': new Land('Rakdos Guildgate', {black:0.5,red:0.5}),
        'gruulGuildgate': new Land('Gruul Guildgate', {red:0.5,green:0.5}),
        'selesnyaGuildgate': new Land('Selesnya Guildgate', {green:0.5,white:0.5}),
        'orzhovGuildgate': new Land('Orzhov Guildgate', {white:0.5,black:0.5}),
        'izzetGuildgate': new Land('Izzet Guildgate', {blue:0.5,red:0.5}),
        'golgariGuildgate': new Land('Golgari Guildgate', {black:0.5,green:0.5}),
        'borosGuildgate': new Land('Boros Guildgate', {red:0.5,white:0.5}),
        'simicGuildgate': new Land('Simic Guildgate', {green:0.5,blue:0.5})
    }

    constructor(name, mana){
        this._name = name;
        this._mana = mana;
    }

    get name(){
        return this._name;
    }
    get mana(){
        return this._mana;
    }

    render(){
        return `<tr><td>${this._name}</td></tr>`;
    }
}