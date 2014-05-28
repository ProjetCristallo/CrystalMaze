var game = new Phaser.Game(600,480,Phaser.AUTO,'', {preload:preload,create:create,update:update});

var Ball;
var BallMoving;
var BallSpeed = 1000;
var breakableBlocks;
var endBlocks;
var holeBlocks;

var endTile;
var endSprite;

var EndScreen;
var endButton;
//Boolean indicating if the player hasn't won yet.
var playing=true;


//variable indicating what the last direction taken was.
var lastDir;

// Blocks groups
var Hole = group();
var Simple = group();
var Unilateral = group();
var Fragile = group();
var C_up = group();
var C_down = group();
var C_left = group();
var C_right = group();


function preload() {
	game.load.image('logo','ressources/Bille.png');
	game.load.image('Fond','ressources/Fond.png');
	game.load.image('Simple','ressources/Block_Noir.png');
	game.load.image('Simple','ressources/Block_Noir.png');
	game.load.image('c_up','ressources/Change_up.png');
	game.load.image('c_down','ressources/Change_down.png');
	game.load.image('c_right','ressources/Change_right.png');
	game.load.image('c_left','ressources/Change_left.png');
	game.load.image('Star','ressources/Star.png');
	game.load.image('Hole','ressources/Hole.png');
	game.load.image('Win','ressources/Win.png');
	game.load.spritesheet('button','ressources/button_sprite_sheet.png',193,71);
}
