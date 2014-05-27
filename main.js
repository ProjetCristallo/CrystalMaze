var game = new Phaser.Game(600,480,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var Ball;
var BallMoving;
var BallSpeed = 1000;
var blackBlocks
var greenBlocks

function preload() {
	game.load.image('logo','ressources/Bille.png');
	game.load.image('Fond','ressources/Fond.png');
	game.load.image('BNoir','ressources/Block_Noir.png');
	game.load.image('BVert','ressources/Block_Vert.png');
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
	moveBall();
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
		game.physics.arcade.collide(Ball, blackBlocks, blackBlockCollide, null, this);
		game.physics.arcade.collide(Ball, greenBlocks, greenBlockCollide, null, this);
	}
}

function createLevel()
{
	blackBlocks = game.add.group();
	greenBlocks = game.add.group();

	block = blackBlocks.create(540, 0, 'BVert');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

	block = blackBlocks.create(0, 420, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;
}

function blackBlockCollide()
{
}

function greenBlockCollide()
{
}
