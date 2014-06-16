/** Add a cookie in the browser.
  * @param {string} name The name of the cookie.
  * @param {string} value The value wanted for this cookie.
  * @param {int} days (optional) Number of days before this cookie is removed.
  */

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

/** Read a cookie stored by the user browser.
  * @param {string} name The name of the cookie to read.
  * @return {string} The value of the cookie.
  */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
			return c.substring(nameEQ.length,c.length);
	}
   
	return null;
}

/** Update the cookie "levelmax".
  * @param {int} levelMax The higher level reached by the user.
  */
function updateCookieNbrLevel(levelMax) {
	createCookie("levelmax", levelMax, 30);
}

/** Update the cookie "stars".
  * @param {int} curLevel Level that the user has just done.
  */
function updateCookieStars(curLevel) {
	if(constants.USE_CORDOVA){
		var stars = window.localStorage.getItem("cookieSmartphone");
	}else{
		var stars = readCookie("stars");
	}
	if (currentLevel < nbrLevelAccessible) {
		//we already played the level
		previousScore = stars.substring(currentLevel-1, currentLevel);
		if (nbr > previousScore) {
			var before = stars.substring(0, currentLevel-1);
			var after = stars.substring((currentLevel),
					stars.length);
			stars = before + curLevel + after;
		}
	} else {
		//it it the first time we played the level
		stars = stars + curLevel;
	}	
	if(constants.USE_CORDOVA){
		window.localStorage.setItem("cookieSmartphone",stars);
	}else{
		createCookie("stars", stars, 30);
	}
}

/** Read the score that the user already achieved in a level.
  * @param {int} level The level from which we want to know the score.
  * @return {string} The score of 'level' from the cookie "stars"
  */
function readScore(level) {
	if(constants.USE_CORDOVA){
		var stars = window.localStorage.getItem("cookieSmartphone");
	}else{
		var stars = readCookie("stars");
	}
	if (level > stars.length) {
		return null;
	} else {
		return stars.substring(level-1, level);
	}
}
