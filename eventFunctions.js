
function endLevel(ball, endSprite)
{
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
		//cookie
		if (currentLevel + 1 > nbrLevelAccessible && currentLevel + 1 <= nbrLevel) {
			var date = new Date();
			date.setTime(date.getTime()+(30*24*60*60*1000));
			var expires = "; expires=" + date.toGMTString();
			document.cookie = 'levelmax='+(currentLevel + 1)+expires+'; path=/';
			nbrLevelAccessible = currentLevel + 1;
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
	}
	}
}

function endGame(ball, endSprite) {
	endSprite.kill();
	playing = false;
	endScreen = game.add.sprite(0, 0, 'endScreen');
	button2 = game.add.button(250,300, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
	button3 = game.add.button(250,350, 'pauseButtonMenu', actionOnClickMenu, this, 2, 1, 0);
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
		var buttonsX = BACKGROUND_WIDTH-IN_GAME_MENU_MARGIN-IN_GAME_MENU_BUTTON_WIDTH;
		var buttonsY = BACKGROUND_HEIGHT-IN_GAME_MENU_HEIGHT+IN_GAME_MENU_MARGIN;
		pauseMenu = game.add.sprite(BACKGROUND_WIDTH-IN_GAME_MENU_WIDTH,BACKGROUND_HEIGHT-IN_GAME_MENU_HEIGHT,'pauseMenu');
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
		ball.body.velocity.y = -BALL_SPEED; 
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
		ball.body.velocity.y = +BALL_SPEED;  
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
		ball.body.velocity.x = +BALL_SPEED;
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
		ball.body.velocity.x = -BALL_SPEED;
	}
}

function holeOverlap(ball, holeSprite)
{
	if (ball.name != "steam") {
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
	}
}

function saltBlockCollide(ball, saltBlock)
{
	if (ball.name == "water") {
		saltBlock.damage(1);
		saltBlock.animations.frame++;
	}
}

function porousBlockOverlap(ball, porousBlock)
{
	if (ball.name == "ice") {
		ball.body.reset(0,0);
		
		//Correction of the imprecision due to the reset function
		var imprecisionX = ball.x/TILE_SIZE - parseInt(ball.x/TILE_SIZE);
		var imprecisionY = ball.y/TILE_SIZE - parseInt(ball.y/TILE_SIZE);
		
		if (imprecisionX > 0.5) {
			ball.x = parseInt(ball.x/TILE_SIZE + 1)*TILE_SIZE;
		} else {
			ball.x = parseInt(ball.x/TILE_SIZE)*TILE_SIZE;
		}
		if (imprecisionY > 0.5) {
			ball.y = parseInt(ball.y/TILE_SIZE + 1)*TILE_SIZE;
		} else {
			ball.y = parseInt(ball.y/TILE_SIZE)*TILE_SIZE;
		}
		
	}
}

function itemCollide(ball, itemSprite)
{
    if(itemSprite.type == "energyUp"){
	if (ball.name == "ice"){
	    ball.animations.play("water");
	    ball.name = "water";
	} else if (ball.name == "water"){
	    ball.animations.play("steam");
	    ball.name = "steam";
	}
    } else if (itemSprite.type == "energyDown"){
	if (ball.name == "steam"){
	    ball.animations.play("water");
	    ball.name = "water";
	} else if (ball.name == "water"){
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
