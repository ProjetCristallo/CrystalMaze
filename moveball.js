function moveBall() {

	if(BallMoving && ballAnimation.paused){
		ballAnimation.play(BALL_ANIMATION_SPEED,true);
	}
	if(!BallMoving && !ballAnimation.paused){
		ballAnimation.paused=true;
	}
	
	if(Ball.body.position.x === Ball.body.prev.x 
			&& Ball.body.position.y === Ball.body.prev.y)
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
		game.physics.arcade.collide(Ball, Turn, normalBlockCollide, null, this);
	}	
	checkTurn();
}

function checkTurn()
{
	for(var i=0; i<Turn.length;i++){
		current = Turn.getAt(i);
		if(current.alive && game.physics.arcade.distanceBetween
				(current, Ball) < 20) {
			turnBall(current);				
		}
	}	
}

function turnBall(turnBlock)
{
	Ball.body.x = turnBlock.body.x;
	Ball.body.y = turnBlock.body.y;
	if(Ball.body.velocity.x != 0){
		Ball.body.velocity.x = 0;
		if(turnBlock.body.checkCollision.up === false){
			Ball.body.velocity.y = -BALL_SPEED;
			Ball.body.y -= TILE_SIZE/3;
		}else{
			Ball.body.velocity.y = BALL_SPEED;
			Ball.body.y += TILE_SIZE/3;
		}
	}else{
		Ball.body.velocity.y = 0; 
		if(turnBlock.body.checkCollision.left === false){
			Ball.body.velocity.x = -BALL_SPEED;
			Ball.body.x -= TILE_SIZE/3;
		}else{
			Ball.body.velocity.x = BALL_SPEED;
			Ball.body.x += TILE_SIZE/3;
		}
	}

	// we check for any overlap (i.e. incorrect move)
	
}

function checkMove(block, dir)
{
	var authorized =true;
	if(dir=='up' && (block.y-Ball.y==-TILE_SIZE) && (block.x==Ball.x) 
			&& block.body.checkCollision.down){
		authorized = false;
	} else if(dir=='down' && (block.y-Ball.y==TILE_SIZE) && (block.x==Ball.x 
				&& block.body.checkCollision.up)){
		authorized = false;
	} else if(dir=='left' && (block.x-Ball.x==-TILE_SIZE) && (block.y==Ball.y 
				&& block.body.checkCollision.right)){
		authorized = false;
	} else if(dir=='right' && ((block.x-Ball.x)==TILE_SIZE) && (block.y==Ball.y 
				&& block.body.checkCollision.left)){
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
	for(var i=0; i<Unilateral.length; i++){
		current = Unilateral.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);
		}
	}
	for(var i=0; i<Turn.length; i++){
		current = Turn.getAt(i);
		if(current.alive){
			authorized = authorized && checkMove(current, dir);
		}
	}
	//alert(authorized);

	return authorized;
}
