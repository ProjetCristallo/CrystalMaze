function create() {
    if(blop){
	game.add.tileSprite(0,0,600,480,'Fond');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
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
	Item = game.add.group();
	
	createLevel();
	
	//Controller
	controller = game.input.keyboard.createCursorKeys();
	
	//Pause button
	//var pauseButton = game.add.button(0,300,'pause', pause);
    } else {
	mainMenu = game.add.sprite(0, 0, 'mainMenu');
	title = game.add.sprite(11, 50, 'title');
	button_jouer = game.add.button(200,300, 'button1', actionOnClick1, this, 1,0,2);

    }	
}
