loadNeeded = true;

function create() {
	if(!mainMenu && !selectLevelMenu){
		game.add.tileSprite(0,0,constants.BACKGROUND_WIDTH,constants.BACKGROUND_HEIGHT,'fond');
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
		if(constants.USE_CORDOVA){
			//TaskBar
			taskBarSprite=simple.create(constants.BACKGROUND_WIDTH,
					0,'taskBar');
			//Info in taskbar
			textScore = game.add.text(constants.BACKGROUND_WIDTH +
					constants.MARGIN_TASKBAR,
					constants.MARGIN_TASKBAR,
					"Moves : 0",
					{font: constants.FONT_TASKBAR.STYLE});
			textLevel = game.add.text(constants.BACKGROUND_WIDTH +
					constants.MARGIN_TASKBAR,
					2*constants.MARGIN_TASKBAR + 
					constants.FONT_TASKBAR.SIZE,
					"Level : "+currentLevel,
					{font: constants.FONT_TASKBAR.STYLE});
			//Buttons in taskbar
			buttonPause = game.add.button(
					constants.BACKGROUND_WIDTH + 
					0.35*constants.TASKBAR_WIDTH,
					0.8*constants.TASKBAR_HEIGHT,
					'pause',triggerPause);
		}else{
			//TaskBar
			taskBarSprite = simple.create(0,
					constants.BACKGROUND_HEIGHT,'taskBar');
			//Info in taskbar
			textScore = game.add.text(constants.MARGIN_TASKBAR,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR,
					"Moves : 0",
					{font: constants.FONT_TASKBAR.STYLE});
			textLevel = game.add.text(constants.MARGIN_TASKBAR,
					constants.BACKGROUND_HEIGHT+
					constants.TASKBAR_HEIGHT-
					constants.MARGIN_TASKBAR,
					"Level : "+currentLevel,
					{font: constants.FONT_TASKBAR.STYLE});
			textLevel.anchor={'x':0,'y':1};
			//Buttons in taskbar
			buttonPause = game.add.button(0.85*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR,
					'pause',triggerPause);
			game.isPaused = false;
		}
		game.physics.enable(taskBarSprite,Phaser.Physics.ARCADE);
		taskBarSprite.body.immovable=true;
		createLevel();

		var buttonsX = constants.BACKGROUND_WIDTH-constants.IN_GAME_MENU_MARGIN-constants.IN_GAME_MENU_BUTTON_WIDTH;
		var buttonsY = constants.BACKGROUND_HEIGHT-constants.IN_GAME_MENU_HEIGHT+constants.IN_GAME_MENU_MARGIN;
		pauseButtons = [];
		pauseButtons.push(game.add.button(buttonsX,buttonsY,'pauseButtonRestart',function() {
			game.world.removeAll(true);
			create();
		}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+1*(constants.IN_GAME_MENU_BUTTON_HEIGHT+constants.IN_GAME_MENU_MARGIN),'pauseButtonMenu',actionOnClickMenu));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+2*(constants.IN_GAME_MENU_BUTTON_HEIGHT+constants.IN_GAME_MENU_MARGIN),'pauseButtonMute',actionOnClickMute));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+3*(constants.IN_GAME_MENU_BUTTON_HEIGHT+constants.IN_GAME_MENU_MARGIN),'pauseButtonAide',help));

		pauseButtons.forEach(function(button){button.kill()});


		//Controller
		controller = game.input.keyboard.createCursorKeys();

		//Enter key
		enterKey = game.input.keyboard.addKey(13);

	} else if(mainMenu){
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.sprite(11, 50, 'title');
		buttonJouer = game.add.button(200,300, 'buttonPlay', actionOnClickPlay, this, 1,0,2);
		buttonSelectLevel = game.add.button(197, 400, 'buttonSelectLevel', actionOnClickSelectLevel, this, 1, 0, 2);

	} else if (selectLevelMenu){

		// Title
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.text(150 ,30 ,"Select Level",{});
		if(constants.USE_CORDOVA){
			buttonReturn = game.add.button(
					constants.BACKGROUND_WIDTH +
					(constants.TASKBAR_WIDTH) / 2,
					(constants.TASKBAR_HEIGHT) / 2,
					'buttonReturn', actionOnClickReturn,
					this, 1, 0, 2);
			buttonReturn.anchor = {'x':0.5,'y':0.5};
			// Previous page button
			if (numPageCourant != 1){
				buttonArrowLeft = game.add.button(
						constants.BACKGROUND_WIDTH + 
						0.5*constants.TASKBAR_WIDTH,
						0.25*constants.TASKBAR_HEIGHT,
						'prevPage',
						actionOnClickArrowLeft, this);
				buttonArrowLeft.anchor = {'x':0.5,'y':0.5};
			}
			// Next page button
			if (numPageCourant != nbrPageTotal){
				buttonArrowRight = game.add.button(
						constants.BACKGROUND_WIDTH +
						0.5*constants.TASKBAR_WIDTH,
						0.75*constants.TASKBAR_HEIGHT,
						'nextPage',
						actionOnClickArrowRight, this);
				buttonArrowRight.anchor = {'x':0.5,'y':0.5};
			}


		}else{
			buttonReturn = game.add.button(
					(constants.TASKBAR_WIDTH) / 2, 
					constants.BACKGROUND_HEIGHT + 
					(constants.TASKBAR_HEIGHT) / 2, 
					'buttonReturn', actionOnClickReturn,
					this, 1, 0, 2);
			buttonReturn.anchor = {'x':0.5,'y':0.5};
			// Previous page button
			if (numPageCourant != 1){
				buttonArrowLeft = game.add.button(
						0.25*constants.TASKBAR_WIDTH, 
						constants.BACKGROUND_HEIGHT + 
						(constants.TASKBAR_HEIGHT) / 2,
						'prevPage', 
						actionOnClickArrowLeft, this);
				buttonArrowLeft.anchor = {'x':0.5,'y':0.5};
			}
			// Next page button
			if (numPageCourant != nbrPageTotal){
				buttonArrowRight = game.add.button(
						0.75*constants.TASKBAR_WIDTH, 
						constants.BACKGROUND_HEIGHT + 
						(constants.TASKBAR_HEIGHT) / 2,
						'nextPage', 
						actionOnClickArrowRight, this);
				buttonArrowRight.anchor = {'x':0.5,'y':0.5}
			}
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
