// Place positions in variables
let blockWidth = 101;
let blockHeight = 83;
let blockMiddle = blockHeight / 2;




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

const canvasBoundary = 505;

function randomSpeed(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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
  } 

  this.x += Math.floor((Math.random() * (100 - 30)) + 30) * dt;


  // when the enemy leaves the boundary, give a different speed



};

console.log(canvasBoundary);

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
    this.x = (blockWidth * 2);
    this.y = (blockMiddle * 7);
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

// make the player object move when 'keyup' event is fired
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
      if (this.y > 0) {
        this.y -= blockHeight;

        if (this.y == -41.5) {
          // console.log("Game won");
          // TODO: Create player 'game won' function
        }
        // console.log("position: " + this.y);
      }
      break;
    case "down":
      if (this.y < 300) {
        this.y += blockHeight;
      }
      break;
  }
}

// place the player back at the starting point
Player.prototype.backToStart = function() {

}


// Now instantiate your objects.

// Place the player object in a variable called player
const player = new Player();










// initialize enemies (bugs) with start points and speed
const enemy1 = new Enemy(-90, 60, 500);
const enemy2 = new Enemy(-90, 140, 65);
const enemy3 = new Enemy(-90, 220, 45);
const enemy4 = new Enemy(-300, 155, 30);
const enemy5 = new Enemy(-400, 89, 45);


// put all enemies into an array
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];







































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