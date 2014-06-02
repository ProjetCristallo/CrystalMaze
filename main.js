var game = new Phaser.Game(BACKGROUND_HEIGHT,BACKGROUND_WIDTH,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var Ball;
var BallMoving;

var endTile;
var endSprite;

var EndScreen;
var blop = false;

//Boolean indicating if the player hasn't won yet.
var playing=true;
var ballAnimation;

var current_level = 1;

//variable indicating what the last direction taken was.
var lastDir;

// Blocks groups
var Hole;
var Simple;
var Unilateral;
var Breakable;
var C_up;
var C_down;
var C_left;
var C_right;
var Begin;
var End;
var Item;
var listItem;
var score;

function preload() {
	game.load.image('ball','ressources/Bille.png');
	game.load.image('Fond','ressources/Fond.png');
	game.load.image('breakable','ressources/Breakable.png');
	game.load.image('Simple','ressources/Block_Noir.png');
	game.load.image('c_up','ressources/Change_up.png');
	game.load.image('c_down','ressources/Change_down.png');
	game.load.image('c_right','ressources/Change_right.png');
	game.load.image('c_left','ressources/Change_left.png');
	game.load.image('End','ressources/Star.png');
	game.load.image('Hole','ressources/Hole.png');
	game.load.image('Win','ressources/Win.png');
        game.load.image('u_r','ressources/unilateral_right.png');
        game.load.image('u_u','ressources/unilateral_up.png');
        game.load.image('u_d','ressources/unilateral_down.png');
        game.load.image('u_l','ressources/unilateral_left.png');
        game.load.image('C','ressources/C.png');
        game.load.image('G','ressources/G.png');
        game.load.image('T','ressources/T.png');
        game.load.image('pause', 'ressources/pause.png');
        game.load.image('pauseMenu', 'ressources/pauseMenu.png');
        game.load.image('title', 'ressources/title.png');
        game.load.image('mainMenu', 'ressources/MainMenu.png');

        game.load.spritesheet('button1', 'ressources/Button_Jouer.png',163,55);
	game.load.spritesheet('button','ressources/Button.png',249,36);
        game.load.spritesheet('button2','ressources/Button_rejouer.png',140,35);
}
