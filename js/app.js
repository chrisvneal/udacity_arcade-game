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
  livesLost: 0,

  reset: function() {
    this.score = 0;
    this.textScore.innerHTML = this.score;

    player.hits = 0;

    this.textHits.innerHTML = player.hits;



    if (game.lives.children.length == 0) {
      game.insertHearts(4);
      console.log("Game reset; Heart count: " + this.lives.children.length);

    }
    // put the hearts back
    

    
    

  },

  addPoints: function(points) {
    this.score += points;

    if (game.score > 5) {
      changeDifficulty("hard");
    }
    else if (game.score > 2) {
      changeDifficulty("medium");
    } 

// console.log("Difficulty: " + game.difficulty);
    
    this.textScore.innerHTML = this.score;
    // console.log("difficulty:" + this.difficulty);
  },

  removeLife: function() {
    // player.hits++;
    document.querySelector('.hits-text').innerHTML = player.hits;

    if (this.lives.children.length > 0) {

      // remove every other element in the 'array', the 'img' element
      this.lives.removeChild(this.lives.childNodes[this.livesLost + 1]);
      this.livesLost += 1;
    }

    console.log("heart count: "  + game.lives.children.length);
    // console.log("heart count: "  + this.lives.children.length);
  },

  insertHearts: function(hearts) {
    for (let i = 0; i < hearts; i++) {
      let heartImage = "images/Heart.png";
  
  

      let heartElement = document.createElement('img');
      heartElement.setAttribute('src', heartImage);
  
      game.lives.appendChild(heartElement); 
    }
  }

  //TODO: Create function for when game is won
}



// check for enemy & player collisions

// console.log("heart count: "  + game.heartCount);
console.log("heart count: "  + game.lives.children.length);


function checkCollisions() {
  let thresh = 60;

  for (let enemy of allEnemies) {
    if (enemy.x < player.x + thresh && enemy.x > player.x - thresh) {
      if (enemy.y < player.y + thresh && enemy.y > player.y - thresh) {
        player.x = player.startXPos;
        player.y = player.startYPos;
        player.hits++;
        // document.querySelector('.hits-text').innerHTML = player.hits;

        // console.log(player.hits);
        game.removeLife();

        if (player.hits == 4) {

          document.querySelector('.hits-text').innerHTML = player.hits;


          // alert(`Game over! You were hit ${player.hits} times!`);


          game.reset();

        }



      };
    };
  }
}

function changeDifficulty(difficulty) {
  switch (difficulty) {
    
    case "medium":
    game.difficulty = difficulty;
      break;
      case "hard":
    game.difficulty = difficulty;
      break;
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


  // console.log(player.y);

  // checkForCollision();






  // when enemy leaves the canvas, it enters again at entry point
  if (this.x >= canvasBoundary) {
    this.x = this.entryPoint - 100;

    if (game.difficulty == "medium") {
      this.speed = Math.floor((Math.random() * (250 - 101)) + 101);
    }

    if (game.difficulty == "hard") {
      this.speed = Math.floor((Math.random() * (500 - 350)) + 350);
    }

    if (game.difficulty == "ultra") {
      this.speed = Math.floor((Math.random() * (700 - 520)) + 520);
    }

    


    

    // this.speed = Math.floor((Math.random() * (450 - 180)) + 100);
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


// console.log(game.lives);

class Player {
  constructor() {
    this.startXPos = 202;
    this.startYPos = 290.5;
    this.x = this.startXPos;
    this.y = this.startYPos;
    this.sprite = 'images/char-boy.png';
    this.hits = 0;
  }
}

// update position of player on the screen
Player.prototype.update = function() {
  // this.x = newXPosition;
  // this.y = newYPosition;


  if (player.hits == 4) {
    game.reset();
  }
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

  // console.log("enemy3 position: " + Math.floor(enemy3.x));

  // console.log("x: " + this.x + ", y: " + this.y);

}










// Instantiate objects (create player & enemies)


// Place the player object in a variable called player
const player = new Player();







// let x = -90;
// let y = Math.floor((Math.random() * (200 - 60)) + 60);
// let randomSpeed = Math.floor((Math.random() * (330 - 60)) + 60);



// Build number of enemies



// initialize enemies (bugs) with start points and speed
const enemy1 = new Enemy(-90, 41.5, Math.floor((Math.random() * (330 - 60)) + 60));
const enemy2 = new Enemy(-90, 124.5, Math.floor((Math.random() * (330 - 60)) + 60));
const enemy3 = new Enemy(-90, 207.5, Math.floor((Math.random() * (330 - 60)) + 60));


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