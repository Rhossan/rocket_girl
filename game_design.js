


const LEVEL = `
...........................................;
...........................................;
...........................................;
...........................................;
...........................................;
...........................................;
...........................................;
...........................................;
...........................................;
.............................oo............;
...................#.........##............;
...................#...^......#............;
.......................#......#............;
...................o...o......#............;
..#................#...#....o.#............;
..#..............^.#...#...###########.....;
..#.........o.o....#...#..###########......;
..#...@...#####...#...#..###########......;
..#####............#...#+++++++++++++++++++;
......#++++++++++++#+++####################;
......#################....................;
...........................................`;


class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }
}

class Map{
  constructor(level){
    let rows = level.split(';');
    for (var i = 0; i < rows.length; i++) {
      rows[i] = rows[i].trim();
    }
    this.width = rows.length;
    this.height = rows[0].length;
    this.grid = [];
    this.staticObjects = [];
    this.dynamicObjects = [];
    const dynamic = ['o', '@', '^', '-']
    for (var i = 0; i < rows.length; i++) {
      let gridRow = []
      for (var j = 0; j < rows[0].length; j++) {
        // if(dynamic.includes(rows[i][j])){
        //   switch (rows[i][j]) {
        //     case 'o':
        //     this.dynamicObjects.push(new Coin(new Vector(i,j), 'o'));
        //     break;
        //     case '^':
        //     this.dynamicObjects.push(new Spike(new Vector(i,j), '^'));
        //     break;
        //   }
        //   gridRow.push(null);
        // }
        // else{}
          if (rows[i][j] === '#') gridRow.push('wall');
          else if (rows[i][j] === '+') gridRow.push('spike');
          else if (rows[i][j] === '^') gridRow.push('spike');
          else if (rows[i][j] === 'o') gridRow.push('coin');
          else gridRow.push(null);

      }
      this.grid.push(gridRow);
    }

  }
}

class Status {
  constructor(dynamicObjects, currentMap, playStatus){
    this.dynamicObjects = dynamicObjects;
    this.currentMap = currentMap;
    this.playStatus = playStatus;
  }

  startNewMap(map){
    return new Status(map.dynamicObjects, map, "game_start");
  }
}


class Player{
  constructor(pos, velocity){
    this.pos = pos;
    this.size = new Vector(1, 1);//will need updated sprite size
    this.velocity = new Vector(0,0);
    this.x = 0;
    this.y = 0;
    this.width = 40;
    this.height = 60;
    };
}
Player.prototype.size = new Vector(1, 1);


class Spike {
  constructor(pos, char, velocity) {
    this.pos = pos;
    this.velocity = velocity;
    this.char = char;
  }
}

Spike.prototype.size = new Vector(1, 1);

class Coin {
  constructor(pos, char) {
    this.pos = pos;
    this.char = char;
  }

}

Coin.prototype.size = new Vector(0.5, 0.5);

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 800,
    height = 500;
    keys = [];


canvas.width = width;
canvas.height = height;

var playerImg = new Image();
playerImg.src = 'img/ellie_killer.png';
var platform = new Image();
platform.src = 'img/platform.png';
var spikeImg = new Image();
spikeImg.src = 'img/spikes.png';
var coinImg = new Image();
coinImg.src = 'img/coin.png';

// ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
ctx.drawImage(playerImg, 0, 0, 40, 60);

const map = new Map(LEVEL)
for (var i = 0; i < map.grid.length; i++) {
  for (var j = 0; j < map.grid[0].length; j++) {
    // console.log('i')
    // console.log(i);
    // console.log('j')
    // console.log(j);
    if(map.grid[i][j] === 'wall') {ctx.drawImage(platform, j*20, i*20, 20, 20);}
    else if (map.grid[i][j] === 'spike') {ctx.drawImage(spikeImg, j*20, i*20, 20, 20);}
    else if (map.grid[i][j] === 'coin') {ctx.drawImage(coinImg, j*20, i*20, 20, 20);}

  }
}

function update(){
  // check keys
    if (keys[32]) {
        // space
    }
    if (keys[39]) {
        // right arrow

    }
    if (keys[37]) {
        // left arrow

    }

    ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
    for (var i = 0; i < map.grid.length; i++) {
      for (var j = 0; j < map.grid[0].length; j++) {

        if(map.grid[i][j] === 'wall') {
          ctx.drawImage(platform, j*20, i*20, 20, 20);}
        else if (map.grid[i][j] === 'spike') {
          ctx.drawImage(spikeImg, j*20, i*20, 20, 20);}
      }
    }

  // ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  ctx.drawImage(playerImg, 0, 0, 40, 60);
  requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load",function(){
    update();
});
