function create() {
    if(!mainMenu){
	game.add.tileSprite(0,0,BACKGROUND_HEIGHT,BACKGROUND_WIDTH,'fond');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Obstacle groups
	hole = game.add.group();
	simple = game.add.group();
	unilateral = game.add.group();
	cUp = game.add.group();
	cDown = game.add.group();
	cLeft = game.add.group();
	cRight = game.add.group();
	salt = game.add.group();
	breakable = game.add.group();
	porous = game.add.group();
	begin = game.add.group();
	end = game.add.group();
	item = game.add.group();
	turn = game.add.group();
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
	mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
	title = game.add.sprite(11, 50, 'title');
	buttonJouer = game.add.button(200,300, 'buttonPlay', actionOnClickPlay, this, 1,0,2);

    }	
}
