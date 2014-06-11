loadNeeded = true;

function create() {
	if(loadNeeded){
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.sprite(11, 50, 'title');
		progressInfo = game.add.text(250,300,"0 %",{ font: "65px Arial", align: "center" });


		game.load.image('taskBar','ressources/taskBar.png');
		game.load.image('fond','ressources/Fond.png');
		game.load.image('simple','ressources/Simple.png');
		game.load.image('cUp','ressources/Change_up.png');
		game.load.image('cDown','ressources/Change_down.png');
		game.load.image('cRight','ressources/Change_right.png');
		game.load.image('cLeft','ressources/Change_left.png');
		game.load.image('end','ressources/diamond.png');

		game.load.image('hole','ressources/Hole.png');
		game.load.image('win','ressources/Win.png');
		game.load.image('fail','ressources/Fail.png');
		game.load.image('levelInaccessible', 'ressources/menuLevelInaccessible.png');
		game.load.image('endScreen','ressources/endScreen.png');
		game.load.image('uniRight','ressources/unilateral_right.png');
		game.load.image('uniUp','ressources/unilateral_up.png');
		game.load.image('uniDown','ressources/unilateral_down.png');
		game.load.image('uniLeft','ressources/unilateral_left.png');
		game.load.image('C','ressources/C.png');
		game.load.image('H','ressources/H.png');
		game.load.image('O','ressources/O.png');
		game.load.image('pause', 'ressources/pause.png');
		game.load.image('pauseMenu', 'ressources/pauseMenu.png');
		game.load.image('title', 'ressources/title.png');

		game.load.image('pauseButtonAide','ressources/ButtonAide.png');
		game.load.image('pauseButtonMenu','ressources/pauseButtonMenu.png');
		game.load.image('pauseButtonParametres','ressources/ButtonParametres.png');
		game.load.image('pauseButtonRestart','ressources/ButtonRestart.png');

		game.load.image('mainMenuSprite', 'ressources/MainMenu.png');
		game.load.image('turnUL','ressources/turn_ul.png');
		game.load.image('turnUR','ressources/turn_ur.png');
		game.load.image('turnDL','ressources/turn_dl.png');
		game.load.image('turnDR','ressources/turn_dr.png');
		game.load.image('energyUp','ressources/Energy_Up.png');
		game.load.image('energyDown','ressources/Energy_Down.png');
		game.load.image('porous', 'ressources/porous.png');
		game.load.image('helpScreen1','ressources/helpScreen1.png');
		game.load.image('helpScreen2','ressources/helpScreen2.png');
		game.load.image('nextPage', 'ressources/ArrowRight.png');
		game.load.image('prevPage', 'ressources/ArrowLeft.png');
		game.load.image('levelA', 'ressources/levelAccessible.png');
		game.load.image('levelI', 'ressources/levelInaccessible.png');
		game.load.image('cross', 'ressources/Cross.png');

		game.load.spritesheet('breakable','ressources/Breakable.png',60,60);
		game.load.spritesheet('salt','ressources/Salt.png',60,60);
		game.load.spritesheet('ball','ressources/balle.png',60,60);
		game.load.spritesheet('buttonPlay', 'ressources/Button_Jouer.png',163,55);
		game.load.spritesheet('buttonSelectLevel', 'ressources/ButtonSelectLevel.png', 206, 32);
		game.load.spritesheet('buttonReturn', 'ressources/ButtonReturn.png', 125, 32);
		game.load.spritesheet('buttonNextLevel','ressources/Button_next_level.png',249,36);
		game.load.spritesheet('buttonReplay','ressources/Button_rejouer.png',140,35);
		game.load.spritesheet('buttonRestart','ressources/Button_restart.png',138,29);
		game.load.spritesheet('buttonNextImage','ressources/buttonNextImage.png',25,50);
		game.load.spritesheet('buttonPrevImage','ressources/buttonPrevImage.png',25,50);
		game.load.spritesheet('buttonCloseImage','ressources/buttonCloseImage.png',35,35);

		game.load.start();

		game.load.onFileComplete.add(updateProgressBar, this);

		while (doesFileExist("levels/"+nbrLevel+".txt")){
			nbrLevel++;
		}
		nbrLevel--;
		nbrPageTotal = parseInt(1 + (nbrLevel - 1) / 9);
		//alert(nbrPageTotal);

		//Number of levels already unblocked
		cookie = document.cookie;
		nameEQ = 'levelmax=';
		nbrLevelAccessible = cookie.substring(nameEQ.length, cookie.length);
		if (nbrLevelAccessible == "") {
			nbrLevelAccessible = 1;
		}
		loadNeeded = false;
		game.load.onLoadComplete.add(createMenu);
	} else {
		createMenu();
	}
}
function createMenu()
{
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
			numSprite++;
		}
	} else {
		alert("problem : menu selection ... (create.js)");
	}
}
