function moveBall() {

	//Imprecisions handling
	ball.body.x = Math.round(ball.body.x);
	ball.body.y = Math.round(ball.body.y);

	//Ball animation
	if(ball.isMoving && ball.animations.paused){
		ball.animations.paused=false;
	}
	if(!ball.isMoving && !ball.animations.paused){
		ball.animations.paused=true;
	}

	//Checks if the ball is moving
	if(ball.body.position.x === ball.body.prev.x 
			&& ball.body.position.y === ball.body.prev.y)
	{
		ball.isMoving = false;
	}
	else
	{
		ball.isMoving = true;
	}
	
	if(!ball.isMoving)
	{	
		if(game.isPaused) {return;}
		//the ball isn't moving and the game isn't paused : 
		//we check inputs from the user
		if((controller.left.isDown || swipe==='left')
				&& checkMoveGroup('left'))
		{	
			lastDir = 'left';
			swipe = null;
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(ball,turn,setLastTurn);
			score++;
			ball.body.velocity.x = -constants.BALL.SPEED;
		}
		else if((controller.right.isDown || swipe==='right')
				&& checkMoveGroup('right'))
		{	
			lastDir = 'right';
			swipe = null;	
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(ball,turn,setLastTurn);
			score++;
			ball.body.velocity.x = +constants.BALL.SPEED;
		}
		else if((controller.up.isDown || swipe==='up')
				&& checkMoveGroup('up'))
		{	
			lastDir = 'up';
			swipe = null;	
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(ball,turn,setLastTurn);
			score++;
			ball.body.velocity.y = -constants.BALL.SPEED;
		}
		else if((controller.down.isDown || swipe==='down')
				&& checkMoveGroup('down'))
		{
			lastDir = 'down';
			swipe = null;	
			lastTurnBlocked = null;
			lastTurn = null;
			game.physics.arcade.overlap(ball,turn,setLastTurn);
			score++;
			ball.body.velocity.y = +constants.BALL.SPEED;
		}
	}
	else
	{
		//The ball is moving : we check the collisions/overlaps
		game.physics.arcade.collide(ball, simple, normalBlockCollide, null, this);
		game.physics.arcade.collide(ball, breakable, breakBlockCollide, null, this);
		game.physics.arcade.collide(ball, salt, saltBlockCollide, null, this);
		game.physics.arcade.overlap(ball, porous, porousBlockOverlap, null, this);
		game.physics.arcade.overlap(ball, end, endLevel, null, this);
		game.physics.arcade.collide(ball, unilateral, normalBlockCollide, null, this);
		game.physics.arcade.overlap(ball, hole, holeOverlap, null, this);
		game.physics.arcade.overlap(ball, item, itemCollide, null, this);
		game.physics.arcade.collide(ball, turn, normalBlockCollide, null, this);
	}	
	checkTurn();
}


var lastTurn;
var lastTurnBlocked;

function setLastTurn(ball, turnBlock)
{
	lastTurn = turnBlock;
}

function checkTurn()
{
	for(var i=0; i<turn.length;i++){
		current = turn.getAt(i);
		if(current.alive && current != lastTurn &&
				game.physics.arcade.distanceBetween
				(current, ball) < constants.
				TURN_SENSOR_PERCENTAGE*constants.TILE_SIZE)
	       	{
			lastTurn = current;
			turnBall(current);				
		}
	}	
}

function turnBall(turnBlock)
{
	//Definition of lastTurnedBlock
	if(ball.body.velocity.x > 0){
		lastTurnBlocked = 'right';
	}else if(ball.body.velocity.x < 0){
		lastTurnBlocked = 'left';
	}else if(ball.body.velocity.y > 0){
		lastTurnBlocked ='down';
	}else if(ball.body.velocity.y < 0){
		lastTurnBlocked = 'up';
	}

	ball.body.x = turnBlock.body.x;
	ball.body.y = turnBlock.body.y;

	
	if(lastDir === 'left' || lastDir === 'right'){
		ball.body.velocity.x = 0;
		if(turnBlock.body.checkCollision.up === false){
			ball.body.velocity.y = -constants.BALL.SPEED;
			ball.body.y -= constants.TILE_SIZE/3;
			lastDir = 'up';
		}else{
			ball.body.velocity.y = constants.BALL.SPEED;
			ball.body.y += constants.TILE_SIZE/3;
			lastDir = 'down';
		}
	}else if(lastDir === 'up' || lastDir ==='down'){
		ball.body.velocity.y = 0; 
		if(turnBlock.body.checkCollision.left === false){
			ball.body.velocity.x = -constants.BALL.SPEED;
			ball.body.x -= constants.TILE_SIZE/3;
			lastDir = 'left';
		}else{
			ball.body.velocity.x = constants.BALL.SPEED;
			ball.body.x += constants.TILE_SIZE/3;
			lastDir = 'right';
		}
	}

	// we check for any overlap (i.e. incorrect move)
	if(game.physics.arcade.overlap(ball, unilateral, checkUniTurn))
	{
		return;
	}
	else if(game.physics.arcade.overlap(ball, simple))
	{
		ball.body.velocity.x=0;
		ball.body.velocity.y=0;
		ball.body.x = turnBlock.body.x;
		ball.body.y = turnBlock.body.y;
		return;
	}
	else if(game.physics.arcade.overlap(ball, breakable, breakBlockCollide))
	{
		ball.body.velocity.x=0;
		ball.body.velocity.y=0;
		ball.body.x = turnBlock.body.x;
		ball.body.y = turnBlock.body.y;
		return;
	}
	else 
	{
		var resetLastTurn = true;
		for(var i=0; i<turn.length; i++){
			current = turn.getAt(i);
			if(current.alive && current != turnBlock && 
					game.physics.arcade.overlap(
						ball,current))
			{
				checkUniTurn(ball,current); 
				resetLastTurn =false				
			}
		}
		if(resetLastTurn){
			lastTurnBlocked=null;
		}
	}
}

function checkUniTurn(ball, uniBlock)
{
	if((uniBlock.body.checkCollision.up && (ball.body.velocity.y > 0)) ||
			(uniBlock.body.checkCollision.down && 
			 (ball.body.velocity.y < 0)) ||
			(uniBlock.body.checkCollision.left && 
			 (ball.body.velocity.x > 0)) ||
			(uniBlock.body.checkCollision.right && 
			 (ball.body.velocity.x < 0)))
	{
		//we put ball back on the turn case
		ball.body.x -= ball.body.velocity / constants.BALL.SPEED *
		       	constants.TILE_SIZE / 3;
		ball.body.y -= ball.body.velocity / constants.BALL.SPEED *
		       	constants.TILE_SIZE / 3;
		ball.body.velocity.x = 0;
		ball.body.velocity.y = 0;
	}else{
		lastTurnBlocked=null;
	}
}

function checkMoveTurn(block,dir)
{
	var authorized = checkMove(block, dir);
	if(block.y === ball.y && block.x == ball.x) {
		if((dir==='up' && block.body.checkCollision.up) ||
				(dir==='down' && 
				 block.body.checkCollision.down) ||
				(dir==='left' && 
				 block.body.checkCollision.left) ||
				(dir==='right' && 
				 block.body.checkCollision.right))
		{
			authorized = false;	
		}
	}
	return authorized;
}


function checkMove(block, dir, booleanPorous)
{
	var authorized = true;

	if(dir === lastTurnBlocked){
		authorized = false;
	}

	if(dir=='up' && (block.y-ball.y==-constants.TILE_SIZE) && 
			(block.x==ball.x) && 
			(block.body.checkCollision.down || booleanPorous))
	{
		authorized = false;
	} else if(dir=='down' && (block.y-ball.y==constants.TILE_SIZE) && 
			(block.x==ball.x) && 
			(block.body.checkCollision.up || booleanPorous))
	{
		authorized = false;
	} else if(dir=='left' && (block.x-ball.x==-constants.TILE_SIZE) && 
			(block.y==ball.y) && 
			(block.body.checkCollision.right || booleanPorous))
	{
		authorized = false;
	} else if(dir=='right' && ((block.x-ball.x)==constants.TILE_SIZE) && 
			(block.y==ball.y) && 
			(block.body.checkCollision.left || booleanPorous))
	{
		authorized = false;
	}
	return authorized;

}

function checkMoveGroup(dir)
{
	var current;
	var authorized = true;


	//We check with the game boundaries
	if((dir=='up' && ball.y==0) || 
			(dir=='down' && 
			 ball.y==constants.BACKGROUND_HEIGHT-ball.width) || 
			(dir=='right' && 
			 ball.x==constants.BACKGROUND_WIDTH-ball.width) || 
			(dir=='left' && ball.x==0)) {
		return false;
	}

	for(var i=0; i<porous.length; i++){
		current = porous.getAt(i);
		if(current.alive && ball.name === "ice") {
			authorized = authorized && 
				checkMove(current, dir, true);
		}
	}
	
	for(var i=0; i<breakable.length;i++){
		current = breakable.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);
		}
	}
	
	for(var i=0; i<salt.length;i++){
		current = salt.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);
		}
	}
	
	for(var i=0; i<simple.length;i++){
		current = simple.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);

		}
	}
	for(var i=0; i<unilateral.length; i++){
		current = unilateral.getAt(i);
		if(current.alive) {
			authorized = authorized && checkMove(current, dir);
		}
	}
	for(var i=0; i<turn.length; i++){
		current = turn.getAt(i);
		if(current.alive){
			authorized = authorized && checkMoveTurn(current, dir);
		}
	}
	return authorized;
}
