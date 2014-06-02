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
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(Ball,Turn,setLastTurn);
			score++;
			Ball.body.velocity.x = -BALL_SPEED;
		}
		else if(controller.right.isDown && checkMoveGroup('right'))
		{
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(Ball,Turn,setLastTurn);
			score++;
			Ball.body.velocity.x = +BALL_SPEED;
		}
		else if(controller.up.isDown && checkMoveGroup('up'))
		{
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(Ball,Turn,setLastTurn);
			score++;
			Ball.body.velocity.y = -BALL_SPEED;
		}
		else if(controller.down.isDown && checkMoveGroup('down'))
		{
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(Ball,Turn,setLastTurn);
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

var lastTurn;
var lastTurnBlocked;

function setLastTurn(Ball, turnBlock)
{
	lastTurn = turnBlock;
}

function checkTurn()
{
	for(var i=0; i<Turn.length;i++){
		current = Turn.getAt(i);
		if(current.alive && current != lastTurn &&
				game.physics.arcade.distanceBetween
				(current, Ball) < 0.7*TILE_SIZE) {
			lastTurn = current;
			turnBall(current);				
		}
	}	
}

function turnBall(turnBlock)
{
	//Definition of lastTurnedBlock
	if(Ball.body.velocity.x > 0){
		lastTurnBlocked = 'right';
	}else if(Ball.body.velocity.x < 0){
		lastTurnBlocked = 'left';
	}else if(Ball.body.velocity.y > 0){
		lastTurnBlocked ='down';
	}else if(Ball.body.velocity.y < 0){
		lastTurnBlocked = 'up';
	}

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
	}else if(Ball.body.velocity.y != 0){
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
	if(game.physics.arcade.overlap(Ball, Unilateral, checkUniTurn))
	{
		return;
	}
	else if(game.physics.arcade.overlap(Ball, Simple))
	{
		Ball.body.velocity.x=0;
		Ball.body.velocity.y=0;
		Ball.body.x = turnBlock.body.x;
		Ball.body.y = turnBlock.body.y;
		return;
	}
	else if(game.physics.arcade.overlap(Ball, Breakable, breakBlockCollide))
	{
		Ball.body.velocity.x=0;
		Ball.body.velocity.y=0;
		Ball.body.x = turnBlock.body.x;
		Ball.body.y = turnBlock.body.y;
		return;
	}
	else 
	{
		var resetLastTurn = true;
		for(var i=0; i<Turn.length; i++){
			current = Turn.getAt(i);
			if(current.alive && current != turnBlock && 
				game.physics.arcade.overlap(Ball,current)){
				checkUniTurn(Ball,current); 
				resetLastTurn =false				
			}
		}
		if(resetLastTurn){
			lastTurnBlocked=null;
			//lastTurn = null;
		}
	}
}

function checkUniTurn(Ball, uniBlock)
{
	if((uniBlock.body.checkCollision.up && (Ball.body.velocity.y > 0)) ||
			(uniBlock.body.checkCollision.down && 
			 (Ball.body.velocity.y < 0)) ||
			(uniBlock.body.checkCollision.left && 
			 (Ball.body.velocity.x > 0)) ||
			(uniBlock.body.checkCollision.right && 
			 (Ball.body.velocity.x < 0)))
	{
		//we put Ball back on the turn case
		Ball.body.x -= Ball.body.velocity / BALL_SPEED * TILE_SIZE / 3;
		Ball.body.y -= Ball.body.velocity / BALL_SPEED * TILE_SIZE / 3;
		Ball.body.velocity.x = 0;
		Ball.body.velocity.y = 0;
	}else{
		lastTurnBlocked=null;
	}
}

function checkMove(block, dir)
{
	var authorized =true;

	if(dir === lastTurnBlocked){
		authorized = false;
	}

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
	return authorized;
}
