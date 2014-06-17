/** Variable containing all of the constants define in a yaml file.
  */
var constants;

/** Read a yaml file and load it in the global variable constants.
  * @param {string} filename File to be read (must be a yaml file).
  */
function readConstants(fileName){
	if(document.all) {
		var file = new ActiveXObject("Scripting.FileSystemObject");
	}
	else
	{
		var file = new XMLHttpRequest();
	}
	file.open("GET", fileName, false);
	file.send();
	constants = jsyaml.load(file.responseText);
	calculateConstants();
};

/** Calculate some useful constants to simplify the code.
  */
function calculateConstants() {
	constants.IN_GAME_MENU_BUTTON_WIDTH = constants.PAUSE_BUTTON_WIDTH;
	constants.IN_GAME_MENU_WIDTH = constants.IN_GAME_MENU_BUTTON_WIDTH
		+2*constants.IN_GAME_MENU_MARGIN;
	constants.IN_GAME_MENU_HEIGHT = 4*constants.IN_GAME_MENU_BUTTON_HEIGHT 
		+ (4+1)*constants.IN_GAME_MENU_MARGIN;
};
