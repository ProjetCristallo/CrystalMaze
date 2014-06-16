/**
 * the number of the help page currently displayed.
*/
var posInHelp;

/** Handles a click on the "help" button:
  * If help screen is already being displayed, closes it.
  * Else, displays the first page.
  */
function help()
{
	if (buttonNext.alive) {
	//help screen is currently being displayed
		helpClose();
	} else {
		posInHelp = 1;
		displayHelp(posInHelp);
	}
}

/** Initializes the help screen : adds the help screens sprites
  * to the game along with the buttons "next", "previous", "close" 
  * and the text indicating which page is displayed.
  */
function initializeHelpScreen()
{
	//Buttons
	buttonNext = game.add.button(0.75*constants.BACKGROUND_WIDTH, 
				0.78*constants.BACKGROUND_HEIGHT, 'buttonNextImage', 
				clickHelpNext,this,0,1,2);
		buttonPrev = game.add.button(0.15*constants.BACKGROUND_WIDTH,
				0.78*constants.BACKGROUND_HEIGHT, 'buttonPrevImage', 
				clickHelpPrev,this,2,1,0);
		buttonClose = game.add.button(0.82*constants.BACKGROUND_WIDTH,
				0.15*constants.BACKGROUND_HEIGHT, 'buttonCloseImage',
				helpClose,this,0,1,2);
		posText = game.add.text(0.48*constants.BACKGROUND_WIDTH,0.83*
			constants.BACKGROUND_HEIGHT,
			posInHelp + '/' + constants.NUMBER_OF_HELP_SCREEN,
			{font: "15px Arial",fill: "#000000",align: "center"});
	//Screens			
	for(var i=1;i<=constants.NUMBER_OF_HELP_SCREEN; i++){
		helpScreens[i-1] = (game.add.sprite(
					0.1*constants.BACKGROUND_WIDTH,
					0.1*constants.BACKGROUND_HEIGHT,
					'helpScreen'+i));
	}
}

/** Displays a specific help page : 
  * Revives and brings on top the given page and all the buttons.
  */
function displayHelp()
{
	playing = false;
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

/** Displays the next help page : 
  * Destroys the current page and calls 
  * displayHelp on the next page
  * (the next page is page one if current page is last page).
  */
function clickHelpNext()
{
	posText.destroy();
	posInHelp++;
	if(posInHelp>constants.NUMBER_OF_HELP_SCREEN){
		posInHelp=1;
	}
	displayHelp(posInHelp);
}

/** Displays the previous help page : 
  * Destroys the current page and calls 
  * displayHelp on the previous page
  * (the previous page is last page if current page is first page).
  */
function clickHelpPrev()
{
	posText.destroy();
	posInHelp--;
	if(posInHelp<1){
		posInHelp=constants.NUMBER_OF_HELP_SCREEN;
	}
	displayHelp();
}

/** Closes help menu : 
  * kills all buttons and pages.
  */
function helpClose()
{
	playing = true;
	helpScreens.forEach(function(screen){screen.kill()});
	buttonNext.kill();
	buttonPrev.kill();
	buttonClose.kill();
	posText.destroy();
}
