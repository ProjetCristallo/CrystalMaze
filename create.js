function create() {
    if(!mainMenu){
	game.add.tileSprite(0,0,BACKGROUND_WIDTH,BACKGROUND_HEIGHT,'fond');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	//Obstacle groups
	hole = game.add.group();
	simple = game.add.group();
	unilateral = game.add.group();
	cUp = game.add.group();
	cDown = game.add.group();
	cLeft = game.add.group();
	cRight = game.add.group();
	breakable = game.add.group();
	begin = game.add.group();
	end = game.add.group();
	item = game.add.group();
	turn = game.add.group();
	score = 0;	

	//TaskBar
	taskBarSprite = simple.create(0,BACKGROUND_HEIGHT,'taskBar');
	game.physics.enable(taskBarSprite,Phaser.Physics.ARCADE);	
	taskBarSprite.body.immovable=true;
	createLevel();
		//Info in taskbar
		textScore = game.add.text(MARGIN_TASKBAR,BACKGROUND_HEIGHT+MARGIN_TASKBAR,"Score : 0",{});		
		textLevel = game.add.text(MARGIN_TASKBAR,BACKGROUND_HEIGHT+TASKBAR_HEIGHT-MARGIN_TASKBAR,"Niveau "+currentLevel,{});
		textLevel.anchor={'x':0,'y':1};
		//Buttons in taskbar
		buttonPause = game.add.button(TASKBAR_WIDTH/2,BACKGROUND_HEIGHT+MARGIN_TASKBAR,'pause',triggerPause);
		game.isPaused = false;

 		var buttonsX = BACKGROUND_WIDTH-IN_GAME_MENU_MARGIN-IN_GAME_MENU_BUTTON_WIDTH;
                var buttonsY = BACKGROUND_HEIGHT-IN_GAME_MENU_HEIGHT+IN_GAME_MENU_MARGIN;
		pauseButtons = [];
		pauseButtons.push(game.add.button(buttonsX,buttonsY                                                   ,'pauseButtonRestart'      ,function() {
        			game.world.removeAll();
        			create();
		}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+1*(IN_GAME_MENU_BUTTON_HEIGHT+IN_GAME_MENU_MARGIN),'pauseButtonMenu'   ,function() {
				game.world.removeAll();
				mainMenu=true;
				currentLevel=1;
				create();}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+2*(IN_GAME_MENU_BUTTON_HEIGHT+IN_GAME_MENU_MARGIN),'pauseButtonParametres',function() {}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+3*(IN_GAME_MENU_BUTTON_HEIGHT+IN_GAME_MENU_MARGIN),'pauseButtonAide'      ,function() {}));
		pauseButtons.forEach(function(button){button.kill()});

	
	//Controller
	controller = game.input.keyboard.createCursorKeys();
	
    } else {
	mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
	title = game.add.sprite(11, 50, 'title');
	buttonJouer = game.add.button(200,300, 'buttonPlay', actionOnClickPlay, this, 1,0,2);

    }	
}
