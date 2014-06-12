function playBlockedSound() {
	var noise = game.add.audio('block',1,true);
	noise.play('',0,1,false);
}

function playDropSound() {
	var noise = game.add.audio('drop',1,true);
	noise.play('',0,1,false);
}

function playIceSound() {
	var noise = game.add.audio('ice',1,true);
	noise.play('',0,1,false);
}

function playSteamSound() {
	var noise = game.add.audio('gaz',1,true);
	noise.play('',0,1,false);
}

function playGlassSound() {
	var noise = game.add.audio('glass',1,true);
	noise.play('',0,1,false);
}

function playSaltSound() {
	var noise = game.add.audio('salt',1,true);
	noise.play('',0,1,false);
}