function update() {
	if(playing && !mainMenu){
		moveBall();
		textScore.setText("Score : " + score);
	}
}
