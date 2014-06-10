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
	for(var i = 0 ; i < arrLines.length ; i++) {
		//	var f_in = file.OpenTextFile(filename,1);
		//	while (!f_in.AtEndOfStream) {
		var block;
		//		var line = f_in.ReadLine();
		var line = arrLines[i];
		//console.info(line);
		var res = line.split(" ");
		x = TILE_SIZE*parseInt(res[1]);
		y = TILE_SIZE*parseInt(res[2]);
		switch(res[0]) {
			case "begin":
		    
		            switch(res[3]) {
		                case "ice":
		   	            ball = game.add.sprite(x,y,'ball',4);
				    ball.name = res[3];
				    ballAnimation = ball.animations.add("ice",[0, 1, 2, 3],BALL_ANIMATION_SPEED,true);
		    ballAnimation = ball.animations.add("water",[4, 5, 6, 7],BALL_ANIMATION_SPEED,true);
		    ballAnimation = ball.animations.add("steam",[8, 9, 10, 11],BALL_ANIMATION_SPEED,true);
				ball.animations.play("ice");
			            break;
		                case "water":
		    	            ball = game.add.sprite(x,y,'ball',4);
				    ball.name = res[3];
				    ballAnimation = ball.animations.add("ice",[0, 1, 2, 3],BALL_ANIMATION_SPEED,true);
		    ballAnimation = ball.animations.add("water",[4, 5, 6, 7],BALL_ANIMATION_SPEED,true);
		    ballAnimation = ball.animations.add("steam",[8, 9, 10, 11],BALL_ANIMATION_SPEED,true);
				ball.animations.play("water");
			            break;
		                case "steam":
			            ball = game.add.sprite(x,y,'ball',4);
			            ball.name = res[3];  
				    ballAnimation = ball.animations.add("ice",[0, 1, 2, 3],BALL_ANIMATION_SPEED,true);
		    ballAnimation = ball.animations.add("water",[4, 5, 6, 7],BALL_ANIMATION_SPEED,true);
		    ballAnimation = ball.animations.add("steam",[8, 9, 10, 11],BALL_ANIMATION_SPEED,true);
				ball.animations.play("steam");
				break;
			    }
				//ballAnimation = ball.animations.add('rolling',null,BALL_ANIMATION_SPEED,true);
				ball.anchor.setTo(0,0);
				ball.checkWorldBounds = true;
				game.physics.enable(ball,Phaser.Physics.ARCADE);
				ball.body.collideWorldBounds = true;
				ball.isMoving = false;
		    
				break;
			case "end":
				block = end.create(x,y,'end');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "hole":
				block = hole.create(x,y,'hole');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "simple":
				block = simple.create(x,y,'simple');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "item":	
				var type=res[3];
				block = item.create(x,y,type);
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.type=type;
				break;
			case "unilateral":			
				switch(res[3]) {
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
				break;
			case "salt" : 
				block = salt.create(x,y,'salt');
				block.animations.add('salt');
				block.health = parseInt(res[3]);
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "porous" : 
				block = porous.create(x,y,'porous');
				game.physics.enable(block,Phaser.Physics.ARCADE);
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
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				break;
			case "change_up":
				block = simple.create(x,y,'simple');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.body.checkCollision.left = false;
				block.body.checkCollision.up = false;
				block.body.checkCollision.right = false;

				block = cUp.create(x,y,'cUp');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.checkCollision.down = false;
				block.body.immovable = true;
				break;
			case "change_down":
				block = simple.create(x,y,'simple');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.body.checkCollision.left = false;
				block.body.checkCollision.down = false;
				block.body.checkCollision.right = false;

				block = cDown.create(x,y,'cDown');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.checkCollision.up = false;
				block.body.immovable = true;
				break;
			case "change_right":
				block = simple.create(x,y,'simple');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.body.checkCollision.up = false;
				block.body.checkCollision.down = false;
				block.body.checkCollision.right = false;

				block = cRight.create(x,y,'cRight');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.checkCollision.left = false;
				block.body.immovable = true;
				break;
			case "change_left":
				block = simple.create(x,y,'simple');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.immovable = true;
				block.body.checkCollision.up = false;
				block.body.checkCollision.down = false;
				block.body.checkCollision.left = false;

				block = cLeft.create(x,y,'cLeft');
				game.physics.enable(block,Phaser.Physics.ARCADE);
				block.body.checkCollision.right = false;
				block.body.immovable = true;
				break;
			case "turn":
				switch(res[3]){
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
				break;
		}
	}
}
