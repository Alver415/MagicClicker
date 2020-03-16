

var spells = {
    'callToArms': function(){return new Spell('Call to Arms', { white: 2 }, function (target) {
        player.creatures.push(new Creature(1, 1));
        player.creatures.push(new Creature(1, 1));
    }, 'Summons two 1/1 creatures.')},

    'exile': function(){return new Spell('Exile', { colorless: 5 }, function (target) {
        target.toughness.val = 0;
        target.toughness.max = 0;
    }, 'Instantly kills the enemy.')},

    'heal': function(){return new Spell('Heal', { white: 2 }, function (target) {
        player.heal(5);
    }, 'Heals you for 5 health.')},

    'frogify': function(){return new Spell('Frogify', { blue: 3 }, function (target) {
        target.power.val = 0;
        target.toughness.val = 1;
        target.name = 'Frog';
    }, 'Turns the enemy into a 0/1 Frog creature.')},

    'drain': function(){return new Spell('Drain', { black: 4 }, function (target) {
        player.heal(3);
        target.damage(3);
    }, 'Drains the enemy for 3 life.')},

    'lightningBolt': function(){return new Spell('Lightning Bolt', { red: 1 }, function (target) {
        target.damage(3)
    }, 'Bolts the enemy for 3 damage.')},

    'rampantGrow': function(){return new Spell('Rampant Growth', { green: 2 }, function (target) {
        player.lands.push(randomFrom(Land.lands));
    }, 'Add a random land.')},

}