loadNeeded = true;

function create() {
	if(!mainMenu && !selectLevelMenu){
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
		salt = game.add.group();
		breakable = game.add.group();
		porous = game.add.group();
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
		buttonPause = game.add.button(0.85*TASKBAR_WIDTH,BACKGROUND_HEIGHT+MARGIN_TASKBAR,'pause',triggerPause);
		game.isPaused = false;

		var buttonsX = BACKGROUND_WIDTH-IN_GAME_MENU_MARGIN-IN_GAME_MENU_BUTTON_WIDTH;
		var buttonsY = BACKGROUND_HEIGHT-IN_GAME_MENU_HEIGHT+IN_GAME_MENU_MARGIN;
		pauseButtons = [];
		pauseButtons.push(game.add.button(buttonsX,buttonsY,'pauseButtonRestart',function() {
					game.world.removeAll(true);
					create();
					}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+1*(IN_GAME_MENU_BUTTON_HEIGHT+IN_GAME_MENU_MARGIN),'pauseButtonMenu',actionOnClickMenu));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+2*(IN_GAME_MENU_BUTTON_HEIGHT+IN_GAME_MENU_MARGIN),'pauseButtonParametres',function() {}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+3*(IN_GAME_MENU_BUTTON_HEIGHT+IN_GAME_MENU_MARGIN),'pauseButtonAide',help));

		pauseButtons.forEach(function(button){button.kill()});


		//Controller
		controller = game.input.keyboard.createCursorKeys();

	} else if(mainMenu){
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.sprite(11, 50, 'title');
		buttonJouer = game.add.button(200,300, 'buttonPlay', actionOnClickPlay, this, 1,0,2);
		buttonSelectLevel = game.add.button(197, 400, 'buttonSelectLevel', actionOnClickSelectLevel, this, 1, 0, 2);

	} else if (selectLevelMenu){

		// Title
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.text(150 ,30 ,"Selection du niveau",{});
		buttonReturn = game.add.button((TASKBAR_WIDTH - 125) / 2, BACKGROUND_HEIGHT + (TASKBAR_HEIGHT - 32) / 2, 'buttonReturn', actionOnClickReturn, this, 1, 0, 2);
		// Previous page button
		if (numPageCourant != 1){
			buttonArrowLeft = game.add.button((TASKBAR_WIDTH - 125) / 2 - 100, BACKGROUND_HEIGHT + (TASKBAR_HEIGHT - 32) / 2, 'prevPage', actionOnClickArrowLeft, this);
		}
		// Next page button
		if (numPageCourant != nbrPageTotal){
			buttonArrowRight = game.add.button((TASKBAR_WIDTH - 125) / 2 + 200, BACKGROUND_HEIGHT + (TASKBAR_HEIGHT - 32) / 2, 'nextPage', actionOnClickArrowRight, this);
		}

		// levels buttons
		numSprite = 0;
		for (var i = (numPageCourant - 1) * 9 + 1; i <= Math.min(numPageCourant * 9, nbrLevel); i++){
			if (i <= nbrLevelAccessible){
				buttonLevel = game.add.button(75 + (numSprite % 3) * 175, 60 + parseInt(numSprite/3) * 140, 'levelA', actionOnClickLevelAccessible, this);
			} else {
				buttonLevel = game.add.button(75 + (numSprite % 3) * 175, 60 + parseInt(numSprite/3) * 140, 'levelI', actionOnClickLevelInaccessible, this);
			}
			buttonLevel.name = i;
			game.add.text(120 + (numSprite % 3) * 175, 100 + parseInt(numSprite/3) * 140, buttonLevel.name, {});
			
			//Stars
			var stars = game.add.sprite(75 + (numSprite % 3)*175, 125 + parseInt(numSprite/3) * 140, 'stars');
			var scoreLevel = readScore(buttonLevel.name);
			if (scoreLevel != null) {
				for (var j=0; j<scoreLevel; j++) {
					stars.animations.frame++;
				}
			}
			numSprite++;
		}
	} else {
		alert("problem : menu selection ... (create.js)");
	}
}
