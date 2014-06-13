loadNeeded = true;

function create() {
	if(!mainMenu && !selectLevelMenu){
		game.add.tileSprite(0,0,constants.BACKGROUND_WIDTH,
				constants.BACKGROUND_HEIGHT,'fond');
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
			
			//Taskbar buttons
			taskBarButtons = [];
			//Sound button
			var frameUp = 0;
			var frameDown = 1;
			if (mute) {
				frameUp = 1;
				frameDown = 0;
			}
			soundButton = game.add.button(0.3*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR, 'soundButton', actionOnClickMute, this, frameUp, frameUp, frameDown)
			taskBarButtons.push(soundButton);
			//Help button
			taskBarButtons.push(game.add.button(0.45*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR, 'questionMark', help));
			//Restart button
			taskBarButtons.push(game.add.button(0.6*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR, 'simpleRestart', actionOnClickRestart));
			//Main Menu button
			mainMenuButton = game.add.button(0.8*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR, 'mainMenuButton', actionOnClickMenu,this, 0, 0, 1);
			
			//obsolete
			//Button pause 
			/*buttonPause = game.add.button(0.85*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR,
					'pause',triggerPause);
			game.isPaused = false;*/
		}
		
		game.physics.enable(taskBarSprite,Phaser.Physics.ARCADE);
		taskBarSprite.body.immovable=true;
		createLevel();

		//obsolete
		//task bar 
		/*var buttonsX = constants.BACKGROUND_WIDTH-
			constants.IN_GAME_MENU_MARGIN-
			constants.IN_GAME_MENU_BUTTON_WIDTH;
		var buttonsY = constants.BACKGROUND_HEIGHT-
			constants.IN_GAME_MENU_HEIGHT+
			constants.IN_GAME_MENU_MARGIN;
		pauseButtons = [];
		pauseButtons.push(game.add.button(buttonsX,buttonsY,
					'pauseButtonRestart',
					function() {
						game.world.removeAll(true);
						create();
					}));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+
					(constants.IN_GAME_MENU_BUTTON_HEIGHT+
					 constants.IN_GAME_MENU_MARGIN),
					'pauseButtonMenu',actionOnClickMenu));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+
					2*(constants.IN_GAME_MENU_BUTTON_HEIGHT+
						constants.IN_GAME_MENU_MARGIN),
					'pauseButtonMute',actionOnClickMute));
		pauseButtons.push(game.add.button(buttonsX,buttonsY+
					3*(constants.IN_GAME_MENU_BUTTON_HEIGHT+
						constants.IN_GAME_MENU_MARGIN),
					'pauseButtonAide',help));

		pauseButtons.forEach(function(button){button.kill()});*/


		//Controller
		controller = game.input.keyboard.createCursorKeys();

		//Enter key
		enterKey = game.input.keyboard.addKey(13);

	} else if(mainMenu){
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.sprite(0.5*constants.BACKGROUND_WIDTH, 
				0.3*constants.BACKGROUND_HEIGHT, 'title');
		title.anchor={'x':0.5,'y':0.5};
		buttonJouer = game.add.button(0.5*constants.BACKGROUND_WIDTH,
				0.65*constants.BACKGROUND_HEIGHT, 'buttonPlay', 
				actionOnClickPlay, this, 1,0,2);
		buttonJouer.anchor={'x':0.5,'y':0.5};
		buttonSelectLevel = game.add.button(
				0.5*constants.BACKGROUND_WIDTH,
				0.85*constants.BACKGROUND_HEIGHT,
				'buttonSelectLevel', 
				actionOnClickSelectLevel,this, 1, 0, 2);
		buttonSelectLevel.anchor={'x':0.5,'y':0.5};
	} else if (selectLevelMenu){
		// Title
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.text(0.5*constants.BACKGROUND_WIDTH,
				0.05*constants.BACKGROUND_HEIGHT,
				"Select Level",{});
		title.anchor={'x':0.5,'y':0.5};
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
		for (var i = (numPageCourant - 1) * 9 + 1; 
				i <= Math.min(numPageCourant * 9,nbrLevel); 
				i++)
		{
			if (i <= nbrLevelAccessible){
				buttonLevel = game.add.button(constants.
						SELECT_LEVEL.MARGIN.X+
						(numSprite % 3)*
						constants.SELECT_LEVEL.DELTA.X,
						constants.SELECT_LEVEL.MARGIN.Y
						+parseInt(numSprite/3) *
						constants.SELECT_LEVEL.DELTA.Y, 
						'levelA', 
						actionOnClickLevelAccessible, 
						this);
			} else {
				buttonLevel = game.add.button(constants.
						SELECT_LEVEL.MARGIN.X + 
						(numSprite % 3) * 
						constants.SELECT_LEVEL.DELTA.X,
						constants.SELECT_LEVEL.MARGIN.Y
						+ parseInt(numSprite/3) * 
						constants.SELECT_LEVEL.DELTA.Y,
						'levelI',
						actionOnClickLevelInaccessible,
						this);
			}
			buttonLevel.name = i;
			game.add.text(constants.SELECT_LEVEL.MARGIN.X +
					constants.SELECT_LEVEL.TEXT.X +
					(numSprite % 3) * 
					constants.SELECT_LEVEL.DELTA.X,
					constants.SELECT_LEVEL.MARGIN.Y +
					constants.SELECT_LEVEL.TEXT.Y + 
					parseInt(numSprite/3) * 
					constants.SELECT_LEVEL.DELTA.Y, 
					buttonLevel.name, {});

			//Stars
			var stars = game.add.sprite(
					constants.SELECT_LEVEL.MARGIN.X+ 
					(numSprite % 3)*
					constants.SELECT_LEVEL.DELTA.X, 
					constants.SELECT_LEVEL.MARGIN.Y + 
					constants.SELECT_LEVEL.STAR_Y +
					parseInt(numSprite/3) * 
					constants.SELECT_LEVEL.DELTA.Y,'stars');
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
