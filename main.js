var game = new Phaser.Game(BACKGROUND_WIDTH,BACKGROUND_HEIGHT+ TASKBAR_HEIGHT,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var ball;

var taskBarSprite;

var endTile;
var endSprite;

var endScreen;
var mainMenu = true;

//Last direction the ball has taken, useful for the turn blocks
var lastDir=null;

var selectLevelMenu = false;

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
var nbrLevelAccessible;
var numPageCourant = 1;
var nbrPageTotal = 1;
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

function updateProgressBar(){
	progressInfo.text = game.load.progress+" %";
};

function preload(){

	game.load.image('mainMenuSprite', 'ressources/MainMenu.png');
	game.load.image('title', 'ressources/title.png');
}


function doesFileExist(urlToFile)
{
	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', urlToFile, false);
	xhr.send();
	if (xhr.status == "200") {
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
