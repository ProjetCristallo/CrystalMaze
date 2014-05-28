var game = new Phaser.Game(600,480,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var Ball;
var BallMoving;
var BallSpeed = 1000;

var holeBlocks;

var endTile;
var endSprite;

var EndScreen;
var endButton;
//Boolean indicating if the player hasn't won yet.
var playing=true;


//variable indicating what the last direction taken was.
var lastDir;

// Blocks groups

var Hole = group();
var Simple = group();
var Unilateral = group();
var Fragile = group();
var C_up = group();
var C_down = group();
var C_left = group();
var C_right = group();
var endBlocks = group();

function preload() {
	game.load.image('logo','ressources/Bille.png');
	game.load.image('Fond','ressources/Fond.png');
	game.load.image('BNoir','ressources/Block_Noir.png');
	game.load.image('BVert','ressources/Block_Vert.png');
	game.load.image('Star','ressources/Star.png');
	game.load.image('Hole','ressources/Hole.png');
	game.load.image('Win','ressources/Win.png');
	game.load.image('Cup','ressources/Change_up.png');
	game.load.image('Cdown','ressources/Change_down.png');
	game.load.image('Cleft','ressources/Change_left.png');
	game.load.image('Cright','ressources/Change_right.png');
    
	game.load.spritesheet('button','ressources/button_sprite_sheet.png',193,71);
}


function create() {
	game.add.tileSprite(0,0,600,480,'Fond');

	game.physics.startSystem(Phaser.Physics.ARCADE);
	Ball = game.add.sprite(30,30,'logo');
	Ball.anchor.setTo(0.5,0.5);
	Ball.checkWorldBounds = true;
	game.physics.enable(Ball,Phaser.Physics.ARCADE);
	Ball.body.collideWorldBounds = true;
	BallMoving = false;


	createLevel();

	controller = game.input.keyboard.createCursorKeys();
}

function update() {
	if(playing){
		moveBall();
	}
}

function moveBall() {
	if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
	{
		BallMoving = false;
	}
	else
	{
		BallMoving = true;
	}
	if(!BallMoving)
	{
		if(controller.left.isDown && lastDir!='l')
		{
			lastDir='l';
			Ball.body.velocity.x = -BallSpeed;
		}
		else if(controller.right.isDown && lastDir!='r')
		{
			lastDir = 'r';
			Ball.body.velocity.x = +BallSpeed;
		}
		else if(controller.up.isDown && lastDir!='u')
		{
			lastDir='u';
			Ball.body.velocity.y = -BallSpeed;
		}
		else if(controller.down.isDown && lastDir!='d')
		{
			lastDir='d';
			Ball.body.velocity.y = +BallSpeed;
		}
	}
	else
	{
		game.physics.arcade.collide(Ball, Simple, simpleBlockCollide, null, this);
	    	game.physics.arcade.collide(Ball, Fragile, fragileBlockCollide, null, this);
		game.physics.arcade.collide(Ball, C_up, changeUpCollide, null, this);
		game.physics.arcade.collide(Ball, C_down, changeDownCollide, null, this);
		game.physics.arcade.collide(Ball, C_left, changeLeftCollide, null, this);
		game.physics.arcade.collide(Ball, C_right, changeRightCollide, null, this);
	    
		game.physics.arcade.overlap(Ball, endBlocks, endLevel, null, this);
	}	
}

function createLevel()
{
        Simple = game.add.group();
 	Fragile = game.add.group();
 	endBlocks = game.add.group();
         C_up = game.add.group();
         C_down = game.add.group();
         C_left = game.add.group();
         C_right = game.add.group();
	

endSprite = endBlocks.create(558, 438, 'Star');
	game.physics.enable(endSprite,Phaser.Physics.ARCADE);	
	endSprite.body.immovable = true;

    
	block = Fragile.create(480, 0, 'BVert');
	block.health = 4;
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;       

	block = Fragile.create(0, 360, 'BVert');
	block.health = 4;
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

	block = Simple.create(540, 0, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

	block = Simple.create(0, 420, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

        block = C_left.create(420, 0, 'Cleft');
        game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;
        
}

function endLevel(Ball, endTile)
{
	playing = false;
	endSprite.kill();
	EndScreen = game.add.sprite(25, 25, 'Win');
	endButton = game.add.button(200,250, 'button', actionOnClickEnd, this, 2,1,0);
}

function actionOnClickEnd()
{
	playing = true;
	create();
}

function simpleBlockCollide(Ball, block)
{
}

function fragileBlockCollide(Ball, block)
{
	block.damage(1);
	if(block.health == 0){
		lastDir=null;
	}   
}

function changeUpCollide(Ball, block)
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'u';
        Ball.body.velocity.y = -Ballspeed; 
    }
}

function changeDownCollide(Ball, block)
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'd'
	Ball.body.velocity.y = +BallSpeed;  
    }
}

function changeRightCollide(Ball, block)
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'r'
	Ball.body.velocity.x = +BallSpeed;
    }
}

function changeLeftCollide(Ball, block)
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'l'
	Ball.body.velocity.x = -BallSpeed;
    }
}

/*
   function parser(filename) {
   var file = new ActiveXObject("Scripting.FileSystemObject");
   var f_in = file.OpenTextFile(filename,1);
   while (!f_in.AtEndOfStream) {
   var block;
   var line = f_in.ReadLine();
   var res = line.split(" ");
   x = 30+60*parseInt(res[1]);
   y = 30+60*parseInt(res[2]);
   switch(res[0]) {
   case "begin":
   Ball = game.add.sprite(x,y,'logo');
   Ball.anchor.setTo(0.5,0.5);
   Ball.checkWorldBounds = true;
   game.physics.enable(Ball,Phaser.Physics.ARCADE);
   Ball.body.collideWorldBounds = true;
   BallMoving = false;
   break;
   case "end":
   break;
   case "hole":
   block = Hole.create(x,y,'hole');
   game.physics.enable(block,Phaser.Physics.ARCADE);
   block.body.immovable = true;
   break;
   case "simple":
   block = Simple.create(x,y,'simple');
   game.physics.enable(block,Phaser.Physics.ARCADE);
   block.body.immovable = true;
   break;
   case "unilateral":			
   switch(res[3]) {
   case "up":
   block = Unilateral.create(x,y,'u_up');
   block.body.checkCollision.up = false;
   break;
   case "down":
   block = Unilateral.create(x,y,'u_d');
   block.body.checkCollision.down = false;
   break;
   case "right":
   block = Unilateral.create(x,y,'u_r');
   block.body.checkCollision.right = false;
   break;
   case "left":
   block = Unilateral.create(x,y,'u_l');
   block.body.checkCollision.left = false;
   break;
   }
   game.physics.enable(block,Phaser.Physics.ARCADE);
   block.body.immovable = true;
   break;
   case "fragile":
   block = Fragile.create(x,y,'fragile');
   block.health = parseInt(res[3]);
   game.physics.enable(block,Phaser.Physics.ARCADE);
   block.body.immovable = true;
   break;
   case "change_up":
   block = C_up.create(x,y,'c_up');
   game.physics.enable(block,Phaser.Physics.ARCADE);
   block.body.immovable = true;
   break;
   case "change_down":
   block = C_down.create(x,y,'c_down');
   game.physics.enable(block,Phaser.Physics.ARCADE);
   block.body.immovable = true;
   break;
   case "change_right":
   block = C_right.create(x,y,'c_right');
game.physics.enable(block,Phaser.Physics.ARCADE);
block.body.immovable = true;
break;
case "change_left":
block = C_left.create(x,y,'c_left');
game.physics.enable(block,Phaser.Physics.ARCADE);
block.body.immovable = true;
break;
}
}
}
}
*/

