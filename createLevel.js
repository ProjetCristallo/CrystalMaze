function createLevel()
{
        levelName = "levels/"+currentLevel+".txt";
	listItem = [];
	listItem.length = 0;
	parser(levelName);
	ball.animations.play("rolling",constants.BALL_ANIMATION_SPEED,true);
}
