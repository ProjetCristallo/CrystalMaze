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
		if(controller.left.isDown && lastDir!='l')
		{
			lastDir='l';
			Ball.body.velocity.x = -BallSpeed;
		}
		else if(controller.right.isDown && lastDir!='r')
		{
			lastDir = 'r';
			Ball.body.velocity.x = +BallSpeed;
		}
		else if(controller.up.isDown && lastDir!='u')
		{
			lastDir='u';
			Ball.body.velocity.y = -BallSpeed;
		}
		else if(controller.down.isDown && lastDir!='d')
		{
			lastDir='d';
			Ball.body.velocity.y = +BallSpeed;
		}
	}
	else
	{
		game.physics.arcade.collide(Ball, Simple, normalBlockCollide, null, this);
		game.physics.arcade.collide(Ball, breakableBlocks, breakBlockCollide, null, this);
		game.physics.arcade.overlap(Ball, endBlocks, endLevel, null, this);
		game.physics.arcade.overlap(Ball, C_up, changeUp, null, this);
		game.physics.arcade.overlap(Ball, C_down, changeDown, null, this);
		game.physics.arcade.overlap(Ball, C_right, changeRight, null, this);
		game.physics.arcade.overlap(Ball, C_left, changeLeft, null, this);
		game.physics.arcade.overlap(Ball, Hole, holeOverlap, null, this);
	}	
}
