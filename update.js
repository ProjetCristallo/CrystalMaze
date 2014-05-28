function update() {
	if(playing){
		moveBall();
		text.setText("Score : " + score);
	}
}
