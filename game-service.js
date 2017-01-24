function GameService(){
	var dataStore = this;

	function Target(name, health, slap, punch, kick){
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
			for(var i = 0; i < this.items.length; i++){
				var item = this.items[i];
				mods += item.modifier;
			}
			return mods;
		}
	};

	var player = new Target('Link', 100, 1, 5, 10);
	var enemy = new Target('Ganondorf', 100, 2, 5, 12);
    var turn = 0;

	function Item(name, modifier, description){
		this.name = name;
		this.modifier = modifier;
		this.description = description;
	};

	var items = {
		shield: new Item('Shield', 0.2, 'This is an awesome shield!'),
		sword: new Item('Sword', 0.3, 'This is a pointy sword!'),
		bomb: new Item('Bomb', 0.6, 'If you hold it too long, it will explode and you might enter a speed run unintentionally!')
	}

	this.playerAttack = function(type){
        var dmg = (player.attacks[type] * player.addMods()).toFixed(2);
		if(dmg && player.health > 0 && enemy.health > 0){
            enemy.health -= dmg;
            turn++;
            Materialize.toast(('Ganondorf took ' + dmg + ' points of damage!'), 1000);
		}
	}

    this.enemyAttack = function(){
        if(player.health > 0 && enemy.health > 0) {
            var num = Math.random();
            if(num < .5) {
                var dmg = (enemy.attacks['slap'] * enemy.addMods()).toFixed(2);
            } else if (num < .8) {
                var dmg = (enemy.attacks['punch'] * enemy.addMods()).toFixed(2);
            } else {
                var dmg = (enemy.attacks['kick'] * enemy.addMods()).toFixed(2);
            }
            player.health -= dmg;
            Materialize.toast(('You took ' + dmg + ' points of damage!'), 1000);
        }
    }

	this.playerAddItem = function(type){
        for(var i = 0; i < player.items.length; i++){
            item = player.items[i];
            if(items[type] == item) {
                return Materialize.toast(('You already equipped a ' + type + '!'), 1000);
            }
        }
		player.items.push(items[type]);
		Materialize.toast(('You equipped a ' + type + '!'), 1000);
	}

    this.enemyAddItem = function(type){
        for(var i = 0; i < enemy.items.length; i++){
            item = enemy.items[i];
            if(items[type] == item) {
                return Materialize.toast(('Ganondorf already equipped a ' + type + '!'), 1000);
            }
        }
        enemy.items.push(items[type]);
        Materialize.toast(('Ganondorf equipped a ' + type + '!'), 1000);
    }

    this.reset = function(){
        player.health = 100;
        player.items = [];
        enemy.health = 100;
        enemy.items = [];
        turn = 0;
    }

	this.getPlayer = function(){
        return Object.assign({}, player);
	}

	this.getEnemy = function(){
        return Object.assign({}, enemy);
	}

    this.getTurns = function(){
        return turn;
    }
};