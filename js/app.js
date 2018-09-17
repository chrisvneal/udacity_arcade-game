// Place positions in variables
const blockWidth = 101;
const blockHeight = 83;
const blockMiddle = blockHeight / 2;
const canvasBoundary = 505;

let game = {
  score: 0,
  difficulty: "easy",
  textScore: document.querySelector('.score-text'),
  textHits: document.querySelector('.hits-text'),

  reset: function() {
    // console.log("You did it ");
    // reset game score to 0, update score text
    this.score = 0;
    this.textScore.innerHTML = this.score;

    // reset player hits to 0, update hits text    
    player.hits = 0;
    this.textHits.innerHTML = player.hits;

    // reset game difficulty back to "easy"
    this.changeDifficulty("easy");
    // console.log('difficulty is ' + game.difficulty);
  },

  addPoints: function() {
    // increase score, update score text
    this.score++;
    this.textScore.innerHTML = this.score;

    // if score meets criteria, change difficulty
    if (game.score > 5) {
      if (game.score == 10) {
        game.won(this.reset);
        return;
      }
      this.changeDifficulty("hard");
    } else if (game.score > 2) {
      this.changeDifficulty("medium");
    }
  },

  checkCollisions: function() {
    for (let enemy of allEnemies) {
      // if an enemy is within close range of the player...
      if ((enemy.x < (player.x + player.thresh) && enemy.x > (player.x - player.thresh)) && (enemy.y < (player.y + player.thresh) && enemy.y > (player.y - player.thresh))) {

        // ...the player is hit
        player.hit();
      };
    };
  },

  changeDifficulty: function(difficulty) {
    switch (difficulty) {

      case "easy":
        game.difficulty = difficulty;
        break;
      case "medium":
        game.difficulty = difficulty;
        break;
      case "hard":
        game.difficulty = difficulty;
        break;
    }
  },

  lose: function() {
    alert("4 Hits! You lost!!");
    game.reset();

  },

  won: function() {
    alert("10 points! You won!!");
    game.reset();
  }
}



/********************* Enemy class & methods *********************/
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.entryPoint = -90;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }
};

// Update enemy's position,
Enemy.prototype.update = function(dt) {
  // when enemy leaves the canvas, enter again at entry point
  if (this.x >= canvasBoundary) {
    this.x = this.entryPoint - 120;

    console.log(game.difficulty);

    // change speed based on difficulty
    if (game.difficulty == "easy") {
      this.speed = Math.floor((Math.random() * (100 - 60)) + 60);
    }

    if (game.difficulty == "medium") {
      this.speed = Math.floor((Math.random() * (500 - 350)) + 350);
    }

    if (game.difficulty == "hard") {
      this.speed = Math.floor((Math.random() * (700 - 520)) + 520);
    }
  }

  // adjust final speed
  this.x += this.speed * dt;
};

// Render enemy
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // console.log(randomSpeed());
};


/********************* Player class & methods *********************/
class Player {
  constructor() {
    this.startXPos = 202;
    this.startYPos = 290.5;
    this.x = this.startXPos;
    this.y = this.startYPos;
    this.sprite = 'images/char-boy.png';
    this.hits = 0;
    this.thresh = 50;
  }
}

// Update player's position 
Player.prototype.update = function() {
  if (player.hits == 4) {
    game.reset();
  }
}

// Render player 
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Make the player object move when 'keyup' event is fired
Player.prototype.handleInput = function(direction) {

  switch (direction) {
    case "left":
      if (this.x > 0) {
        this.x -= blockWidth;
      }
      break;
    case "right":
      if (this.x < 404) {
        this.x += blockWidth;
      }
      break;
    case "up":
      if (this.y == 41.5) {
        // console.log("Game won!");

        game.addPoints(1);

        setTimeout(function() {
          player.backToStart();
        }, 500);
      }

      if (this.y > -41.5) {
        this.y -= blockHeight;
      }
      break;
    case "down":
      if (this.y < 300) {
        this.y += blockHeight;
      }
      break;
  }
}

// Place the player back at the starting point
Player.prototype.backToStart = function() {
  this.x = this.startXPos;
  this.y = this.startYPos;
}

// When a player gets hit
Player.prototype.hit = function() {
  // increase player hit count, update hits text
  player.hits++;
  game.textHits.innerHTML = player.hits;

  // place player back at the start
  player.backToStart();

  player.update();
}


/********************* Instantiate player & enemies *********************/
const player = new Player();

// initialize enemies (bugs) with starting points and speed
let enemy1 = new Enemy(-90, 41.5, Math.floor((Math.random() * (100 - 60)) + 60));
let enemy2 = new Enemy(-190, 124.5, Math.floor((Math.random() * (100 - 60)) + 60));
let enemy3 = new Enemy(-135, 207.5, Math.floor((Math.random() * (100 - 60)) + 60));

// put all enemies into an array, allEnemies
const allEnemies = [enemy1, enemy2, enemy3];


// Handle player movement, add event listener to 'key up'
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});