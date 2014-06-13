function playBlockedSound() {
	if (!mute) {
	var noise = game.add.audio('block',1,true);
	noise.play('',0,1,false);
	}
}

function playDropSound() {
	if (!mute) {
	var noise = game.add.audio('drop',1,true);
	noise.play('',0,1,false);
	}
}

function playIceSound() {
	if (!mute) {
	var noise = game.add.audio('ice',1,true);
	noise.play('',0,1,false);
	}
}

function playSteamSound() {
	if (!mute) {
	var noise = game.add.audio('gaz',1,true);
	noise.play('',0,1,false);
	}
}

function playGlassSound() {
	if (!mute) {
	var noise = game.add.audio('glass',1,true);
	noise.play('',0,1,false);
	}
}

function playSaltSound() {
	if (!mute) {
	var noise = game.add.audio('salted',1,true);
	noise.play('',0,1,false);
	}
}

function actionOnClickMute() {
	if (mute) {
		soundButton.setFrames(0,0,1);
	} else {
		soundButton.setFrames(1,1,0);
	}
	mute = !mute;
}