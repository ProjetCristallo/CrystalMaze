function createLevel()
{
        levelName = "levels/"+current_level+".txt";
	listItem = [];
	listItem.length = 0;
	parser(levelName);
	ballAnimation.play(BALL_ANIMATION_SPEED,true);
}
