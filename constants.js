var constants;
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

function calculateConstants() {
constants.IN_GAME_MENU_BUTTON_WIDTH = constants.PAUSE_BUTTON_WIDTH;
constants.IN_GAME_MENU_WIDTH = constants.IN_GAME_MENU_BUTTON_WIDTH+2*constants.IN_GAME_MENU_MARGIN;
constants.IN_GAME_MENU_HEIGHT = 4*constants.IN_GAME_MENU_BUTTON_HEIGHT + (4+1)*constants.IN_GAME_MENU_MARGIN;
};

const BACKGROUND_HEIGHT = 480;
const BACKGROUND_WIDTH = 600;

//TASKBAR
const TASKBAR_HEIGHT = 100;
const TASKBAR_WIDTH = 600;
const MARGIN_TASKBAR = 15;
const PAUSE_BUTTON_WIDTH = 100;
const PAUSE_BUTTON_HEIGHT = 200;
//IN_GAME_MENU
const IN_GAME_MENU_BUTTON_WIDTH = PAUSE_BUTTON_WIDTH;
const IN_GAME_MENU_BUTTON_HEIGHT = 50;
const IN_GAME_MENU_MARGIN = 10;
const IN_GAME_MENU_WIDTH = IN_GAME_MENU_BUTTON_WIDTH+2*IN_GAME_MENU_MARGIN;
const IN_GAME_MENU_HEIGHT = 4*IN_GAME_MENU_BUTTON_HEIGHT + (4+1)*IN_GAME_MENU_MARGIN;

const TILE_SIZE = 60; //in pixels
const BALL_SPEED = 400;
const BALL_ANIMATION_SPEED = 3;
const TURN_SENSOR_PERCENTAGE = 0.4;

const NUMBER_OF_HELP_SCREEN=2;
