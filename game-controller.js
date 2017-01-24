function GameController(){
	var dataStore = new GameService();

    this.updateHealth = function(){
        var enemyHealth = dataStore.getEnemy().health;
        var playerHealth = dataStore.getPlayer().health;
        if(enemyHealth > 0 && playerHealth > 0) {
            document.getElementById('enemy-health').value = enemyHealth;
            document.getElementById('player-health').value = playerHealth;
            document.getElementById('hits').innerText = dataStore.getTurns();
        } else if(enemyHealth <= 0 && playerHealth > 0) {
            document.getElementById('enemy-health').value = 0;
            document.getElementById('enemy-header').innerHTML = 'VICTORY';
        } else if(playerHealth <=0 && enemyHealth > 0) {
            document.getElementById('player-health').value = 0;
            document.getElementById('player-header').innerHTML = 'DEFEAT';
        }
    }

    this.takeHit = function(type) {
        if(dataStore.getEnemy().health > 0 && dataStore.getPlayer().health > 0) {
            $('#ganondorf').css('filter', 'invert(100%)');
            $('#hit-sound')[0].play();
            setTimeout(function(){
                    $('#ganondorf').delay('slow').css('filter', 'invert(0%)');
                }, 100);
            dataStore.playerAttack(type);
            dataStore.enemyAttack();
            this.updateHealth();
        }
    }

    this.playerAddItem = function(type) {
        dataStore.playerAddItem(type);
    }

    this.enemyAddItem = function(type) {
        dataStore.enemyAddItem(type);
    }

    this.reset = function() {
        dataStore.reset();
        document.getElementById('enemy-header').innerHTML = '';
        document.getElementById('player-header').innerHTML = '';
        this.updateHealth();
        Materialize.toast('Ready to fight again!', 1000);
    }
}