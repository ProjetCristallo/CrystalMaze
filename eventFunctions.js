function endLevel(Ball, endTile)
{
	playing = false;
	endSprite.kill();
	EndScreen = game.add.sprite(25, 25, 'Win');
	endButton = game.add.button(200,250, 'button', actionOnClickEnd, this, 2,1,0);
}

function actionOnClickEnd()
{
	playing = true;
	create();
}

function playerFailed(Ball, holeSprite)
{
	alert("Perdu !");
        create();
}

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
        Ball.body.velocity.y = -Ballspeed; 
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
    alert("Perdu !");
    create();
}

function breakBlockCollide(Ball, breakBlock)
{
	breakBlock.damage(1);
}
