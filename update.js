function update() {
	if(playing && main_menu){
		moveBall();
		text.setText("Score : " + score);
	}
}
