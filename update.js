function update() {
	if(playing && !mainMenu && !selectLevelMenu){
		moveBall();
		textScore.setText("Score : " + score);
	}
}
