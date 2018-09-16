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
  textScore: document.querySelector('.score'),


  addPoints: function(points, callback) {
    this.score += points;
    this.textScore.innerHTML = this.score;

    // console.log(callback);

    // callback();

    // console.log(player.x, player.y);
  }
}





// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // When the bug fully steps out canvas boundary, restart
  // if (this.x < blockWidth * 5) {
  //   this.x += (this.speed * dt);
  // } else {
  //   this.x = -90;
  //   this.speed = randomSpeed(70, 300);
  // }


  // speed = (pick up by this much, pretty muchh in pixels)




  // when enemy leaves the canvas, it enters again at entry point
  if (this.x >= canvasBoundary) {
    this.x = this.entryPoint;
    this.speed = Math.floor((Math.random() * (400 - 100)) + 100);
    // console.log(this.speed);
    // game.addPoints(5);
  }

  this.x += this.speed * dt;
  // this.x += Math.floor((Math.random() * (100 - 30)) + 30) * dt;


  // when the enemy leaves the boundary, give a different speed



};

// console.log(canvasBoundary);

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // console.log(randomSpeed());
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.




class Player {
  constructor() {
    // this.startXPos = (blockWidth * 2);
    // this.startYPos = (blockMiddle * 7); 
    this.startXPos = 202;
    this.startYPos = 290.5;
    this.x = this.startXPos;
    this.y = this.startYPos;
    this.sprite = 'images/char-boy.png';





  }
}

// update position of player on the screen
Player.prototype.updatePosition = function() {
  this.x = newXPosition;
  this.y = newYPosition;
}

// render the player to the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// place the player back at the starting point
Player.prototype.backToStart = function() {
  this.x = this.startXPos;
  this.y = this.startYPos;
}

// make the player object move when 'keyup' event is fired
Player.prototype.handleInput = function(direction) {
  // console.log("vertical: " + this.x + ", horizontal: " + this.y);

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
        // console.log("You did it! " + this.y);

        setTimeout(function() {
          player.backToStart();
        }, 510);

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






















// Instantiate objects (create player & enemies)


// Place the player object in a variable called player
const player = new Player();







// let x = -90;
// let y = Math.floor((Math.random() * (200 - 60)) + 60);
// let randomSpeed = Math.floor((Math.random() * (330 - 60)) + 60);



// Build number of enemies



// initialize enemies (bugs) with start points and speed
const enemy1 = new Enemy(-90, 60, Math.floor((Math.random() * (330 - 60)) + 60));
const enemy2 = new Enemy(-90, 140, Math.floor((Math.random() * (330 - 60)) + 60));
const enemy3 = new Enemy(-90, 220, Math.floor((Math.random() * (330 - 60)) + 60));


// put all enemies into an array
const allEnemies = [enemy1, enemy2, enemy3];




















// Handle player movement; add event listener to 'key up'
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});