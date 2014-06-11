readConstants("conf.yaml");

var game = new Phaser.Game(BACKGROUND_WIDTH,BACKGROUND_HEIGHT+ TASKBAR_HEIGHT,Phaser.AUTO,'', {preload:preload,create:create,update:update});

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


var progressPageLoaded = false;
var progressInfo =null;
function updateProgressBar(){
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
    game.load.image('mainMenuSprite', 'ressources/MainMenu.png');
    game.load.image('title', 'ressources/title.png');

	
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
	game.load.spritesheet('stars', 'ressources/Star.png',100,25);

	
	game.load.onFileComplete.add(updateProgressBar, this);

    while (doesFileExist("levels/"+nbrLevel+".txt")){
		nbrLevel++;
	}
	nbrLevel--;
	nbrPageTotal = parseInt(1 + (nbrLevel - 1) / 9);
        //alert(nbrPageTotal);

    //Number of levels already unblocked
    nbrLevelAccessible = readCookie("levelmax");
    if (nbrLevelAccessible == "") {
    	nbrLevelAccessible = 1;
    }
    //Cookie containing the scores for each level 
    createCookie("stars", "", 30);
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
