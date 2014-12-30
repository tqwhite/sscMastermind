

Meteor.methods({
	'models.secrets.save': function(secret) {
		delete secret.key;
		if (!secret._id){
			delete secret._id;
			secret._id=Secrets.insert(secret);
		}
		else{
			Secrets.update(secret._id, secret);
		}
		return {
			refId: secret._id
		}
	}
});
