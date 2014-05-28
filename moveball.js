function moveBall() {
	if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
	{
		BallMoving = false;
	}
	else
	{
		BallMoving = true;
	}
	if(!BallMoving)
	{
		if(controller.left.isDown && checkMoveGroup(Breakable,Ball,'left'))
		{
			Ball.body.velocity.x = -BallSpeed;
		}
		else if(controller.right.isDown && checkMoveGroup(Breakable,Ball,'right'))
		{
			Ball.body.velocity.x = +BallSpeed;
		}
		else if(controller.up.isDown && checkMoveGroup(Breakable,Ball,'up'))
		{
			Ball.body.velocity.y = -BallSpeed;
		}
		else if(controller.down.isDown && checkMoveGroup(Breakable,Ball,'down'))
		{
			Ball.body.velocity.y = +BallSpeed;
		}
	}
	else
	{
		game.physics.arcade.collide(Ball, normalBlocks, normalBlockCollide, null, this);
		game.physics.arcade.collide(Ball, Breakable, breakBlockCollide, null, this);
		game.physics.arcade.overlap(Ball, endBlocks, endLevel, null, this);
		game.physics.arcade.overlap(Ball, C_up, changeUp, null, this);
		game.physics.arcade.overlap(Ball, C_down, changeDown, null, this);
		game.physics.arcade.overlap(Ball, C_right, changeRight, null, this);
		game.physics.arcade.overlap(Ball, C_left, changeLeft, null, this);
		game.physics.arcade.overlap(Ball, Hole, holeOverlap, null, this);
		game.physics.arcade.collide(Ball, Fragile, fragileCollide, null, this);
	}	
}

function checkMove(breakableBlock, Ball, dir, authorized)
{
        if(dir=='up' && ((breakableBlock.y-Ball.y)==-60)){
                authorized = false;
        } else if(dir=='down' && ((breakableBlock.y-Ball.y)==60)){
                authorized = false;
        } else if(dir=='left' && ((breakableBlock.x-Ball.x)==-60)){
                authorized = false;
        } else if(dir=='right' && ((breakableBlock.x-Ball.x)==60)){
                authorized = false;
	}
}

function checkMoveGroup(Ball, Breakable, dir)
{
	var authorized = true;
	(Phaser.Group)(Breakable).forEachAlive(checkMove, this, Ball, dir, authorized);
	return authorized;
}
