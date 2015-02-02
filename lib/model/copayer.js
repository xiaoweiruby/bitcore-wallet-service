'use strict';

var _ = require('lodash');
var Bitcore = require('bitcore');
var HDPublicKey = Bitcore.HDPublicKey;

var VERSION = '1.0.0';
var MESSAGE_SIGNING_PATH = "m/1/0";

function Copayer(opts) {
	opts = opts || {};

  this.version = VERSION;
	this.createdOn = Math.floor(Date.now() / 1000);
	this.id = opts.id;
	this.name = opts.name;
	this.xPubKey = opts.xPubKey;
	this.xPubKeySignature = opts.xPubKeySignature;  // So third parties can check independently
	if (opts.xPubKey) {
	  this.signingPubKey = this.getSigningPubKey();
	}
};

Copayer.prototype.getSigningPubKey = function () {
  if (!this.xPubKey) return null;
  return HDPublicKey.fromString(this.xPubKey).derive(MESSAGE_SIGNING_PATH).publicKey.toString();
};

Copayer.fromObj = function (obj) {
	var x = new Copayer();

  x.version = obj.version;
	x.createdOn = obj.createdOn;
	x.id = obj.id;
	x.name = obj.name;
	x.xPubKey = obj.xPubKey;
	x.xPubKeySignature = obj.xPubKeySignature;
  x.signingPubKey = obj.signingPubKey;

	return x;
};


module.exports = Copayer;