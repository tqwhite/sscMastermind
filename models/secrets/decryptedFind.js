Meteor.methods({
	'models.secrets.decryptedFindOne': function(args) {
		var secretPassword=args.secretPassword,
			selector=args.selector;
		//this should do something good with the secretPassword
		console.log("UNUSED SO FAR secretPassword=" + secretPassword);
		var secret=Secrets.findOne(selector);
		return secret;
	}
});