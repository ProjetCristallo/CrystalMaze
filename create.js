function create() {
	game.add.tileSprite(0,0,600,480,'Fond');

	game.physics.startSystem(Phaser.Physics.ARCADE);

	createLevel();

	controller = game.input.keyboard.createCursorKeys();
}
