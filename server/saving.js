
Meteor.methods({
	'server.models.secrets.save': function(secretFormData) {

		//change the above to be validation

		var cryptographer = new cryptography.v1({
			secretName: secretFormData.secretName,
			secretContent: secretFormData.secretContent,
			storageKey: secretFormData.secretPassword
		});

		var hiddenSecretContent = cryptographer.getHiddenSecretContent();

		var serverInfoPackage = secretServerInterface.post({
			hiddenSecret: hiddenSecretContent,
			annotation: secretFormData.secretName
		});
		cryptographer.setCodeName(serverInfoPackage.data.codeName);


console.log('serverInfoPackage.data.codeName='+serverInfoPackage.data.codeName+'\n');


		saveObj = {};
		saveObj.hiddenCodeName = cryptographer.getHiddenCodeName();
		saveObj.hiddenSuperKey = cryptographer.getHiddenSuperKey();
		saveObj.secretName = secretFormData.secretName;
		saveObj._id = secretFormData._id;
		saveObj.ownerId = secretFormData.ownerId;



		if (!secretFormData._id) {
			delete saveObj._id;
			saveObj._id = Secrets.insert(saveObj);
		} else {
			Secrets.update(saveObj._id, saveObj);
		}
		return {
			refId: saveObj._id
		}



	}
});


Meteor.methods({
	'models.secrets.save': function(secret) {
		console.dir(secret);
		delete secret.key;
		if (!secret._id) {
			delete secret._id;
			secret._id = Secrets.insert(secret);
		} else {
			Secrets.update(secret._id, secret);
		}
		return {
			refId: secret._id
		}
	}
});
