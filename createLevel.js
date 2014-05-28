function createLevel()
{
	normalBlocks = game.add.group();
	breakableBlocks = game.add.group();
	endBlocks = game.add.group();
	Hole = game.add.group();
	Simple = game.add.group();
	Unilateral = game.add.group();
	C_up = game.add.group();
	C_down = game.add.group();
	C_left = game.add.group();
	C_right = game.add.group();

	parser("levels/1.txt");
}
