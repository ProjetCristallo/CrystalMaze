function createLevel()
{
    if (tutorial){
        levelName = "tutorial/"+currentLevelTuto+".txt";
	initializeTutorial();
    } else {
	levelName = "levels/"+currentLevel+".txt";
    }
	listItem = [];
	listItem.length = 0;
	parser(levelName);
	ball.animations.play("rolling",constants.BALL_ANIMATION_SPEED,true);
    if (tutorial){
        displayTutorial();
    }
}
