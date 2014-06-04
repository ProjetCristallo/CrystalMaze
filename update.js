function update() {
	if(playing && !mainMenu){
		moveBall();
		text.setText("Score : " + score);
	}
}
