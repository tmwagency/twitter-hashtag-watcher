/*
	sockets.js
*/

// dependencies for this module go here
var UI = require('./ui');

var Sockets = {
	socket : null,

	init : function () {
		console.debug('KO.sockets module is being initialised');

		this.makeSocketConnection();

		this.Listeners.setup();
	},

	makeSocketConnection : function () {

		var connectionURL = window.location.hostname + ':' + window.location.port;

		this.socket = io.connect(connectionURL);

	},

	Listeners : {

		setup : function () {

			Sockets.socket.on('tweet', this.onTweetReceived);

		},

		onTweetReceived : function (symbolObj) {

			// log('on tweet received');
			UI.updateSymbol(symbolObj.key, symbolObj.symbol);

		},

		onStateReceived : function (stateObj) {

			for (var key in stateObj) {
				UI.updateSymbol(key, stateObj[key]);
			}

		}

	}


};

module.exports = Sockets;