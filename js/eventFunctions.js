/* Return a boolean to signal if the ball and block are close enough to use 
 * the following functions */
function hardOverlap(ball,block)
{
	return ((Math.abs(ball.body.x-block.body.x) < constants.TILE_SIZE/2) &&
			(Math.abs(ball.body.y-block.body.y) < 
			 constants.TILE_SIZE/2));
}

/** Handles the end of a level (ie when the ball overlaps the diamond) :
 * Displays the screen "you have won", the buttons "play again" 
 * and "next level", and the number of stars won.
 * Also updates cookies.
 * @param {sprite} ball The moving ball from the world.
 * @param {sprite} endSprite The diamond.
 */
function endLevel(ball, endSprite)
{
	// Force ball and endSprite to be closer than a classic overlap
	if(!hardOverlap(ball,endSprite)){
		return;
	}
	if (!tutorial && levelStruct.currentLevel == levelStruct.nbrLevel) {
		endGame(ball, endSprite);
	} else if (tutorial && tutoStruct.currentLevelTuto == tutoStruct.nbrLevelTuto){
		endTuto(ball, endSprite);
	} else {
		playing = false;
		ball.body.velocity.x=0;
		ball.body.velocity.y=0;
		endSprite.kill();
		endScreen = game.add.sprite(constants.END_SCREEN.OFFSET.X,
				constants.END_SCREEN.OFFSET.Y, 'win');
		button = game.add.button(constants.END_SCREEN.OFFSET.X+
				constants.END_SCREEN.BUTTONS_OFFSET.X,
				constants.END_SCREEN.OFFSET.Y+
				constants.END_SCREEN.BUTTONS_OFFSET.Y,
				'buttonNextLevel', actionOnClickNextLevel,
				this, 2,1,0);
		button2 = game.add.button(constants.END_SCREEN.OFFSET.X+
				constants.END_SCREEN.BUTTONS_OFFSET.X,
				constants.END_SCREEN.OFFSET.Y+
				constants.END_SCREEN.BUTTONS_OFFSET.Y+
				constants.END_SCREEN.BUTTONS_MARGIN,
				'buttonReplay', actionOnClickRestart, 
				this, 2,1,0);
		if (!tutorial){
			stars = game.add.sprite(constants.END_SCREEN.OFFSET.X+
					constants.END_SCREEN.BUTTONS_OFFSET.X,
					constants.END_SCREEN.OFFSET.Y+
					constants.END_SCREEN.STARS_MARGIN,
					'stars');

			//We check the number of stars to light on
			var nbrStars;
			stars.animations.frame++;
			nbrStars = 1;
			if (score <= starsNumber[0]) {
				stars.animations.frame++;
				nbrStars = 2;
				if (score <= starsNumber[1]) {
					stars.animations.frame++;
					nbrStars = 3;
				}
			}
			updateCookieStars(nbrStars);

			//We update the number of unblocked levels	
			if ((levelStruct.currentLevel + 1 > 
						levelStruct.nbrLevelAccessible) && 
					(levelStruct.currentLevel + 1 <= 
					 levelStruct.nbrLevel))
			{
				levelStruct.nbrLevelAccessible = 
					levelStruct.currentLevel + 1;
				updateCookieNbrLevel(levelStruct.nbrLevelAccessible);	
			}
		}
	}	
}

/** Handles the end of the game (end of the last level) :
 * Displays the screen "you have won" and the button "play again" 
 * Also updates cookies.
 * @param {sprite} ball The moving ball from the world.
 * @param {sprite} endSprite The diamond.
 */
function endGame(ball, endSprite) {
	endSprite.kill();
	playing = false;
	ball.body.velocity.x=0;
	ball.body.velocity.y=0;
	endScreen = game.add.sprite(0, 0, 'endScreen');
	button2 = game.add.button(constants.END_SCREEN.OFFSET.X+
			constants.END_SCREEN.BUTTONS_OFFSET.X,
			constants.END_SCREEN.OFFSET.Y+
			constants.END_SCREEN.BUTTONS_OFFSET.Y,
			'buttonReplay', actionOnClickRestart, this, 2,1,0);
	stars = game.add.sprite(constants.END_SCREEN.OFFSET.X+
			constants.END_SCREEN.BUTTONS_OFFSET.X,
			constants.END_SCREEN.OFFSET.Y+
			constants.END_SCREEN.STARS_MARGIN,
			'stars');
	//We check the number of stars to light on
	var nbrStars;
	stars.animations.frame++;
	nbrStars = 1;
	if (score <= starsNumber[0]) {
		stars.animations.frame++;
		nbrStars = 2;
		if (score <= starsNumber[1]) {
			stars.animations.frame++;
			nbrStars = 3;
		}
	}
	updateCookieStars(nbrStars);

	//We update the number of unblocked levels	
	levelStruct.nbrLevelAccessible = levelStruct.currentLevel + 1;
	updateCookieNbrLevel(levelStruct.nbrLevelAccessible);	
}

/** Handles the end of the tutorial (last level of the tutorial) :
 * Displays the screen "tutorial finished" and the button "play again" 
 * @param {sprite} ball The moving ball from the world.
 * @param {sprite} endSprite The diamond.
 */
function endTuto(ball, endSprite)
{
	endSprite.kill();
	playing = false;
	ball.body.velocity.x=0;
	ball.body.velocity.y=0;

	endScreenTuto = game.add.sprite(0, 0, 'endScreenTuto');
}

/** Handles the end of the level, when lost :
 * Displays the screen "you lost" and the button "play again" 
 * @param {sprite} ball The moving ball from the world.
 * @param {sprite} endSprite The diamond.
 */
function loseGame() {
	playLostSound()
	playing = false;
	ball.body.velocity.x=0;
	ball.body.velocity.y=0;
	endScreen = game.add.sprite(constants.END_SCREEN.OFFSET.X,
			constants.END_SCREEN.OFFSET.Y,'fail');
	button = game.add.button(constants.END_SCREEN.OFFSET.X+
			constants.END_SCREEN.BUTTONS_OFFSET.X,
			constants.END_SCREEN.OFFSET.Y+
			constants.END_SCREEN.BUTTONS_OFFSET.Y,
			'buttonReplay', actionOnClickRestart, 
			this, 2,1,0);
}

/** Handles a click on the main menu button :
 * Displays the screen "are you sure you want to go back
 * to the main menu ?" and the buttons "yes" and "no".
 * if yes : return to the main menu.
 * if no : resume game.
 */
function actionOnClickMainMenu() {
	playing = false;
	ball.body.velocity.x = 0;
	ball.body.velocity.y = 0;
	var areYouSure = game.add.sprite(constants.END_SCREEN.OFFSET.X,
			constants.END_SCREEN.OFFSET.Y,'areYouSure');
	var yes = game.add.button(constants.END_SCREEN.OFFSET.X+
			constants.END_SCREEN.BUTTONS_OFFSET.X,
			constants.END_SCREEN.OFFSET.Y+
			constants.END_SCREEN.BUTTONS_OFFSET.Y,'yes', actionOnClickMenu);
	var no = game.add.button(constants.END_SCREEN.OFFSET.X+
			constants.END_SCREEN.BUTTONS_OFFSET.X,
			constants.END_SCREEN.OFFSET.Y+
			constants.END_SCREEN.BUTTONS_OFFSET.Y+
			constants.END_SCREEN.BUTTONS_MARGIN,'no', function() {
				areYouSure.destroy();
				yes.destroy();
				no.destroy();
				playing = true;
			});
}

/** Returns to the main menu.
 */
function actionOnClickMenu() {
	playing=false;
	game.world.removeAll(true);
	levelStruct.currentLevel = 1;
	tutoStruct.currentLevelTuto = 1;
	createMenu();
}

/** Restarts the current level.
 */
function actionOnClickRestart(){
	game.world.removeAll(true);
	generateLevel();
}

/** Moves on to the next level
 */
function actionOnClickNextLevel()
{
	if(!tutorial){
		levelStruct.currentLevel = levelStruct.currentLevel + 1;
		textLevel.setText("Level " + levelStruct.currentLevel);
	} else {
		tutoStruct.currentLevelTuto++;
		textLevel.setText("Tutorial " + tutoStruct.currentLevelTuto);
	}
	game.world.removeAll(true);
	generateLevel();
}

/** Starts the first level
 */
function actionOnClickPlay()
{
	tutorial = false;
	game.world.removeAll(true);
	generateLevel();
}

/** Displays the select level menu
 */
function actionOnClickSelectLevel()
{
	tutorial = false;
	game.world.removeAll(true);
	createSelectLevel();
}

/** Starts the first tutorial level
 */
function actionOnClickTutorial()
{
	tutorial = true;
	game.world.removeAll(true);
	generateLevel();
}

/** Returns to the main menu (when in select level menu)
 */
function actionOnClickReturn()
{
	levelStruct.numPageCourant = 1;
	game.world.removeAll(true);
	createMenu();
}

/** Moves on to the next select level page
 */
function actionOnClickArrowRight()
{
	levelStruct.numPageCourant++;
	game.world.removeAll(true);
	createSelectLevel();
}

/** Moves on to the previous select level page
 */
function actionOnClickArrowLeft()
{
	levelStruct.numPageCourant--;
	game.world.removeAll(true);
	createSelectLevel();
}

/** Starts the level corresponding to the button clicked on.
 * @ param button A button representing an accessible level.
 */
function actionOnClickLevelAccessible(button)
{
	levelStruct.numPageCourant = 1;
	game.world.removeAll(true);
	levelStruct.currentLevel = button.name;
	generateLevel();
}

/** Handles a click on a blocked level :
 * Displays the screen "you haven't unblocked this level yet"
 * and a cross to close this screen.
 * @ param button A button representing a blocked level.
 */
function actionOnClickLevelInaccessible(button)
{
	screenLevelError = game.add.sprite(0, 0, 'levelInaccessible');
	cross = game.add.sprite(constants.BACKGROUND_WIDTH,0,'buttonCloseImage');
	cross.anchor={'x':1,'y':0};
	cross.inputEnabled = true;
	screenLevelError.inputEnabled = true;
	screenLevelError.events.onInputDown.add(function() {
		cross.kill();
		screenLevelError.kill();
	},this);
	cross.events.onInputDown.add(function() {
		cross.kill();
		screenLevelError.kill();
	},this);
}


/** Called in case of collision between the ball 
 * and a simple block. 
 * (nothing needs to be done)
 */
function normalBlockCollide()
{
}

/** Called in case of overlap between the ball 
 * and a hole : if the ball isn't in gaseous state, 
 * the level is lost.
 * @ param ball The ball.
 * @ param holeSprite The hole.
 */
function holeOverlap(ball, holeSprite)
{
	if (ball.name != "steam" && hardOverlap(ball,holeSprite)){
		loseGame();
	}
}

/** Called in case of collision between the ball 
 * and a breakable block : if the ball is in solid state, 
 * the block is damaged.
 * @ param ball The ball.
 * @ param breakBlock The breakable block.
 */
function breakBlockCollide(ball, breakBlock)
{
	if (ball.name == "ice") {
		playGlassSound();
		breakBlock.damage(1);
		breakBlock.animations.frame++;
	} else {
		playBlockedSound();
	}
}

/** Called in case of collision between the ball 
 * and a salt block : if the ball is in liquid state, 
 * the block is damaged.
 * @ param ball The ball.
 * @ param saltBlock The salt block.
 */
function saltBlockCollide(ball, saltBlock)
{
	if (ball.name == "water") {
		playSaltSound();
		saltBlock.damage(1);
		saltBlock.animations.frame++;
	} else {
		playBlockedSound();
	}
}

/** Called in case of overlap between the ball 
 * and a porous block : if the ball is in solid state, 
 * it is blocked.
 * @ param ball The ball.
 * @ param porousBlock The porous block.
 */
function porousBlockOverlap(ball, porousBlock)
{
	if(ball.name === "ice" && 
			((lastDir === "up" && 
			  (ball.body.y-porousBlock.body.y)>0) ||
			 (lastDir === "down" && 
			  (ball.body.y-porousBlock.body.y)<0) ||
			 (lastDir === "right" && 
			  (ball.body.x-porousBlock.body.x)<0) ||
			 (lastDir === "left" && 
			  (ball.body.x-porousBlock.body.x)>0)))
	{  
		playBlockedSound();
		var xPos = ball.body.x;
		var yPos = ball.body.y;	
		switch(lastDir){
			case "left":
				xPos += (xPos % constants.TILE_SIZE);
				break;
			case "right":
				xPos -= (xPos % constants.TILE_SIZE);
				break;
			case "up":
				yPos += (yPos % constants.TILE_SIZE);
				break;
			case "down":
				yPos -= (yPos % constants.TILE_SIZE);
				break;
		}
		ball.body.reset(xPos,yPos);

		//Correction of the imprecision due to the reset function
		var imprecisionX = ball.x/constants.TILE_SIZE - 
			parseInt(ball.x/constants.TILE_SIZE);
		var imprecisionY = ball.y/constants.TILE_SIZE - 
			parseInt(ball.y/constants.TILE_SIZE);

		if (imprecisionX > 0.5) {
			ball.x = parseInt(ball.x/constants.TILE_SIZE + 1)*
				constants.TILE_SIZE;
		} else {
			ball.x = parseInt(ball.x/constants.TILE_SIZE)*
				constants.TILE_SIZE;
		}
		if (imprecisionY > 0.5) {
			ball.y = parseInt(ball.y/constants.TILE_SIZE + 1)*
				constants.TILE_SIZE;
		} else {
			ball.y = parseInt(ball.y/constants.TILE_SIZE)*
				constants.TILE_SIZE;
		}
	}
}

/** Called in case of overlap between the ball 
 * and an energy item : changes the state of the ball
 * according to its current state and the type of item.
 * @ param ball The ball.
 * @ param itemSprite The item.
 */
function itemCollide(ball, itemSprite)
{
	if(!hardOverlap(ball,itemSprite)){
		return;
	}

	if(itemSprite.type == "energyUp"){
		if (ball.name == "ice"){
			playDropSound();
			ball.animations.play("water");
			ball.name = "water";
		} else if (ball.name == "water"){
			playSteamSound();
			ball.animations.play("steam");
			ball.name = "steam";
		}
	} else if (itemSprite.type == "energyDown"){
		if (ball.name == "steam"){
			playDropSound();
			ball.animations.play("water");
			ball.name = "water";
		} else if (ball.name == "water"){
			ball.animations.play("ice");
			ball.name = "ice";
		}
	}
	itemSprite.kill();
}
