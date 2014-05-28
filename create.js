function create() {
	game.add.tileSprite(0,0,600,480,'Fond');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Ball creation
	Ball = game.add.sprite(30,30,'logo');
	Ball.anchor.setTo(0.5,0.5);
	Ball.checkWorldBounds = true;
	game.physics.enable(Ball,Phaser.Physics.ARCADE);
	Ball.body.collideWorldBounds = true;
	BallMoving = false;

	//Obstacle groups
	Hole = game.add.group();
	Simple = game.add.group();
	Unilateral = game.add.group();
	C_up = game.add.group();
	C_down = game.add.group();
	C_left = game.add.group();
	C_right = game.add.group();
	Breakable = game.add.group();
	Begin = game.add.group();
	End = game.add.group();


	createLevel();

	controller = game.input.keyboard.createCursorKeys();
}
