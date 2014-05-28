function createLevel()
{
	normalBlocks = game.add.group();
	breakableBlocks = game.add.group();
	endBlocks = game.add.group();

	endSprite = endBlocks.create(558, 438, 'Star');
	game.physics.enable(endSprite,Phaser.Physics.ARCADE);	
	endSprite.body.immovable = true;

	breakBlock = breakableBlocks.create(480, 0, 'BVert');
	breakBlock.health = 4;
	game.physics.enable(breakBlock,Phaser.Physics.ARCADE);
	breakBlock.body.immovable = true;       

	breakBlock = breakableBlocks.create(0, 360, 'BVert');
	breakBlock.health = 4;
	game.physics.enable(breakBlock,Phaser.Physics.ARCADE);
	breakBlock.body.immovable = true;

	block = normalBlocks.create(540, 0, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;

	block = normalBlocks.create(0, 420, 'BNoir');
	game.physics.enable(block,Phaser.Physics.ARCADE);
	block.body.immovable = true;
}
