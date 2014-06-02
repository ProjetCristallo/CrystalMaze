function create() {
    if(main_menu){
	game.add.tileSprite(0,0,BACKGROUND_HEIGHT,BACKGROUND_WIDTH,'Fond');
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
	Turn = game.add.group();
	score = 0;	

	createLevel();
	
	text = game.add.text(500, 30, "Score : 0", {
        font: "40px Arial",
        fill: "#ff0044",
        align: "center"
    });

    text.anchor.setTo(0.5, 0.5);
		
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
