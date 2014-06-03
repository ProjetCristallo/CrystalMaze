function createLevel()
{
        levelName = "levels/"+current_level+".txt";
	listItem = [];
	listItem.length = 0;
	parser(levelName);
	Ball.animations.play("rolling",BALL_ANIMATION_SPEED,true);
}
