function update() {
	if(playing){
		moveBall();
		textScore.setText("Moves : " + score);
	}
}
