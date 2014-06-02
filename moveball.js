function moveBall() {
	//if(Ball.body.velocity.x == 0 && Ball.body.velocity.y == 0)
	
	if(BallMoving && ballAnimation.paused){
		ballAnimation.play(BALL_ANIMATION_SPEED,true);
	}
	if(!BallMoving && !ballAnimation.paused){
		ballAnimation.paused=true;
	}
	
	if(Phaser.Point.equals(Ball.body.position, Ball.body.prev))
	{
		BallMoving = false;
	}
	else
	{
		BallMoving = true;
	}
	if(!BallMoving)
	{
		if(controller.left.isDown && checkMoveGroup('left'))
		{
			score++;
			Ball.body.velocity.x = -BALL_SPEED;
		}
		else if(controller.right.isDown && checkMoveGroup('right'))
		{
			score++;
			Ball.body.velocity.x = +BALL_SPEED;
		}
		else if(controller.up.isDown && checkMoveGroup('up'))
		{
			score++;
			Ball.body.velocity.y = -BALL_SPEED;
		}
		else if(controller.down.isDown && checkMoveGroup('down'))
		{
			score++;
			Ball.body.velocity.y = +BALL_SPEED;
		}
	}
	else
	{
		game.physics.arcade.collide(Ball, Simple, normalBlockCollide, null, this);
		game.physics.arcade.collide(Ball, Breakable, breakBlockCollide, null, this);
		game.physics.arcade.overlap(Ball, End, endLevel, null, this);
		game.physics.arcade.collide(Ball, C_up, changeUp, null, this);
		game.physics.arcade.collide(Ball, C_down, changeDown, null, this);
		game.physics.arcade.collide(Ball, C_right, changeRight, null, this);
		game.physics.arcade.collide(Ball, C_left, changeLeft, null, this);
		game.physics.arcade.collide(Ball, Unilateral, normalBlockCollide, null, this);
		game.physics.arcade.overlap(Ball, Hole, holeOverlap, null, this);
		game.physics.arcade.overlap(Ball, Item, itemCollide, null, this);
	}	
}


function checkMove(block, dir){
	var authorized =true;
	if(dir=='up' && (block.y-Ball.y==-TILE_SIZE) && (block.x==Ball.x)){
		authorized = false;
	} else if(dir=='down' && (block.y-Ball.y==TILE_SIZE) && (block.x==Ball.x)){
		authorized = false;
	} else if(dir=='left' && (block.x-Ball.x==-TILE_SIZE) && (block.y==Ball.y)){
		authorized = false;
	} else if(dir=='right' && ((block.x-Ball.x)==TILE_SIZE) && (block.y==Ball.y)){
		authorized = false;
	}
	return authorized;
}

function checkMoveGroup(dir)
{
	var current;
	var authorized = true;

	//We check with the game boundaries
	if((dir=='up' && Ball.y==0) || 
			(dir=='down' && Ball.y==game.height-Ball.height) || 
			(dir=='right' && Ball.x==game.width-Ball.width) || 
			(dir=='left' && Ball.x==0)) {
		return false;
	}


	for(var i=0; i<Breakable.length;i++){
		current = Breakable.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);

		}
	}
	for(var i=0; i<Simple.length;i++){
		current = Simple.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);

		}
	}
	//alert(authorized);

	return authorized;
}
