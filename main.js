var game = new Phaser.Game(640,480,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var Ball;
var BallMoving;
var BallSpeed = 400;

function preload() {
	game.load.image('logo','ressources/Bille.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	Ball = game.add.sprite(30,30,'logo');
	Ball.anchor.setTo(0.5,0.5);
	Ball.checkWorldBounds = true;
	game.physics.enable(Ball,Phaser.Physics.ARCADE);
	Ball.body.collideWorldBounds = true;
	BallMoving = false

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
}
