/** Generate and display the current level.
 */
function generateLevel()
{
	game.add.tileSprite(0,0,constants.BACKGROUND_WIDTH,
			constants.BACKGROUND_HEIGHT,'fond');
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Obstacle groups
	blockGroups.hole = game.add.group();
	blockGroups.simple = game.add.group();
	blockGroups.unilateral = game.add.group();
	blockGroups.salt = game.add.group();
	blockGroups.breakable = game.add.group();
	blockGroups.porous = game.add.group();
	blockGroups.end = game.add.group();
	blockGroups.item = game.add.group();
	blockGroups.turn = game.add.group();
	score = 0;	
	if(constants.USE_CORDOVA){
		//TaskBar
		taskBarSprite=blockGroups.simple.create(constants.BACKGROUND_WIDTH,
				0,'taskBar');
		//Info in taskbar
		textScore = game.add.text(constants.BACKGROUND_WIDTH +
				constants.MARGIN_TASKBAR,
				constants.MARGIN_TASKBAR,
				"Moves : 0",
				{font: constants.FONT_TASKBAR.STYLE});
		if(!tutorial){
			textLevel = game.add.text(constants.BACKGROUND_WIDTH +
					constants.MARGIN_TASKBAR,
					2*constants.MARGIN_TASKBAR + 
					constants.FONT_TASKBAR.SIZE,
					"Level : "+levelStruct.currentLevel,
					{font: constants.FONT_TASKBAR.STYLE});
		} else {
			textLevel = game.add.text(constants.BACKGROUND_WIDTH +
					constants.MARGIN_TASKBAR,
					2*constants.MARGIN_TASKBAR + 
					constants.FONT_TASKBAR.SIZE,
					"Tutorial : "+tutoStruct.currentLevelTuto,
					{font: constants.FONT_TASKBAR.STYLE});
		}
		//Taskbar buttons
		taskBarButtons = [];
		//Sound button
		var frameUp = 0;
		var frameDown = 1;
		if (mute) {
			frameUp = 1;
			frameDown = 0;
		}
		soundButton = game.add.button(
				constants.BACKGROUND_WIDTH + 
				0.5*constants.TASKBAR_WIDTH,
				0.25*constants.TASKBAR_HEIGHT, 
				'soundButton',
				actionOnClickMute, this, frameUp, 
				frameUp, frameDown);
		soundButton.anchor={'x':0.5,'y':0};
		taskBarButtons.push(soundButton);
		//Help button
		var helpButton = game.add.button(
				constants.BACKGROUND_WIDTH +
				0.5 * constants.TASKBAR_WIDTH,
				0.45*constants.TASKBAR_HEIGHT,
				'buttonHelp', help);
		helpButton.anchor={'x':0.5,'y':0};
		taskBarButtons.push(helpButton);
		//Restart button
		var restartButton = game.add.button(
				constants.BACKGROUND_WIDTH +
				0.5 * constants.TASKBAR_WIDTH,
				0.65 * constants.TASKBAR_HEIGHT,
				'buttonRestart', 
				actionOnClickRestart);
		restartButton.anchor={'x':0.5,'y':0};
		//Main Menu button
		mainMenuButton = game.add.button(
				constants.BACKGROUND_WIDTH +
				0.5 * constants.TASKBAR_WIDTH,
				0.8*constants.TASKBAR_HEIGHT, 
				'mainMenuButton', actionOnClickMainMenu,
				this, 0, 0, 1);
		mainMenuButton.anchor = {'x':0.5,'y':0};
	}else{
		//TaskBar
		taskBarSprite = blockGroups.simple.create(0,
				constants.BACKGROUND_HEIGHT,'taskBar');
		//Info in taskbar
		textScore = game.add.text(constants.MARGIN_TASKBAR,
				constants.BACKGROUND_HEIGHT+
				constants.MARGIN_TASKBAR,
				"Moves : 0",
				{font: constants.FONT_TASKBAR.STYLE});
		if(!tutorial){
			textLevel = game.add.text(constants.MARGIN_TASKBAR,
					constants.BACKGROUND_HEIGHT+
					constants.TASKBAR_HEIGHT-
					constants.MARGIN_TASKBAR,
					"Level : "+levelStruct.currentLevel,
					{font: constants.FONT_TASKBAR.STYLE});
			textLevel.anchor={'x':0,'y':1};
		} else {
			textLevel = game.add.text(constants.MARGIN_TASKBAR,
					constants.BACKGROUND_HEIGHT+
					constants.TASKBAR_HEIGHT-
					constants.MARGIN_TASKBAR,
					"Tutorial : "+
					tutoStruct.currentLevelTuto,
					{font: constants.FONT_TASKBAR.STYLE});
			textLevel.anchor={'x':0,'y':1};
		}
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
				constants.MARGIN_TASKBAR, 'soundButton',
				actionOnClickMute, this, frameUp, 
				frameUp, frameDown)
			taskBarButtons.push(soundButton);
		//Help button
		taskBarButtons.push(game.add.button(0.45*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR, 
					'buttonHelp', help));
		//Restart button
		taskBarButtons.push(game.add.button(0.6*
					constants.TASKBAR_WIDTH,
					constants.BACKGROUND_HEIGHT+
					constants.MARGIN_TASKBAR, 
					'buttonRestart', actionOnClickRestart));
		//Main Menu button
		mainMenuButton = game.add.button(0.8*
				constants.TASKBAR_WIDTH,
				constants.BACKGROUND_HEIGHT+
				constants.MARGIN_TASKBAR, 
				'mainMenuButton', actionOnClickMainMenu,
				this, 0, 0, 1);
	}

	game.physics.enable(taskBarSprite,Phaser.Physics.ARCADE);
	taskBarSprite.body.immovable=true;

	//Init help
	initializeHelpScreen();
	helpClose();

	//

	createLevel();

	//Controller
	controller = game.input.keyboard.createCursorKeys();
	playing = true;
} 

/** Display the main menu.
 * NB : playing must be false.
 */ 
function createMenu()
{
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
	buttonTutorial = game.add.button(
			0.5*constants.BACKGROUND_WIDTH,
			0.75*constants.BACKGROUND_HEIGHT,
			'buttonTutorial', 
			actionOnClickTutorial,this, 1, 0, 2);
	buttonTutorial.anchor={'x':0.5,'y':0.5};
}

/** Display the screen for level selection at the correct page.
 */
function createSelectLevel()
{
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
		if (levelStruct.numPageCourant != 1){
			buttonArrowLeft = game.add.button(
					constants.BACKGROUND_WIDTH + 
					0.5*constants.TASKBAR_WIDTH,
					0.25*constants.TASKBAR_HEIGHT,
					'prevPage',
					actionOnClickArrowLeft, this);
			buttonArrowLeft.anchor = {'x':0.5,'y':0.5};
		}
		// Next page button
		if (levelStruct.numPageCourant != levelStruct.nbrPageTotal){
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
		if (levelStruct.numPageCourant != 1){
			buttonArrowLeft = game.add.button(
					0.25*constants.TASKBAR_WIDTH, 
					constants.BACKGROUND_HEIGHT + 
					(constants.TASKBAR_HEIGHT) / 2,
					'prevPage', 
					actionOnClickArrowLeft, this);
			buttonArrowLeft.anchor = {'x':0.5,'y':0.5};
		}
		// Next page button
		if (levelStruct.numPageCourant != levelStruct.nbrPageTotal){
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
	for (var i = (levelStruct.numPageCourant - 1) * 9 + 1; 
			i <= Math.min(levelStruct.numPageCourant * 9,
				levelStruct.nbrLevel); 
			i++)
	{
		if (i <= levelStruct.nbrLevelAccessible){
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
}
