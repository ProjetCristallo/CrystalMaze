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
}

function changeDown()
{
}

function changeRight()
{
}

function changeLeft()
{
}

function holeOverlap(Ball, holeSprite)
{
    alert("Perdu !");
    create();
}

function fragileCollide()
{
}


function breakBlockCollide(Ball, breakBlock)
{
	if(breakBlock.health == 0){
		lastDir=null;
	}   
}
