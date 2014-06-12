/* Return a boolean to signal if the ball and block are close enough to use 
 * the following functions */
function hardOverlap(ball,block)
{
	return ((Math.abs(ball.body.x-block.body.x) < constants.TILE_SIZE/2) &&
			(Math.abs(ball.body.y-block.body.y) < 
			 constants.TILE_SIZE/2));
}

function endLevel(ball, endSprite)
{
	// Force ball and endSprite to be closer than a classic overlap
	if(!hardOverlap(ball,endSprite)){
		return;
	}
	if (currentLevel == nbrLevel) {
		endGame(ball,endSprite);
	} else {
		buttonPause.inputEnabled = false;
		if(document.all) {
			var file = new ActiveXObject("Scripting.FileSystemObject");
		}
		else
		{
			var file = new XMLHttpRequest();
		}
		file.open('HEAD',"levels/"+(currentLevel+1)+".txt",false);
		try{
			file.send();
			file.abort();	
			playing = false;
			ball.body.velocity.x=0;
			ball.body.velocity.y=0;
			endSprite.kill();
			endScreen = game.add.sprite(25, 25, 'win');
			button = game.add.button(200,250, 'buttonNextLevel', actionOnClickNextLevel, this, 2,1,0);
			button2 = game.add.button(200,300, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
			button3 = game.add.button(200,350, 'pauseButtonMenu', actionOnClickMenu, this, 2, 1, 0);
			
			stars = game.add.sprite(300,170,'stars');
			//We check the number of stars to light on
			var nbrStars;
			stars.animations.frame++;
			nbrStars = 1;
			if (score <= twoStars) {
				stars.animations.frame++;
				nbrStars = 2;
				if (score <= threeStars) {
				stars.animations.frame++;
					nbrStars = 3;
				}
			}
			updateCookieStars(nbrStars);
		
			//We update the number of unblocked levels	
			if (currentLevel + 1 > nbrLevelAccessible && currentLevel + 1 <= nbrLevel) {
				nbrLevelAccessible = currentLevel + 1;
				updateCookieNbrLevel(nbrLevelAccessible);	
			}
		}
		catch(err){
			playing = false;
			ball.body.velocity.x=0;
			ball.body.velocity.y=0;
			endSprite.kill();
			endScreen = game.add.sprite(25, 25, 'win');
			button = game.add.button(200,250, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
			button2 = game.add.button(200,300, 'buttonRestart', actionOnClickRestart, this, 2, 1, 0);
			button3 = game.add.button(200,350, 'pauseButtonMenu', actionOnClickMenu, this, 2, 1, 0);
			
			stars = game.add.sprite(300,170,'stars');
			//We check the number of stars to light on
			var nbrStars;
			stars.animations.frame++;
			nbrStars = 1;
			if (score <= twoStars) {
				stars.animations.frame++;
				nbrStars = 2;
				if (score <= threeStars) {
				stars.animations.frame++;
					nbrStars = 3;
				}
			}
			updateCookieStars(nbrStars);
		
			//We update the number of unblocked levels	
			if (currentLevel + 1 > nbrLevelAccessible && currentLevel + 1 <= nbrLevel) {
				nbrLevelAccessible = currentLevel + 1;
				updateCookieNbrLevel(nbrLevelAccessible);	
			}
		}
	}
}

function endGame(ball, endSprite) {
	endSprite.kill();
	playing = false;
	ball.body.velocity.x=0;
	ball.body.velocity.y=0;
	buttonPause.inputEnabled = false;
	endScreen = game.add.sprite(0, 0, 'endScreen');
	button2 = game.add.button(200,300, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
	button3 = game.add.button(200,350, 'pauseButtonMenu', actionOnClickMenu, this, 2, 1, 0);
	stars = game.add.sprite(300,170,'stars');
			//We check the number of stars to light on
			var nbrStars;
			stars.animations.frame++;
			nbrStars = 1;
			if (score <= twoStars) {
				stars.animations.frame++;
				nbrStars = 2;
				if (score <= threeStars) {
				stars.animations.frame++;
					nbrStars = 3;
				}
			}
			updateCookieStars(nbrStars);
		
			//We update the number of unblocked levels	
			if (currentLevel + 1 > nbrLevelAccessible && currentLevel + 1 <= nbrLevel) {
				nbrLevelAccessible = currentLevel + 1;
				updateCookieNbrLevel(nbrLevelAccessible);	
			}
}


function actionOnClickMenu() {
	game.world.removeAll(true);
	mainMenu=true;
	currentLevel=1;
	playing = true;
	create();
}

function actionOnClickRestart(){
	//button.kill();
	//button2.kill();
	playing = true;
	currentLevel = 1;
	playing = true;
	game.world.removeAll(true);
	create();
}

function actionOnClickNextLevel()
{
	//button.kill();
	//button2.kill();
	currentLevel = currentLevel + 1;
	textLevel.setText("Niveau " + currentLevel);
	playing = true;
	game.world.removeAll(true);
	create();
}

function actionOnClickReplay()
{
	//button.kill();
	//button2.kill();
	playing = true;
	game.world.removeAll(true);
	create();
}

function actionOnClickPlay()
{
	//buttonJouer.kill();
	mainMenu = false;
	game.world.removeAll();
	create();
}

function actionOnClickSelectLevel()
{
	selectLevelMenu = true;
	mainMenu = false;
	game.world.removeAll();
	create();
}

function actionOnClickReturn()
{
	numPageCourant = 1;
	selectLevelMenu = false;
	mainMenu = true;
	game.world.removeAll();
	create();
}

function actionOnClickArrowRight()
{
	numPageCourant++;
	game.world.removeAll();
	create();
}

function actionOnClickArrowLeft()
{
	numPageCourant--;
	game.world.removeAll();
	create();
}

function actionOnClickLevelAccessible(button)
{
	numPageCourant = 1;
	selectLevelMenu = false;
	game.world.removeAll();
	currentLevel = button.name;
	create();
}

function actionOnClickLevelInaccessible(button)
{
	screenLevelError = game.add.sprite(0, 0, 'levelInaccessible');
	cross = game.add.sprite(540,0,'cross');
	cross.inputEnabled = true;
	screenLevelError.inputEnabled = true;
	screenLevelError.events.onInputDown.add(function() {
			cross.kill();
			screenLevelError.kill();
			}
			,this);
	cross.events.onInputDown.add(function() {
			cross.kill();
			screenLevelError.kill();
			}
			,this);
}


function triggerPause() {
	if(!game.isPaused){
		var buttonsX = constants.BACKGROUND_WIDTH-constants.IN_GAME_MENU_MARGIN-constants.IN_GAME_MENU_BUTTON_WIDTH;
		var buttonsY = constants.BACKGROUND_HEIGHT-constants.IN_GAME_MENU_HEIGHT+constants.IN_GAME_MENU_MARGIN;
		pauseMenu = game.add.sprite(constants.BACKGROUND_WIDTH-constants.IN_GAME_MENU_WIDTH,constants.BACKGROUND_HEIGHT-constants.IN_GAME_MENU_HEIGHT,'pauseMenu');
		pauseButtons.forEach(function(button){button.revive()});
		pauseButtons.forEach(function(button){button.bringToTop()});
	} else {
		pauseMenu.destroy();
		pauseButtons.forEach(function(button){button.kill()});
	}
	game.isPaused=!game.isPaused;
}

function normalBlockCollide()
{
}

function changeUp()
{
	if(ball.body.velocity.x == 0 && ball.body.velocity.y == 0)
	{
		ball.isMoving = false;
	}
	else
	{
		ball.isMoving = true;
	}
	if(!ball.isMoving){
		ball.body.velocity.y = -constants.BALL.SPEED; 
	}
}

function changeDown()
{
	
	if(ball.body.velocity.x == 0 && ball.body.velocity.y == 0)
	{
		ball.isMoving = false;
	}
	else
	{
		ball.isMoving = true;
	}
	if(!ball.isMoving){
		ball.body.velocity.y = +constants.BALL.SPEED;  
	}
}

function changeRight()
{    
	if(ball.body.velocity.x == 0 && ball.body.velocity.y == 0)
	{
		ball.isMoving = false;
	}
	else
	{
		ball.isMoving = true;
	}
	if(!ball.isMoving){
		ball.body.velocity.x = +constants.BALL.SPEED;
	}
}

function changeLeft()
{
	if(ball.body.velocity.x == 0 && ball.body.velocity.y == 0)
	{
		ball.isMoving = false;
	}
	else
	{
		ball.isMoving = true;
	}
	if(!ball.isMoving){
		ball.body.velocity.x = -constants.BALL.SPEED;
	}
}

function holeOverlap(ball, holeSprite)
{
	if (ball.name != "steam" && hardOverlap(ball,holeSprite)){
		buttonPause.inputEnabled = false;
		if(document.all) {
			var file = new ActiveXObject("Scripting.FileSystemObject");
		}
		else
		{
			var file = new XMLHttpRequest();
		}
		file.open('HEAD',"levels/"+currentLevel+".txt",false);
		try{
			file.send();
			file.abort();	
			playing = false;
			ball.body.velocity.x=0;
			ball.body.velocity.y=0;
			endScreen = game.add.sprite(25, 25, 'fail');
			button = game.add.button(200,300, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
			button2 = game.add.button(200,250, 'pauseButtonMenu', actionOnClickMenu, this, 2, 1, 0);
		}
		catch(err){
			playing = false;
			ball.body.velocity.x=0;
			ball.body.velocity.y=0;
			endScreen = game.add.sprite(25, 25, 'fail');
			button = game.add.button(200,250, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
			button2 = game.add.button(200,250, 'pauseButtonMenu', actionOnClickMenu, this, 2, 1, 0);
		}
	}
}

function breakBlockCollide(ball, breakBlock)
{
	if (ball.name == "ice") {
		breakBlock.damage(1);
		breakBlock.animations.frame++;
	} else {
		playBlockedSound();
	}
}

function saltBlockCollide(ball, saltBlock)
{
	if (ball.name == "water") {
		saltBlock.damage(1);
		saltBlock.animations.frame++;
	} else {
		playBlockedSound();
	}
}

function porousBlockOverlap(ball, porousBlock)
{
	if(ball.name === "ice" && 
			((lastDir === "up" && (ball.body.y-porousBlock.body.y)>0) ||
			 (lastDir === "down" && (ball.body.y-porousBlock.body.y)<0) ||
			 (lastDir === "right" && (ball.body.x-porousBlock.body.x)<0) ||
			 (lastDir === "left" && (ball.body.x-porousBlock.body.x)>0))){  
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
		var imprecisionX = ball.x/constants.TILE_SIZE - parseInt(ball.x/constants.TILE_SIZE);
		var imprecisionY = ball.y/constants.TILE_SIZE - parseInt(ball.y/constants.TILE_SIZE);

		if (imprecisionX > 0.5) {
			ball.x = parseInt(ball.x/constants.TILE_SIZE + 1)*constants.TILE_SIZE;
		} else {
			ball.x = parseInt(ball.x/constants.TILE_SIZE)*constants.TILE_SIZE;
		}
		if (imprecisionY > 0.5) {
			ball.y = parseInt(ball.y/constants.TILE_SIZE + 1)*constants.TILE_SIZE;
		} else {
			ball.y = parseInt(ball.y/constants.TILE_SIZE)*constants.TILE_SIZE;
		}


	}
}

function itemCollide(ball, itemSprite)
{
	if(!hardOverlap(ball,itemSprite)){
		return;
	}

	/*	if(lastDir === "left"){
		ball.body.x -= TILE_SIZE/2;
		}else if(lastDir === "right"){
		ball.body.x += TILE_SIZE/2;
		}else if(lastDir === "up"){
		ball.body.y -= TILE_SIZE/2;
		}else if(lastDir === "down"){
		ball.body.y += TILE_SIZE/2;
		}
	 */
	if(itemSprite.type == "energyUp"){
		if (ball.name == "ice"){
			playWaterSound();
			ball.animations.play("water");
			ball.name = "water";
		} else if (ball.name == "water"){
			playSteamSound();
			ball.animations.play("steam");
			ball.name = "steam";
		}
	} else if (itemSprite.type == "energyDown"){
		if (ball.name == "steam"){
			playWaterSound();
			ball.animations.play("water");
			ball.name = "water";
		} else if (ball.name == "water"){
			playIceSound();
			ball.animations.play("ice");
			ball.name = "ice";
		}
	}
	itemSprite.kill();
}

/*function itemCollide(ball, itemSprite)
  {
  listItem.push(itemSprite.type);
  itemSprite.kill();
  }
 */
