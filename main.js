if(constants.USE_CORDOVA){
	var game = new Phaser.Game(constants.BACKGROUND_WIDTH + 
			constants.TASKBAR_WIDTH, constants.BACKGROUND_HEIGHT,
			Phaser.AUTO, '', {preload:preload,create:create,
				update:update});
	console.log("use.phonegap = true");
}else{
	var game = new Phaser.Game(constants.BACKGROUND_WIDTH,
			constants.BACKGROUND_HEIGHT + constants.TASKBAR_HEIGHT,
			Phaser.AUTO,'', {preload:preload,create:create,
				update:update});
	console.log("use phonegap = false");
}
var ball;
var taskBarSprite;
var endTile;
var endSprite;
var endScreen;

//Booleans indicating game's state
var mainMenu = true;
var selectLevelMenu = false;

//Last direction the ball has taken, useful for the turn blocks
var lastDir=null;

//Scores to get two or three stars
var twoStars;
var threeStars;

//Button and screen used for displaying help.
var helpScreens = new Array();
var buttonNext;
var buttonPrev;
var posInHelp;
var posText;
var helpText;
var helpOnItem;

//Boolean indicating if the player is allowed to play.
var playing=true;

//Levels
var nbrLevel = 1;
var nbrLevelAccessible;
var numPageCourant = 1;
var nbrPageTotal = 1;
var currentLevel = 1;

//Swipe handling
var element = document.body;
var swipe = null;
Hammer(element).on("swipeleft", function(event) {
	swipe='left';
});
Hammer(element).on("swiperight", function(event) {
	swipe='right';
});
Hammer(element).on("swipedown", function(event) {
	swipe='down';
});
Hammer(element).on("swipeup", function(event) {
	swipe='up';
});

// Blocks groups
var hole;
var simple;
var unilateral;
var breakable;
var salt;
var porous;
var cUp;
var cDown;
var cLeft;
var cRight;
var begin;
var end;
var item;
var listItem;
var score;
var turn;

//Music volume
var mute = 0;

var progressPageLoaded = false;
var progressInfo =null;
function updateProgress(){
	if(progressInfo==null){
		progressInfo = game.add.text(250,300,"0 %",{ font: "65px Arial", align: "center" });
	}
	if(!progressPageLoaded && game.cache.checkImageKey('mainMenuSprite') && game.cache.checkImageKey('title')) {
		mainMenuSprite = game.add.sprite(0, 0, 'mainMenuSprite');
		title = game.add.sprite(11, 50, 'title');
		progressInfo = game.add.text(250,300,"0 %",{ font: "65px Arial", align: "center" });
		progressPageLoaded = true;
	}
	progressInfo.text = game.load.progress+" %";
};

function preload(){
	game.load.image('mainMenuSprite',constants.mainMenuSpriteUrl);
	game.load.image('title',constants.titleUrl);

	game.load.image('pauseButtonAide',constants.pauseButtonAideUrl);
	game.load.image('pauseButtonMenu',constants.pauseButtonMenuUrl);
	game.load.image('pauseButtonMute',constants.pauseButtonMuteUrl);
	game.load.image('pauseButtonRestart',constants.pauseButtonRestartUrl);

	if(constants.USE_CORDOVA){
		game.load.image('taskBar',constants.taskBarSmartphoneUrl);
	}else{
		game.load.image('taskBar',constants.taskBarUrl);
	}
	game.load.image('fond',constants.fondUrl);
	game.load.image('simple',constants.simpleUrl);
	game.load.image('cUp',constants.cUpUrl);
	game.load.image('cDown',constants.cDownUrl);
	game.load.image('cRight',constants.cRightUrl);
	game.load.image('cLeft',constants.cLeftUrl);
	game.load.image('end',constants.endUrl);

	game.load.image('hole',constants.holeUrl);
	game.load.image('win',constants.winUrl);
	game.load.image('fail',constants.failUrl);
	game.load.image('levelInaccessible',constants.levelInaccessibleUrl);
	game.load.image('endScreen',constants.endScreenUrl);
	game.load.image('uniRight',constants.uniRightUrl);
	game.load.image('uniUp',constants.uniUpUrl);
	game.load.image('uniDown',constants.uniDownUrl);
	game.load.image('uniLeft',constants.uniLeftUrl);
	game.load.image('C',constants.CUrl);
	game.load.image('H',constants.HUrl);
	game.load.image('O',constants.OUrl);
	game.load.image('pause',constants.pauseUrl);
	game.load.image('pauseMenu',constants.pauseMenuUrl);
	game.load.image('title',constants.titleUrl);

	game.load.image('pauseButtonAide',constants.pauseButtonAideUrl);
	game.load.image('pauseButtonMenu',constants.pauseButtonMenuUrl);
	game.load.image('pauseButtonParametres',constants.pauseButtonParametresUrl);
	game.load.image('pauseButtonRestart',constants.pauseButtonRestartUrl);
	game.load.image('pauseButtonMute', constants.pauseButtonMuteUrl);
	game.load.image('soundOn', constants.soundOnUrl);
	game.load.image('soundOff', constants.soundOffUrl);

	game.load.image('turnUL',constants.turnULUrl);
	game.load.image('turnUR',constants.turnURUrl);
	game.load.image('turnDL',constants.turnDLUrl);
	game.load.image('turnDR',constants.turnDRUrl);
	game.load.image('energyUp',constants.energyUpUrl);
	game.load.image('energyDown',constants.energyDownUrl);
	game.load.image('porous',constants.porousUrl);
	game.load.image('helpScreen1',constants.helpScreen1Url);
	game.load.image('helpScreen2',constants.helpScreen2Url);
	game.load.image('nextPage',constants.nextPageUrl);
	game.load.image('prevPage',constants.prevPageUrl);
	game.load.image('levelA',constants.levelAUrl);
	game.load.image('levelI',constants.levelIUrl);
	game.load.image('cross',constants.crossUrl);

	game.load.spritesheet('breakable',constants.breakableUrl,60,60);
	game.load.spritesheet('salt',constants.saltUrl,60,60);
	game.load.spritesheet('ball',constants.ballUrl,60,60);
	game.load.spritesheet('buttonPlay',constants.buttonPlayUrl,163,55);
	game.load.spritesheet('buttonSelectLevel',constants.buttonSelectLevelUrl, 206, 32);
	game.load.spritesheet('buttonReturn',constants.buttonReturnUrl, 125, 32);
	game.load.spritesheet('buttonNextLevel',constants.buttonNextLevelUrl,249,36);
	game.load.spritesheet('buttonReplay',constants.buttonReplayUrl,140,35);
	game.load.spritesheet('buttonRestart',constants.buttonRestartUrl,138,29);	
	game.load.spritesheet('buttonNextImage',constants.buttonNextImageUrl,25,50);
	game.load.spritesheet('buttonPrevImage',constants.buttonPrevImageUrl,25,50);
	game.load.spritesheet('buttonCloseImage',constants.buttonCloseImageUrl,35,35);
	game.load.spritesheet('stars',constants.starsUrl,100,25);
	//Sounds
	game.load.audio('salted',constants.saltSoundUrl); 
	game.load.audio('block',constants.blockSoundUrl); 
	game.load.audio('glass', constants.glassSoundUrl );
	game.load.audio('drop', constants.dropSoundUrl );
	game.load.audio('gaz', constants.gazSoundUrl );
	
	//TaskBar buttons
	game.load.spritesheet('soundButton', 'ressources/soundButton.png', 80, 80);
	game.load.image('questionMark', 'ressources/questionMark.png',80,80);
	game.load.image('simpleRestart', 'ressources/simpleRestart.png',80,80);
	
	game.load.onFileComplete.add(updateProgress, this);

	var valueOk = loadValueOk("levels/"+1+".txt");

	while (doesFileExist("levels/"+nbrLevel+".txt",valueOk) && nbrLevel < 500){
		nbrLevel++;
	}
	if(nbrLevel == 500){
		nbrLevel = 0;
	}else{
		nbrLevel--;
	}
	nbrPageTotal = parseInt(1 + (nbrLevel - 1) / 9);
	//alert(nbrPageTotal);

	//Number of levels already unblocked
	if(constants.USE_CORDOVA){
		stars = window.localStorage.getItem("cookieSmartphone");
		if(stars == null){
			nbrLevelAccessible=1;
		}else{
			nbrLevelAccessible = stars.length+1;
		}
	}else{
		nbrLevelAccessible = readCookie("levelmax");
		if (nbrLevelAccessible == null) {
			nbrLevelAccessible = 1;
		}
	}	
	//Cookie containing the scores for each level 
	if(constants.USE_CORDOVA){
		stars = window.localStorage.getItem("cookieSmartphone");
		if(stars == null){
			window.localStorage.setItem("cookieSmartphone","");
		}
	}else{
		stars = readCookie("stars");
		if (stars == null) {
			createCookie("stars", "", 30);
		}
	}
}


function loadValueOk(filename)
{
	if(document.all) {
		var xhr = new ActiveXObject("Scripting.FileSystemObject");
	}
	else
	{
		var xhr = new XMLHttpRequest();
	}
	//var xhr = new XMLHttpRequest();
	xhr.open('HEAD', filename, false);
	xhr.send();
	return xhr.status;
}

function doesFileExist(urlToFile, valueOk)
{
	if(document.all) {
		var xhr = new ActiveXObject("Scripting.FileSystemObject");
	}
	else
	{
		var xhr = new XMLHttpRequest();
	}
	//var xhr = new XMLHttpRequest();
	xhr.open('HEAD', urlToFile, false);
	xhr.send();
	if (xhr.status == valueOk) {
		return true;
	} else {
		return false;
	}
	/*	try{
		var xhr = new XMLHttpRequest();
		xhr.open('HEAD', urlToFile, false);
		xhr.send();
		return true;
		}catch(e){
		return false;
		}
	 */
}
