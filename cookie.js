function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function updateCookieNbrLevel(nbr) {
	createCookie("levelmax", nbrLevelAccessible, 30);
}

function updateCookieStars(nbr) {
	var stars = readCookie("stars");
	if (currentLevel < nbrLevelAccessible) {
		//we already played the level
		previousScore = stars.substring(currentLevel-1, currentLevel);
		if (nbr > previousScore) {
			var before = stars.substring(0, currentLevel-1);
			var after = stars.substring((currentLevel+1),stars.length);
			stars = before + nbr + after;
		}
	} else {
		//it it the first time we played the level
		stars = stars + nbr;
	}	
	createCookie("stars", stars, 30);
}