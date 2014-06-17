/** If not mute then play the sound corresponding to blockSoundUrl.
  */
function playBlockedSound() {
	if (!mute) {
	var noise = game.add.audio('block',1,true);
	noise.play('',0,1,false);
	}
}

/** If not mute then play the sound corresponding to dropSoundUrl.
  */
function playDropSound() {
	if (!mute) {
	var noise = game.add.audio('drop',1,true);
	noise.play('',0,1,false);
	}
}

/** If not mute then play the sound corresponding to iceSoundUrl.
  */
function playIceSound() {
	if (!mute) {
	var noise = game.add.audio('ice',1,true);
	noise.play('',0,1,false);
	}
}

/** If not mute then play the sound corresponding to gazSoundUrl.
  */
function playSteamSound() {
	if (!mute) {
	var noise = game.add.audio('gaz',1,true);
	noise.play('',0,1,false);
	}
}

/** If not mute then play the sound corresponding to glassSoundUrl.
  */
function playGlassSound() {
	if (!mute) {
	var noise = game.add.audio('glass',1,true);
	noise.play('',0,1,false);
	}
}

/** If not mute then play the sound corresponding to saltedSoundUrl.
  */
function playSaltSound() {
	if (!mute) {
	var noise = game.add.audio('salted',1,true);
	noise.play('',0,1,false);
	}
}

/** If not mute then play the sound corresponding to lostSoundUrl.
  */
function playLostSound() {
	if (!mute) {
	var noise = game.add.audio('lost',1,true);
	noise.play('',0,1,false);
	}
}


/** Change the mute setting (if mute -> unmute, else unmute -> mute).
  */
function actionOnClickMute() {
	if (mute) {
		soundButton.setFrames(0,0,1);
	} else {
		soundButton.setFrames(1,1,0);
	}
	mute = !mute;
}
