// Place positions in variables
let blockWidth = 101;
let blockHeight = 83;
let blockMiddle = blockHeight / 2;




const canvasBoundary = 505;








// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.entryPoint = -90;
    this.speed = speed;




    this.sprite = 'images/enemy-bug.png';
  };


};



// function randomSpeed(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }




let game = {
  score: 0,
  difficulty: "easy",
  textScore: document.querySelector('.score-text'),
  textHits: document.querySelector('.hits-text'),
  lives: document.querySelector('.lives'),
  hearts: 4, // to offset image file location in array

  reset: function() {

    // reset game score to 0, update score text
    this.score = 0;
    this.textScore.innerHTML = this.score;

    // reset player hits to 0, update hits text    
    player.hits = 0;
    this.textHits.innerHTML = player.hits;

    // reset # of lives lost
    this.hearts = 4;

    // reset game difficulty back to "easy"
    this.changeDifficulty("easy");





    // if (game.lives.children.length == 0) {
    //   game.insertHearts(4);
    //   console.log("Game reset; Heart count: " + this.lives.children.length);

    // }
    // put the hearts back





  },

  addPoints: function() {
    // increase score, update score text
    this.score++;
    this.textScore.innerHTML = this.score;

    // if score meets criteria, change difficulty
    if (game.score > 5) {
      this.changeDifficulty("hard");
    } else if (game.score > 2) {
      this.changeDifficulty("medium");
    }
  },

  removeHeart: function() {


    this.hearts--;


    // console.log("lives lost: " + this.livesLost);






    // player.hits++;
    // document.querySelector('.hits-text').innerHTML = player.hits;

    // console.log("node name: " + game.lives.childNodes[0].nodeName);

    // remove every other element in the 'array', the 'img' element



    // this.livesLost += 1;

    // if (this.lives.childNodes[0].nodeName == "IMG") {
    //   this.lives.removeChild(this.lives.childNodes[3]);

    // } else {
    //   console.log("This isn't a child node");
    // }
    // this.lives.removeChild(this.lives.childNodes[this.livesLost + 1]);



    // console.log("heart count: " + game.lives.children.length);
    // console.log("heart count: "  + this.lives.children.length);
  },

  insertHearts: function(hearts) {
    for (let i = 0; i < hearts; i++) {
      let heartImage = "images/Heart.png";



      let heartElement = document.createElement('img');
      heartElement.setAttribute('src', heartImage);

      game.lives.appendChild(heartElement);
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
  }
}

// game.insertHearts(4);












function changeDifficulty(difficulty) {

}


// Update the enemy's position,
Enemy.prototype.update = function(dt) {
  // when enemy leaves the canvas, enter again at entry point
  if (this.x >= canvasBoundary) {
    this.x = this.entryPoint - 100;

    // change speed based on difficulty
    if (game.difficulty == "easy") {
      this.speed = Math.floor((Math.random() * (330 - 60)) + 60);
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


// Draw the enemy on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // console.log(randomSpeed());
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// console.log(game.lives);


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

// Update position of player 
Player.prototype.update = function() {
  if (player.hits == 4) {
    game.reset();
  }
}

// Render the player 
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

  // remove a heart (life)
  game.removeHeart();

  // place player back at the start
  player.backToStart();

  player.update();
}












// Create player & enemies
const player = new Player();

// initialize enemies (bugs) with starting points and speed
let enemy1 = new Enemy(-90, 41.5, Math.floor((Math.random() * (330 - 60)) + 60));
let enemy2 = new Enemy(-90, 124.5, Math.floor((Math.random() * (330 - 60)) + 60));
let enemy3 = new Enemy(-90, 207.5, Math.floor((Math.random() * (330 - 60)) + 60));

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