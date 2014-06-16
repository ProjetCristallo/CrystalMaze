function initializeTutorial()
{   
    if(nbrScreenTuto[currentLevelTuto - 1] != 0){
	playing = false;
	for(var i=1;i<=nbrScreenTuto[currentLevelTuto - 1]; i++){
	    
	    tutoScreens[i-1] = (game.add.sprite(
		0.03*constants.BACKGROUND_WIDTH,
		0.03*constants.BACKGROUND_HEIGHT,
		'tutorial'+currentLevelTuto+"-"+i));
	}
	posInTuto = 1;
	buttonCloseTuto = game.add.button(0.23*constants.BACKGROUND_WIDTH,
					  0.35*constants.BACKGROUND_HEIGHT, 'buttonCloseTuto',
					  tutoClose,this,0,1,2);
	buttonNextTuto = game.add.button(0.23*constants.BACKGROUND_WIDTH, 
				     0.35*constants.BACKGROUND_HEIGHT, 'buttonNextTuto', 
					 clickTutoNext,this,0,1,2);
    } else {
	posInTuto = 0;
    }
}

function displayTutorial()
{
    if(posInTuto != 0){
    	tutoScreens[posInTuto-1].revive();
	tutoScreens[posInTuto-1].bringToTop();
	if (posInTuto != nbrScreenTuto[currentLevelTuto - 1])
	{
	    buttonNextTuto.revive();
	    buttonNextTuto.bringToTop();
	} else {
	    buttonCloseTuto.revive();
	    buttonCloseTuto.bringToTop();
	}    
    }
}

function tutoClose()
{
    tutoScreens.forEach(function(screen){screen.kill()});
    buttonNextTuto.kill();
    buttonCloseTuto.kill();
}

function clickTutoNext()
{
	posInTuto++;
	if(posInTuto>nbrScreenTuto[currentLevelTuto - 1]){
		posInTuto=1;
	}
	displayTutorial();
}
