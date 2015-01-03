
Meteor.publish('findForUser', function() {
		var selector={ownerId:this.userId};
		var secrets=Secrets.find(selector);
		return secrets;
	}
);

Meteor.methods({
	'testSendString': function(arg) {
	console.log('heelo');
		return "hello: "+arg
	}
});