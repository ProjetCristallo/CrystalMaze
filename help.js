function help()
{
	buttonNext = game.add.button(0.75*BACKGROUND_WIDTH, 
			0.78*BACKGROUND_HEIGHT, 'buttonNextImage', 
			clickHelpNext,this,0,1,2);
	buttonPrev = game.add.button(0.15*BACKGROUND_WIDTH,
			0.78*BACKGROUND_HEIGHT, 'buttonPrevImage', 
			clickHelpPrev,this,0,1,2);
	buttonClose = game.add.button(0.82*BACKGROUND_WIDTH,
			0.15*BACKGROUND_HEIGHT, 'buttonCloseImage',
			clickHelpClose,this,0,1,2);
	posInHelp = 1;
	initializeHelpScreen();
	displayHelp();
}

function initializeHelpScreen()
{
	for(var i=1;i<=NUMBER_OF_HELP_SCREEN; i++){
		helpScreens.push(game.add.sprite(0.1*BACKGROUND_WIDTH,
					0.1*BACKGROUND_HEIGHT,'helpScreen'+i));
	}
}

function displayHelp()
{
	/*switch(posInHelp){
	  case 1:
	  helpScreen=game.add.sprite(0.1*BACKGROUND_WIDTH,
	  0.1*BACKGROUND_HEIGHT, 'helpScreen1');

	  buttonNext.bringToTop();
	  buttonPrev.bringToTop();
	  buttonClose.bringToTop();
	  break;
	  case 2:
	  helpScreen=game.add.sprite(0.1*BACKGROUND_WIDTH,
	  0.1*BACKGROUND_HEIGHT, 'helpScreen2');
	  buttonNext.bringToTop();
	  buttonPrev.bringToTop();
	  buttonClose.bringToTop();

	  break;
	  }*/
	helpScreens[posInHelp-1].bringToTop();
	buttonNext.bringToTop();
	buttonPrev.bringToTop();
	buttonClose.bringToTop();
	posText = game.add.text(0.48*BACKGROUND_WIDTH,0.83*BACKGROUND_HEIGHT,
			posInHelp + '/6',{font: "15px Arial",fill: "#000000",
			align: "center"});

}

function clickHelpNext()
{
	posText.destroy();
	posInHelp++;
	if(posInHelp>NUMBER_OF_HELP_SCREEN){
		posInHelp=1;
	}
	displayHelp();
}

function clickHelpPrev()
{
	posText.destroy();
	posInHelp--;
	if(posInHelp<1){
		posInHelp=NUMBER_OF_HELP_SCREEN;
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
