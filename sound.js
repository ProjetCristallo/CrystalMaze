function playBlockedSound() {
	noise = game.add.audio('block',1,true);
	noise.play('',0,1,false);
}

function playDropSound() {
	drop = game.add.audio('drop',1,true);
	drop.play('',0,1,false);
}

function playIceSound() {
	ice = game.add.audio('ice',1,true);
	ice.play('',0,1,false);
}

function playSteamSound() {
	gaz = game.add.audio('gaz',1,true);
	gaz.play('',0,1,false);
}

function playGlassSound() {
	glass = game.add.audio('glass',1,true);
	glass.play('',0,1,false);
}

function playSaltSound() {
	salt = game.add.audio('salt',1,true);
	salt.play('',0,1,false);
}