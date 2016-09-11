// Enemies our player must avoid.
function Enemy(x, y, speed) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position.
// Parameter: dt, a time delta between ticks.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 505) {
        this.x = -10;
    }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

//update() method for update of Player's location. 
Player.prototype.update = function(dt) {
    this.x * (dt);
    this.y * (dt);

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        alert("YOU WON!");
        document.location.reload();
    }

    if (this.y > 400) {
        this.y = 400;
    }
    //  Call for Collision method;
    this.checkCollisions();
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses.
Player.prototype.handleInput = function(key) {

    if (key === 'left') {
        this.x = this.x - 101;
    }
    if (key === 'up') {
        this.y = this.y - 101;
    }

    if (key === 'right') {
        this.x = this.x + 101;
    }

    if (key === 'down') {
        this.y = this.y + 101;
    }


};

//Handles collision b/w Enemies and Player.
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + 30 &&
            player.x + 30 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 30 &&
            player.y + 30 > allEnemies[i].y) {
            player.x = 200;
            player.y = 400;
            alert("collision");
        }
    }
};

//instantiate Player Class objects.
var player = new Player(200, 400);


// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-10, 55, 150);
var enemy2 = new Enemy(-10, 140, 250);
var enemy3 = new Enemy(-10, 225, 100);
var enemy4 = new Enemy(-10, 200, 300);
var enemy5 = new Enemy(-10, 150, 300);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// This listens for key presses and sends the keys to 
// player's handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});