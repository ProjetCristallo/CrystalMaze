
function endLevel(Ball, endSprite)
{
        lastDir = null;
	playing = false;
	Ball.body.velocity.x=0;
	Ball.body.velocity.y=0;
	endSprite.kill();
	EndScreen = game.add.sprite(25, 25, 'Win');
	Button = game.add.button(200,250, 'button', actionOnClickEnd, this, 2,1,0);
	Button2 = game.add.button(200,300, 'button2', actionOnClickEnd2, this, 2,1,0);

}

function actionOnClickEnd()
{
        Button.kill();
        Button2.kill();
        current_level = current_level + 1;
	playing = true;
        game.world.removeAll();
	create();
}

function actionOnClickEnd2()
{
        Button.kill();
        Button2.kill();
	playing = true;
        game.world.removeAll();
	create();
}

function actionOnClick1()
{
    button_jouer.kill();
    blop = true;
    create();
}

function playerFailed(Ball, holeSprite)
{
	alert("Perdu !");
        create();
}

/*function pause() {
	game.paused = true;
	pauseMenu = game.add.sprite(300, 240, 'pauseMenu');
	pauseMenu.anchor.setTo(0.5, 0.5);
}*/

/*function unpause() {
	if (game.paused) {
		game.paused = false;
	}
}*/

function normalBlockCollide()
{
}

function changeUp()
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'u';
        Ball.body.velocity.y = -BallSpeed; 
    }
}

function changeDown()
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'd'
	Ball.body.velocity.y = +BallSpeed;  
    }
}

function changeRight()
{    
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'r'
	Ball.body.velocity.x = +BallSpeed;
    }
}

function changeLeft()
{
    if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
    {
	BallMoving = false;
    }
    else
    {
	BallMoving = true;
    }
    if(!BallMoving){
	lastDir = 'l'
	Ball.body.velocity.x = -BallSpeed;
    }
}

function holeOverlap(Ball, holeSprite)
{
    lastDir = null;
    alert("Perdu !");
    create();
}

function breakBlockCollide(Ball, breakBlock)
{
	breakBlock.damage(1);
}

function itemCollide(Ball, itemSprite)
{
	listItem.push(itemSprite.type);
	itemSprite.kill();
}
