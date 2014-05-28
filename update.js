function update() {
	if(playing && blop){
		moveBall();
		text.setText("Score : " + score);
	}
}
