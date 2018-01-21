"use strict";
// This sectin contains some game constants. It is not super interesting
var GAME_WIDTH = 375;
var GAME_HEIGHT = 500;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 156;
var MAX_ENEMIES = 3;

var BONUS_WIDTH = 75;
var BONUS_HEIGHT = 75;
var MAX_BONUS = 1;
var BONUS_TIMER = 3000;
var BONUS_FLAG = false;
setInterval(() => BONUS_FLAG = true, BONUS_TIMER)
var BONUS_ORDER = Math.floor(Math.random() * 5 + 1)

var PLAYER_WIDTH = 75;
var PLAYER_HEIGHT = 54;

// These two constants keep us from using "magic numbers" in our code
var ENTER_KEY_CODE = 13;
var LEFT_ARROW_CODE = 37;
var UP_ARROW_CODE = 38;
var RIGHT_ARROW_CODE = 39;
var DOWN_ARROW_CODE = 40;

// These two constants allow us to DRY
var MOVE_LEFT = 'left';
var MOVE_RIGHT = 'right';
var MOVE_UP = 'up';
var MOVE_DOWN = 'down';

//variable for life count
var LIFE_COUNT = 3;
// collision detection
var COLLISION_DETECTION = true;

// Preload game images
var images = {};
['enemy.png', 'stars.png', 'player.png', 'heart.png', 'rainbowexplosion.png', 'tomato.png', 'patty.png', 'lettuce.png', 'cheese.png', 'buns.png'].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});





// This section is where you will be doing most of your coding
class Entity {
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
//TODO: create patty entity #9c7051
//TODO: create combo entities (buns, lettuce, cheese, tomato, patty)

class BonusBuns extends Entity {
    constructor(xPos) {
        super();
        this.x = xPos;
        this.y = -BONUS_HEIGHT;
        this.sprite = images['buns.png'];



        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
}
class BonusLettuce extends Entity {
    constructor(xPos) {
        super();
        this.x = xPos;
        this.y = -BONUS_HEIGHT;
        this.sprite = images['lettuce.png'];



        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
}
class BonusCheese extends Entity {
    constructor(xPos) {
        super();
        this.x = xPos;
        this.y = -BONUS_HEIGHT;
        this.sprite = images['cheese.png'];



        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
}
class BonusTomato extends Entity {
    constructor(xPos) {
        super();
        this.x = xPos;
        this.y = -BONUS_HEIGHT;
        this.sprite = images['tomato.png'];



        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
}
class BonusPatty extends Entity {
    constructor(xPos) {
        super();
        this.x = xPos;
        this.y = -BONUS_HEIGHT;
        this.sprite = images['patty.png'];



        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
}

class Enemy extends Entity {
    constructor(xPos) {
        super();
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite = images['enemy.png'];



        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.25;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

}


class Player extends Entity {
    constructor() {
        super();
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite = images['player.png'];
    }

    //TODO: create shootPatty method based on pattyCount
    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT && this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        } else if (direction === MOVE_RIGHT && this.x < GAME_WIDTH - PLAYER_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        } else if (direction === MOVE_DOWN && this.y < GAME_HEIGHT - (PLAYER_HEIGHT * 2)) {
            this.y = this.y + PLAYER_HEIGHT;
        } else if (direction === MOVE_UP && this.y > 0 + PLAYER_HEIGHT) {
            this.y = this.y - PLAYER_HEIGHT;
        }
    }

}





/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
    constructor(element) {
        // Setup the player
        this.player = new Player();

        // Setup enemies, making sure there are always three
        this.setupEnemies();
        this.setupBuns();
        this.setupLettuce();
        this.setupCheese();
        this.setupTomato();
        this.setupPatty();

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }

    /*
     The game allows for 5 horizontaenemySpotenemySpotl slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
    setupEnemies() {
        if (!this.enemies) {
            this.enemies = [];
        }

        while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
            this.addEnemy();
        }
    }

    setupBuns() {
        if (!this.buns) {
            this.buns = [];
        }

        while (this.buns.filter(e => !!e).length < MAX_BONUS) {
            this.addBuns();
        }
    }

    setupLettuce() {
        if (!this.lettuce) {
            this.lettuce = [];
        }

        while (this.lettuce.filter(e => !!e).length < MAX_BONUS) {
            this.addLettuce();
        }
    }
    setupCheese() {
        if (!this.cheese) {
            this.cheese = [];
        }

        while (this.cheese.filter(e => !!e).length < MAX_BONUS) {
            this.addCheese();
        }
    }
    setupTomato() {
        if (!this.tomato) {
            this.tomato = [];
        }

        while (this.tomato.filter(e => !!e).length < MAX_BONUS) {
            this.addTomato();
        }
    }
    setupPatty() {
        if (!this.patty) {
            this.patty = [];
        }

        while (this.patty.filter(e => !!e).length < MAX_BONUS) {
            this.addPatty();
        }
    }

    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {
        var enemySpots = GAME_WIDTH / ENEMY_WIDTH;

        var enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * enemySpots);
        }

        this.enemies[enemySpot] = new Enemy((enemySpot * ENEMY_WIDTH));
    }
    addBuns() {
        var bunsSpots = GAME_WIDTH / BONUS_WIDTH;

        var bunsSpot;
        // Keep looping until we find a free enemy spot at random
        if (this.buns || Math.floor(Date.now() / 200) % 7)
            while (this.buns[bunsSpot]) {
                bunsSpot = Math.floor(Math.random() * bunsSpots);
            }

        this.buns[bunsSpot] = new BonusBuns((bunsSpot * BONUS_WIDTH));
    }
    addLettuce() {
        var lettuceSpots = GAME_WIDTH / BONUS_WIDTH;

        var lettuceSpot;
        // Keep looping until we find a free enemy spot at random
        if (this.lettuce || Math.floor(Date.now() / 200) % 7)
            while (this.lettuce[lettuceSpot]) {
                lettuceSpot = Math.floor(Math.random() * lettuceSpots);
            }

        this.lettuce[lettuceSpot] = new BonusLettuce((lettuceSpot * BONUS_WIDTH));
    }
    addCheese() {
        var cheeseSpots = GAME_WIDTH / BONUS_WIDTH;

        var cheeseSpot;
        // Keep looping until we find a free enemy spot at random
        if (this.cheese || Math.floor(Date.now() / 200) % 7)
            while (this.cheese[cheeseSpot]) {
                cheeseSpot = Math.floor(Math.random() * cheeseSpots);
            }

        this.cheese[cheeseSpot] = new BonusCheese((cheeseSpot * BONUS_WIDTH));
    }
    addTomato() {
        var tomatoSpots = GAME_WIDTH / BONUS_WIDTH;

        var tomatoSpot;
        // Keep looping until we find a free enemy spot at random
        if (this.tomato || Math.floor(Date.now() / 200) % 7)
            while (this.tomato[tomatoSpot]) {
                tomatoSpot = Math.floor(Math.random() * tomatoSpots);
            }

        this.tomato[tomatoSpot] = new BonusTomato((tomatoSpot * BONUS_WIDTH));
    }
    addPatty() {
        var pattySpots = GAME_WIDTH / BONUS_WIDTH;

        var pattySpot;
        // Keep looping until we find a free enemy spot at random
        if (this.patty || Math.floor(Date.now() / 200) % 7)
            while (this.patty[pattySpot]) {
                pattySpot = Math.floor(Math.random() * pattySpots);
            }

        this.patty[pattySpot] = new BonusPatty((pattySpot * BONUS_WIDTH));
    }

    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();

        // Listen for keyboard left/right and update the player
        {
            document.addEventListener('keydown', e => {
                if (e.keyCode === LEFT_ARROW_CODE) {
                    this.player.move(MOVE_LEFT);
                } else if (e.keyCode === RIGHT_ARROW_CODE) {
                    this.player.move(MOVE_RIGHT);
                } else if (e.keyCode === UP_ARROW_CODE) {
                    this.player.move(MOVE_UP);
                } else if (e.keyCode === DOWN_ARROW_CODE) {
                    this.player.move(MOVE_DOWN);
                }
            });
        }

        this.gameLoop();
    }

    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill

    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
    gameLoop() {
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;
        // Increase the score!
        this.score += Math.floor((timeDiff / 15));

        // Call update on all enemies
        this.enemies.forEach(enemy => enemy.update(timeDiff));

        //updates on all bonuses

        if (BONUS_ORDER === 1 && BONUS_FLAG === true) {
            this.buns.forEach(bun => bun.update(timeDiff));
        }
        if (BONUS_ORDER === 2 && BONUS_FLAG === true) {
            this.lettuce.forEach(lettuce => lettuce.update(timeDiff));
        }
        if (BONUS_ORDER === 3 && BONUS_FLAG === true) {
            this.cheese.forEach(cheese => cheese.update(timeDiff));
        }
        if (BONUS_ORDER === 4 && BONUS_FLAG === true) {
            this.tomato.forEach(tomato => tomato.update(timeDiff));
        }
        if (BONUS_ORDER === 5 && BONUS_FLAG === true) {
            this.patty.forEach(patty => patty.update(timeDiff));
        }


        // Draw everything!
        //TODO: draw new player image bassed on patty entity count
        this.ctx.drawImage(images['stars.png'], 0, 0); // draw the star bg
        this.enemies.forEach(enemy => enemy.render(this.ctx));

        // bonuses

        this.buns.forEach(bun => bun.render(this.ctx));


        this.lettuce.forEach(lettuce => lettuce.render(this.ctx));


        this.cheese.forEach(cheese => cheese.render(this.ctx));


        this.tomato.forEach(tomato => tomato.render(this.ctx));


        this.patty.forEach(patty => patty.render(this.ctx));


        // draw the enemiesg
        var freq = 200
        if (COLLISION_DETECTION || Math.floor(Date.now() / freq) % 2) {
            this.player.render(this.ctx);
        }

        if (!(this.isPlayerDead())) {
            this.ctx.drawImage(images['heart.png'], 337, 3)
        }
        if (LIFE_COUNT >= 2) {
            this.ctx.drawImage(images['heart.png'], 298, 3)
        }
        if (LIFE_COUNT === 3) {
            this.ctx.drawImage(images['heart.png'], 258, 3)
        }



        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();
        // Check if bonuses should die

        this.buns.forEach((bun, bunIdx) => {
            if (bun.y > GAME_HEIGHT) {
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)

                delete this.buns[bunIdx];
                BONUS_FLAG = false;
                setTimeout(() => BONUS_FLAG === true, BONUS_TIMER)
            }
        });
        if (BONUS_FLAG === true && BONUS_ORDER === 1) {

            this.setupBuns();


        }

        this.lettuce.forEach((lettuce, lettuceIdx) => {
            if (lettuce.y > GAME_HEIGHT) {
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)

                delete this.lettuce[lettuceIdx];
                BONUS_FLAG = false;
                setTimeout(() => BONUS_FLAG === true, BONUS_TIMER)

            }
        });

        if (BONUS_FLAG === true && BONUS_ORDER === 2) {

            this.setupLettuce();


        }

        this.cheese.forEach((cheese, cheeseIdx) => {
            if (cheese.y > GAME_HEIGHT) {
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)

                delete this.cheese[cheeseIdx];
                BONUS_FLAG = false;
                setTimeout(() => BONUS_FLAG === true, BONUS_TIMER)

            }

        });

        if (BONUS_FLAG === true && BONUS_ORDER === 3) {

            this.setupCheese();


        }

        this.tomato.forEach((tomato, tomatoIdx) => {
            if (tomato.y > GAME_HEIGHT) {
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)

                delete this.tomato[tomatoIdx];
                BONUS_FLAG = false;
                setTimeout(() => BONUS_FLAG === true, BONUS_TIMER)


            }
        });

        if (BONUS_FLAG === true && BONUS_ORDER === 4) {

            this.setupTomato();


        }

        this.patty.forEach((patty, pattyIdx) => {
            if (patty.y > GAME_HEIGHT) {
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)

                delete this.patty[pattyIdx];
                BONUS_FLAG = false;
                setTimeout(() => BONUS_FLAG === true, BONUS_TIMER)

            }

        });

        if (BONUS_FLAG === true && BONUS_ORDER === 5) {

            this.setupPatty();


        }
        //collision detection for bonuses
        this.buns.forEach((bun, bunIdx) => {
            if (this.player.x < bun.x + BONUS_WIDTH &&
                this.player.x + PLAYER_WIDTH > bun.x &&
                this.player.y < bun.y + BONUS_HEIGHT &&
                PLAYER_HEIGHT + this.player.y > bun.y && COLLISION_DETECTION) {
                BONUS_FLAG = false;
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)
                this.score += 1000
                delete this.buns[bunIdx];
            }
        });
        this.lettuce.forEach((lettuce, lettuceIdx) => {
            if (this.player.x < lettuce.x + BONUS_WIDTH &&
                this.player.x + PLAYER_WIDTH > lettuce.x &&
                this.player.y < lettuce.y + BONUS_HEIGHT &&
                PLAYER_HEIGHT + this.player.y > lettuce.y && COLLISION_DETECTION) {
                BONUS_FLAG = false;
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)
                this.score += 1000
                delete this.lettuce[lettuceIdx];
            }
        });
        this.cheese.forEach((cheese, cheeseIdx) => {
            if (this.player.x < cheese.x + BONUS_WIDTH &&
                this.player.x + PLAYER_WIDTH > cheese.x &&
                this.player.y < cheese.y + BONUS_HEIGHT &&
                PLAYER_HEIGHT + this.player.y > cheese.y && COLLISION_DETECTION) {
                BONUS_FLAG = false;
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)
                this.score += 1000
                delete this.cheese[cheeseIdx];
            }
        });
        this.tomato.forEach((tomato, tomatoIdx) => {
            if (this.player.x < tomato.x + BONUS_WIDTH &&
                this.player.x + PLAYER_WIDTH > tomato.x &&
                this.player.y < tomato.y + BONUS_HEIGHT &&
                PLAYER_HEIGHT + this.player.y > tomato.y && COLLISION_DETECTION) {
                BONUS_FLAG = false;
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)
                this.score += 1000
                delete this.tomato[tomatoIdx];
            }
        });
        this.patty.forEach((patty, pattyIdx) => {
            if (this.player.x < patty.x + BONUS_WIDTH &&
                this.player.x + PLAYER_WIDTH > patty.x &&
                this.player.y < patty.y + BONUS_HEIGHT &&
                PLAYER_HEIGHT + this.player.y > patty.y && COLLISION_DETECTION) {
                BONUS_FLAG = false;
                BONUS_ORDER = Math.floor(Math.random() * 5 + 1)
                this.score += 1000
                delete this.patty[pattyIdx];
            }
        });




        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            if (this.isPlayerDead()) {
                this.ctx.drawImage(images['rainbowexplosion.png'], this.player.x, this.player.y)
            }
            this.ctx.font = 'bold 25px Impact';
            this.ctx.fillStyle = 'red';
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 2;
            this.ctx.fillText(this.score + ' GAME OVER', 5, 30);
            this.ctx.fillText("START OVER? PRESS ENTER", 40, 250)
            this.ctx.strokeText(this.score + ' GAME OVER', 5, 30);
            this.ctx.strokeText('START OVER? PRESS ENTER', 40, 250)
            //Once dead, option to start game
            document.addEventListener('keydown', e => {
                if (e.keyCode === ENTER_KEY_CODE && LIFE_COUNT === 0) {

                    function removeElement(elementId) {
                        // Removes an element from the document
                        var element = document.getElementById(elementId);
                        element.parentNode.removeChild(element);
                    }

                    function addElement() {
                        var div = document.createElement('div');
                        div.id = 'app';

                        document.body.appendChild(div);
                    };

                    //when dead, 
                    removeElement('app')
                    addElement();

                    LIFE_COUNT = 3;
                    COLLISION_DETECTION = true;
                    BONUS_FLAG = false;
                    var gameEngine = new Engine(document.getElementById('app'));
                    gameEngine.start();
                }
            });
        } else {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 25px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 4;
            this.ctx.strokeText(`SCORE : ${this.score}`, 5, 30);
            this.ctx.fillText(`SCORE : ${this.score}`, 5, 30);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }

    isPlayerDead() {
        this.enemies.filter(enemy => {
            if (this.player.x < enemy.x + (ENEMY_WIDTH / 2) &&
                this.player.x + (PLAYER_WIDTH / 2) > enemy.x &&
                this.player.y < enemy.y + (ENEMY_HEIGHT) &&
                (PLAYER_HEIGHT) + this.player.y > enemy.y + (ENEMY_HEIGHT / 1.5) && COLLISION_DETECTION) {

                COLLISION_DETECTION = false
                setTimeout(() => COLLISION_DETECTION = true, 2500)
                LIFE_COUNT--
                if (LIFE_COUNT !== 0) {
                    this.player = new Player();
                }
            }
        });

        return LIFE_COUNT === 0 ? true : false;
    }




}





// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();