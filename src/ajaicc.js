(function () {
    // Set the root object
    const root = this;
    // Create object ference
    var ajaicc = function (obj) {
        if (obj instanceof ajaicc) return obj;
        if (!(this instanceof ajaicc)) return new ajaicc(obj);
        this.ajaiccwrapped = obj;
    };
	// Add ajaicc as a global object.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = ajaicc;
		}
		exports.ajaicc = ajaicc;
	} else {
		root.ajaicc = ajaicc;
	}

	// Private methods
	//
    // Case insensitive method to get querystring parameters. LMS' may or may not capitalize the AICC parameters they pass so better safe than sorry!
    const getQueryStringParameter = function (key) {
        key = key.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)', 'i'),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	// getAICC returns the existing AICC session from the LMS
	const getAICC = function (callback) {
		// Set defaults for omitted parameters
		if (typeof (callback) === 'undefined') callback = null;
		var oReq = new XMLHttpRequest();
		// Tell the LMS we are perform a GET action and pass along the AICC session ID
		var oParams = 'command=GetParam&t=' + Date.now() + '&version=3.5&session_id=' + encodeURIComponent(aiccSID);
		oReq.addEventListener("load", function () {
			// Parse the AICC response and create the aiccData object to store the data
			var response = this.responseText.split('\r\n');
			var aiccData = {};
			for (var t = 0; t < response.length; t++) {
				if (response[t].indexOf('=') > -1) {
					var keyValue = response[t].split('=');
					if (keyValue.length == 1) {
						aiccData[keyValue[0].toLowerCase()] = '';
					} else if (keyValue.length == 2) {
						aiccData[keyValue[0].toLowerCase()] = keyValue[1];
					}
				}
			}
			// Send the aiccData to the callback function if one was specified
			if (callback != null) callback(aiccData);
		});
		// If the request to the LMS returns an error, log it to the console
		oReq.addEventListener('error', function () { console.error('AICC Get from LMS failed') });
		// Send the request to the LMS
		oReq.open('POST', aiccURL, true);
		oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		oReq.send(oParams);
	}
	const putAICC = function (location, credit, score, time, status, exit, callback) {
		// Set defaults for omitted parameters
		if (typeof (location) === 'undefined') location = '';
		if (typeof (credit) === 'undefined') credit = 'N';
		if (typeof (score) === 'undefined') score = 0;
		if (typeof (time) === 'undefined') time = '';
		if (typeof (status) === 'undefined') status = 'I';
		if (typeof (exit) === 'undefined') exit = false;
		if (typeof (callback) === 'undefined') callback = null;
		var oReq = new XMLHttpRequest();
		// Tell the LMS we are perform a PUT action and pass along the AICC session ID and AICC data
		var oParams = 'command=PutParam&t=' + Date.now() + '&version=3.5&session_id=' + encodeURIComponent(aiccSID) + '&aicc_data=[Core]\nLesson_Location=' + location + '\nLesson_Status=' + status + '\nScore=' + score + '\nTime=' + time;
		oReq.addEventListener('load', function () {
			// Parse the AICC response and create the aiccData object to store the data
			var response = this.responseText.split('\r\n');
			var aiccData = {};
			for (var t = 0; t < response.length; t++) {
				if (response[t].indexOf('=') > -1) {
					var keyValue = response[t].split('=');
					if (keyValue.length == 1) {
						aiccData[keyValue[0].toLowerCase()] = '';
					} else if (keyValue.length == 2) {
						aiccData[keyValue[0].toLowerCase()] = keyValue[1];
					}
				}
			}
			// Send the aiccData to the callback function if one was specified
			if (callback != null) callback(aiccData);
			if (exit) exitAICC();
		});
		// If the request to the LMS returns an error, log it to the console
		oReq.addEventListener('error', function () { console.error('AICC Set from LMS failed') });
		// Send the request to the LMS
		oReq.open('POST', aiccURL, true);
		oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		oReq.send(oParams);
	}
	const exitAICC = function (callback) {
		// Set defaults for omitted parameters
		if (typeof (callback) === 'undefined') callback = null;
		var oReq = new XMLHttpRequest();
		// Tell the LMS we are perform an EXIT action and pass along the AICC session ID
		var oParams = 'command=ExitAU&t=' + Date.now() + '&version=3.5&session_id=' + encodeURIComponent(aiccSID) + '&aicc_data=';
		oReq.addEventListener('load', function () {
			// Parse the AICC response and create the aiccData object to store the data
			var response = this.responseText.split('\r\n');
			var aiccData = {};
			for (var t = 0; t < response.length; t++) {
				if (response[t].indexOf('=') > -1) {
					var keyValue = response[t].split('=');
					if (keyValue.length == 1) {
						aiccData[keyValue[0].toLowerCase()] = '';
					} else if (keyValue.length == 2) {
						aiccData[keyValue[0].toLowerCase()] = keyValue[1];
					}
				}
			}
			// Send the aiccData to the callback function if one was specified
			if (callback != null) callback(aiccData);
		});
		// If the request to the LMS returns an error, log it to the console
		oReq.addEventListener('error', function () { console.error('AICC Exit from LMS failed') });
		// Send the request to the LMS
		oReq.open('POST', aiccURL, true);
		oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		oReq.send(oParams);
	}

    // Private variables
	//
    const aiccSID = getQueryStringParameter('aicc_sid');
    const aiccURL = getQueryStringParameter('aicc_url');
    var foundLMSParams = false;
    // Determine if the AICC querystring vars are present
	if (aiccSID != null && aiccSID != '' && aiccURL != null && aiccURL != '') foundLMSParams = true;

	// Public methods
	//
	// Returns a boolean whether AICC_SID and AICC_URL querystring parameters were found
	ajaicc.foundLMSParams = function () {
		return foundLMSParams;
	}
	// Gets the current AICC session from the LMS
	ajaicc.aiccGet = function (callback) {
		return getAICC(callback);
	}
	// Puts the specified AICC data to the LMS
	ajaicc.putAICC = function (location, credit, score, time, status, exit, callback) {
		return putAICC(location, credit, score, time, status, exit, callback);
	}
	// Exits the AICC session in the LMS
	ajaicc.exitAICC = function (callback) {
		return exitAICC(callback);
	}
}.call(this));
