
Meteor.publish('server.retrieving.findForUser', function() {
		var selector={ownerId:this.userId};
		var secrets=Secrets.find(selector);
		return secrets;
	}
);

Meteor.methods({
	'server.retrieving.decryptedFindOne': function(args) {
		var secretPassword=args.secretPassword,
			selector=args.selector;
		//this should do something good with the secretPassword
		console.log("Server says, UNUSED SO FAR secretPassword=" + secretPassword);
		
		var secret=Secrets.findOne(selector);
		return secret;
	}
});