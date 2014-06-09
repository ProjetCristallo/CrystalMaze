var game = new Phaser.Game(BACKGROUND_WIDTH,BACKGROUND_HEIGHT+ TASKBAR_HEIGHT,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var ball;

var taskBarSprite;

var endTile;
var endSprite;

var endScreen;
var mainMenu = true;

<<<<<<< HEAD
var selectLevelMenu = false;

=======
//Last direction the ball has taken, useful for the turn blocks
var lastDir=null;

var selectLevelMenu = false;
>>>>>>> 821af20d4c821a593499e712638dca05e148e473

//Button and screen used for displaying help.
var helpScreens = new Array();
var buttonNext;
var buttonPrev;
var posInHelp;
var posText;
var helpText;
var helpOnItem;


//Boolean indicating if the player hasn't won yet.
var playing=true;

var nbrLevel = 1;
<<<<<<< HEAD
var nbrLevelAccessible = 1;
var numPageCourant = 1;
var nbrPageTotal = 1;
=======
var numPageCourant = 1;
var nbrPageTotal = 5;
>>>>>>> 821af20d4c821a593499e712638dca05e148e473
var currentLevel = 1;

//Function called when the user uses his finger
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

function preload() {
	game.load.image('taskBar','ressources/taskBar.png');
	game.load.image('fond','ressources/Fond.png');
	game.load.image('simple','ressources/Block_Noir.png');
	game.load.image('cUp','ressources/Change_up.png');
	game.load.image('cDown','ressources/Change_down.png');
	game.load.image('cRight','ressources/Change_right.png');
	game.load.image('cLeft','ressources/Change_left.png');
	game.load.image('end','ressources/diamond.png');
	game.load.image('hole','ressources/Hole.png');
	game.load.image('win','ressources/Win.png');
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
	game.load.image('pauseButtonMenu','ressources/ButtonMenu.png');
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


	game.load.spritesheet('breakable','ressources/Breakable.png',60,60);
	game.load.spritesheet('salt','ressources/Salt.png',60,60);
	game.load.spritesheet('ball','ressources/balle.png',60,60);
	game.load.spritesheet('buttonPlay', 'ressources/Button_Jouer.png',163,55);
	game.load.spritesheet('buttonSelectLevel', 'ressources/ButtonSelectLevel.png', 206, 32);
	game.load.spritesheet('buttonReturn', 'ressources/ButtonReturn.png', 125, 32);
	game.load.spritesheet('buttonNextLevel','ressources/Button_next_level.png',249,36);
	game.load.spritesheet('buttonReplay','ressources/Button_rejouer.png',140,35);
	game.load.spritesheet('buttonRestart','ressources/Button_restart.png',138,29);


	while (doesFileExist("levels/"+nbrLevel+".txt")){
		nbrLevel++;
	}
	nbrLevel--;
	// nbrPageTotal = parseInt(1 + (nbrLevel - 1) / 9);
	//alert(nbrPageTotal);
	game.load.spritesheet('buttonNextImage','ressources/buttonNextImage.png',25,50);
	game.load.spritesheet('buttonPrevImage','ressources/buttonPrevImage.png',25,50);
	game.load.spritesheet('buttonCloseImage','ressources/buttonCloseImage.png',35,35);

}


function doesFileExist(urlToFile)
{
<<<<<<< HEAD
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
=======
	try{
		var xhr = new XMLHttpRequest();
		xhr.open('HEAD', urlToFile, false);
		xhr.send();
		return true;
	}catch(e){
		return false;
	}
>>>>>>> 821af20d4c821a593499e712638dca05e148e473
}
