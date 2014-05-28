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
