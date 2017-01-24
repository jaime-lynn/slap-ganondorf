var Target = function(name, health, slap, punch, kick){
    this.name = name;
    this.health = health;
    this.attacks = {
        slap: slap,
        punch: punch,
        kick: kick
    };
    this.items = [];
    this.addMods = function(){
        var mods = 1;
        for(var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            mods += item.modifier;
        }
        return mods;
    }
}

var hits = 0;

var Item = function(name, modifier, description) {
    this.name = name;
    this.modifier = modifier;
    this.description = description;
}

var targets = [];

targets.push(new Target('Link', 100, 1, 5, 10));
targets.push(new Target('Ganondorf', 100, 2, 5, 12));

var items = {
    shield:new Item('Shield', 0.3, 'This is an awesome shield!'),
    sword:new Item('Sword', 0.2, 'This is a pointy sword!'),
    bomb:new Item('Bomb', 0.6, 'If you hold it too long, it will explode and you might enter a speed run unintentionally!')
}

function playerAddItem(type) {
    targets[0].items.push(items[type])
    Materialize.toast(('You equipped a ' + type + '!'), 3000);
}

function onSlap() {
    targets[1].health -= targets[0].attacks.slap;
    hits++;
    updateHealth();
    Materialize.toast(('Target took ' + (targets[0].attacks.slap * targets[0].addMods()).toFixed(2) + ' points of damage!'), 3000);
    // for(var i = 0; i < targets.length; i++){
    //     target = targets[i];
    //     target.health -= (target.attacks.slap * target.addMods());
    //     target.hits += 1;
    //     updateHealth();
    //     Materialize.toast(('Target took ' + (target.attacks.slap * target.addMods()).toFixed(2) + ' points of damage!'), 3000);
    // }
    takeHit();
}

function onPunch() {
    targets[1].health -= targets[0].attacks.punch;
    hits++;
    updateHealth();
    Materialize.toast(('Target took ' + (targets[0].attacks.punch * targets[0].addMods()).toFixed(2) + ' points of damage!'), 3000);
    // for(var i = 0; i < targets.length; i++){
    //     target = targets[i];
    //     target.health -= target.attacks.punch * target.addMods();
    //     target.hits += 1;
    //     updateHealth();
    //     Materialize.toast(('Target took ' + (target.attacks.punch * target.addMods()).toFixed(2) + ' points of damage!'), 3000);
    // }
    takeHit();
}

function onKick() {
    targets[1].health -= targets[0].attacks.kick;
    hits++;
    updateHealth();
    Materialize.toast(('Target took ' + (targets[0].attacks.kick * targets[0].addMods()).toFixed(2) + ' points of damage!'), 3000);
    // for(var i = 0; i < targets.length; i++){
    //     target = targets[i];
    //     target.health -= target.attacks.kick * target.addMods();
    //     target.hits += 1;
    //     updateHealth();
    //     Materialize.toast(('Target took ' + (target.attacks.kick * target.addMods()).toFixed(2) + ' points of damage!'), 3000);
    // }
    takeHit();
}

function updateHealth() {
    for(var i = 0; i < targets.length; i++){
        var target = targets[i];
        if(target.health > 0) {
            document.getElementById('enemy-health').value = target.health;
        } else {
            document.getElementById('enemy-health').value = 0;
            document.getElementById('enemy-header').innerHTML = 'VICTORY';
        }
    }
    document.getElementById('hits').innerText = hits;
}

function reset() {
    for(var i = 0; i < targets.length; i++){
        var target = targets[i];
        target.health = 100;
        hits = 0;
        document.getElementById('enemy-header').innerHTML = '';
        document.getElementById('player-header').innerHTML = '';
    }
    updateHealth();
    Materialize.toast('Ready to fight again!', 2000);
}

function takeHit() {
    $('#ganondorf').css('filter', 'invert(100%)');
    $('#hit-sound')[0].play();
    setTimeout(function(){
            $('#ganondorf').delay('slow').css('filter', 'invert(0%)');
        }, 100);
}