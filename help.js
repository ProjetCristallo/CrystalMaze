function help()
{
	if (!buttonNext) {
		//the help screen hasn't been opened yet
		buttonNext = game.add.button(0.75*constants.BACKGROUND_WIDTH, 
				0.78*constants.BACKGROUND_HEIGHT, 'buttonNextImage', 
				clickHelpNext,this,0,1,2);
		buttonPrev = game.add.button(0.15*constants.BACKGROUND_WIDTH,
				0.78*constants.BACKGROUND_HEIGHT, 'buttonPrevImage', 
				clickHelpPrev,this,2,1,0);
		buttonClose = game.add.button(0.82*constants.BACKGROUND_WIDTH,
				0.15*constants.BACKGROUND_HEIGHT, 'buttonCloseImage',
				clickHelpClose,this,0,1,2);
		posInHelp = 1;
		initializeHelpScreen();
		displayHelp();
	} else {
		if (buttonNext.alive) {
			//the help screen is currently displayed
			clickHelpClose();
		} else {
			posInHelp = 1;
			displayHelp();
		}
	}
}

function initializeHelpScreen()
{
	for(var i=1;i<=constants.NUMBER_OF_HELP_SCREEN; i++){
		helpScreens[i-1] = (game.add.sprite(
					0.1*constants.BACKGROUND_WIDTH,
					0.1*constants.BACKGROUND_HEIGHT,
					'helpScreen'+i));
	}
}

function displayHelp()
{
	helpScreens[posInHelp-1].revive();
	helpScreens[posInHelp-1].bringToTop();
	buttonNext.revive();
	buttonNext.bringToTop();
	buttonPrev.revive();
	buttonPrev.bringToTop();
	buttonClose.revive();
	buttonClose.bringToTop();
	posText = game.add.text(0.48*constants.BACKGROUND_WIDTH,0.83*
			constants.BACKGROUND_HEIGHT,
			posInHelp + '/' + constants.NUMBER_OF_HELP_SCREEN,
			{font: "15px Arial",fill: "#000000",align: "center"});
}

function clickHelpNext()
{
	posText.destroy();
	posInHelp++;
	if(posInHelp>constants.NUMBER_OF_HELP_SCREEN){
		posInHelp=1;
	}
	displayHelp();
}

function clickHelpPrev()
{
	posText.destroy();
	posInHelp--;
	if(posInHelp<1){
		posInHelp=constants.NUMBER_OF_HELP_SCREEN;
	}
	displayHelp();
}

function clickHelpClose()
{
	helpScreens.forEach(function(screen){screen.kill()});
	buttonNext.kill();
	buttonPrev.kill();
	buttonClose.kill();
	posText.destroy();
}
