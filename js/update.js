/** Update the game display and physics (useless if playing == false).
  */
function update() {
	if(playing){
		moveBall();
		textScore.setText("Moves : " + score);
	}
}
