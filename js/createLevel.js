/** create the level corresponding to currentLevel, call parser to populate the
  * world.
  */
function createLevel()
{
    if (tutorial){
        levelName = "tutorial/"+tutoStruct.currentLevelTuto+".txt";
		initializeTutorial();
    } else {
		levelName = "levels/"+levelStruct.currentLevel+".txt";
    }
	listItem = [];
	listItem.length = 0;
	parser(levelName);
	ball.animations.play("rolling",constants.BALL_ANIMATION_SPEED,true);
    if (tutorial){
        displayTutorial();
    }
}
