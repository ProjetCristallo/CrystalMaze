/** Initialize the view in tutorial mode, load the ressources.
  */
function initializeTutorial()
{   
	playing = false;
	for(var i=0;i<tutoStruct.nbrScreenTuto[tutoStruct.currentLevelTuto - 1];
		       	i++){
	    
	    tutoStruct.tutoScreens[i] = (game.add.sprite(
		0.03*constants.BACKGROUND_WIDTH,
		0.03*constants.BACKGROUND_HEIGHT,
		'tutorial'+tutoStruct.currentLevelTuto+"-"+(i+1)));
	}
	tutoStruct.posInTuto = 1;
	buttonCloseTuto = game.add.button(0.23*constants.BACKGROUND_WIDTH,
					  0.35*constants.BACKGROUND_HEIGHT,
					  'buttonCloseTuto',
					  tutoClose,this,0,1,2);
	buttonNextTuto = game.add.button(0.23*constants.BACKGROUND_WIDTH, 
					 0.35*constants.BACKGROUND_HEIGHT, 
					 'buttonNextTuto', 
					 clickTutoNext,this,0,1,2);
}

/** Display the appropriate tutorial screen.
  */
function displayTutorial()
{
    if(tutoStruct.posInTuto != 0){
	playing = false;
    	tutoStruct.tutoScreens[tutoStruct.posInTuto-1].revive();
	tutoStruct.tutoScreens[tutoStruct.posInTuto-1].bringToTop();
	if (tutoStruct.posInTuto != tutoStruct.
			nbrScreenTuto[tutoStruct.currentLevelTuto - 1])
	{
	    buttonNextTuto.revive();
	    buttonNextTuto.bringToTop();
	} else {
	    buttonCloseTuto.revive();
	    buttonCloseTuto.bringToTop();
	}    
    }
}

/** Close the tutorial help screen.
  */
function tutoClose()
{
    playing = true;
    for(var i = 0; i<tutoStruct.nbrScreenTuto[tutoStruct.currentLevelTuto - 1];
		    i++) {
	tutoStruct.tutoScreens[i].kill();
    }
    buttonNextTuto.kill();
    buttonCloseTuto.kill();
}

/** Switch to the next tutorial help screen.
  */
function clickTutoNext()
{
	tutoStruct.posInTuto++;
	if(tutoStruct.posInTuto>tutoStruct.
			nbrScreenTuto[tutoStruct.currentLevelTuto - 1]){
		tutoStruct.posInTuto=1;
	}
	displayTutorial();
}
