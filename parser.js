function parser(filename) {
	if(document.all) {
		var file = new ActiveXObject("Scripting.FileSystemObject");
	}
	else
	{
		var file = new XMLHttpRequest();
	}
	file.open("GET", filename, false);
	file.send();
	var arrLines = file.responseText.split("\n");
	//We check the score for each floor
	var res = arrLines[0].split(" ");
	twoStars = res[0];
	threeStars = res[1];
	//We build the level	
	for(var i = 1 ; i < arrLines.length ; i++) {
		var block;
		var line = arrLines[i];
		var res = line.split(" ");
		x = constants.TILE_SIZE*parseInt(res[1]);
		y = constants.TILE_SIZE*parseInt(res[2]);
		switch(res[0]) {
			case "begin":
				addBeginSprite(res[3]);
				break;
			case "end":
				block = end.create(x,y,'end');
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "hole":
				block = hole.create(x,y,'hole');
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "simple":
				block = simple.create(x,y,'simple');
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "item":	
				var type=res[3];
				block = item.create(x,y,type);
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.type=type;
				break;
			case "unilateral":		
				addUniSprite(res[3]);
				break;
			case "salt" : 
				block = salt.create(x,y,'salt');
				block.animations.add('salt');
				block.health = parseInt(res[3]);
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "porous" : 
				block = porous.create(x,y,'porous');
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.body.checkCollision.left = false;
				block.body.checkCollision.right = false;
				block.body.checkCollision.up = false;
				block.body.checkCollision.down = false;
				break;
			case "breakable" : 
				block = breakable.create(x,y,'breakable');
				block.animations.add('breaking');
				block.health = parseInt(res[3]);
				game.physics.enable(block,
						Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "turn":
				addTurnSprite(res[3]);
				break;
		}
	}
}

function addBeginSprite(state)
{
	ball = game.add.sprite(x,y,'ball',4);
	ball.name = state;
	ballAnimation = ball.animations.add("ice",[0, 1, 2, 3],
			constants.BALL.ANIMATION_SPEED,true);	 
	ballAnimation = ball.animations.add("water",[4, 5, 6, 7],
			constants.BALL.ANIMATION_SPEED,true);
	ballAnimation = ball.animations.add("steam",[8, 9, 10, 11],
			constants.BALL.ANIMATION_SPEED,true);
	switch(state) {
		case "ice":
			ball.animations.play("ice");
			break;
		case "water":
			ball.animations.play("water");
			break;
		case "steam":
			ball.animations.play("steam");
			break;
	}
	ball.anchor.setTo(0,0);
	ball.checkWorldBounds = true;
	game.physics.enable(ball,Phaser.Physics.ARCADE);
	ball.body.collideWorldBounds = true;
	ball.isMoving = false;
}

function addUniSprite(dir)
{
	switch(dir) {
		case "up":
			block = unilateral.create(x,y,'uniUp');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.down = false;
			break;
		case "down":
			block = unilateral.create(x,y,'uniDown');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.up = false;
			break;
		case "right":
			block = unilateral.create(x,y,'uniRight');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.left = false;
			break;
		case "left":
			block = unilateral.create(x,y,'uniLeft');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.right = false;
			break;
	}
}

function addTurnSprite(orientation)
{
	switch(orientation){
		case "ul":
			block = turn.create(x,y,'turnUL');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.up = false;
			block.body.checkCollision.left = false;
			break;
		case "ur":
			block = turn.create(x,y,'turnUR');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.up = false;
			block.body.checkCollision.right = false;
			break;
		case "dr":
			block = turn.create(x,y,'turnDR');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.down = false;
			block.body.checkCollision.right = false;
			break;
		case "dl":
			block = turn.create(x,y,'turnDL');
			game.physics.enable(block,Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.checkCollision.down = false;
			block.body.checkCollision.left = false;
			break;
	}

}
