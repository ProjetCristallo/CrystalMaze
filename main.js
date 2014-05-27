var game = new Phaser.Game(600,480,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var Ball;
var BallMoving;
var BallSpeed = 1000;
var breakBlock;
var endBlocks;
var endTile;
var EndScreen;
var endButton;
//Boolean indicating if the player hasn't won yet.
var playing=true;

function preload() {
	game.load.image('logo','ressources/Bille.png');
	game.load.image('Fond','ressources/Fond.png');
	game.load.image('BNoir','ressources/Block_Noir.png');
	game.load.image('BVert','ressources/Block_Vert.png');
	game.load.image('Star','ressources/Star.png');
	game.load.image('Win','ressources/Win.png');
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
		if(controller.left.isDown)
		{
			Ball.body.velocity.x = -BallSpeed;
		}
		else if(controller.right.isDown)
		{
			Ball.body.velocity.x = +BallSpeed;
		}
		else if(controller.up.isDown)
		{
			Ball.body.velocity.y = -BallSpeed;
		}
		else if(controller.down.isDown)
		{
			Ball.body.velocity.y = +BallSpeed;
		}
	}
	else
	{
	    game.physics.arcade.collide(Ball, normalBlocks, blackBlockCollide, null, this);
	    game.physics.arcade.collide(Ball, breakableBlocks, greenBlockCollide, null, this);
	    game.physics.arcade.overlap(Ball, endBlocks, endLevel, null, this);
	}	
}

function createLevel()
{
	normalBlocks = game.add.group();
	breakableBlocks = game.add.group();
	endBlocks = game.add.group();
	
	endTile = endBlocks.create(558, 438, 'Star');
	game.physics.enable(endTile,Phaser.Physics.ARCADE);	
	endTile.body.immovable = true;
/*
        breakBlock.sprite = breakableBlocks.create(480, 0, 'BVert');
        game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

        breakBlock.sprite = breakableBlocks.create(0, 360, 'BVert');
        game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;
*/
	block = normalBlocks.create(540, 0, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

	block = normalBlocks.create(0, 420, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;
}

function endLevel(Ball, endTile)
{
	playing = false;
	endTile.kill();
	EndScreen = game.add.sprite(25, 25, 'Win');
	endButton = game.add.button(200,250, 'button', actionOnClickEnd, this, 2,1,0);
}

function actionOnClickEnd()
{
	playing = true;
	create();
}

function blackBlockCollide()
{
}

function greenBlockCollide()
{
}
