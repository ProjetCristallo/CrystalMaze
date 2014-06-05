
function endLevel(ball, endSprite)
{
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
	}
	catch(err){
	    playing = false;
		ball.body.velocity.x=0;
		ball.body.velocity.y=0;
		endSprite.kill();
		endScreen = game.add.sprite(25, 25, 'win');
		button = game.add.button(200,250, 'buttonReplay', actionOnClickReplay, this, 2,1,0);
		button2 = game.add.button(200,300, 'buttonRestart', actionOnClickRestart, this, 2, 1, 0);
	}
}

function actionOnClickRestart(){
	button.kill();
	button2.kill();
	currentLevel = 1;
	playing = true;
	game.world.removeAll();
	create();
}

function actionOnClickNextLevel()
{
	button.kill();
	button2.kill();
	currentLevel = currentLevel + 1;
        textLevel.setText("Niveau " + currentLevel);
	playing = true;
	game.world.removeAll();
	create();
}

function actionOnClickReplay()
{
	button.kill();
	button2.kill();
	playing = true;
	game.world.removeAll();
	create();
}

function actionOnClickPlay()
{
	buttonJouer.kill();
	mainMenu = false;
	game.world.removeAll();
	create();
}

function playerFailed(ball, holeSprite)
{
	alert("Perdu !");
	create();
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
		alert("Perdu !");
		create();
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
		//saltBlock.animations.frame++;
	}
}

function porousBlockCollide(ball, porousBlock)
{
	if (ball.name != "ice") {
		porousBlock.checkCollision.left = false;
		porousBlock.checkCollision.right = false;
		porousBlock.checkCollision.up = false;
		porousBlock.checkCollision.down = false;
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
