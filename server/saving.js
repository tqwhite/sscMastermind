
Meteor.methods({
	'NEW.models.secrets.save': function(secretFormData) {
	
	var	secretName=secretFormData.secretName,
		secretContent=secretFormData.secretContent,
		secretPassword=secretFormData.secretPassword,
		hiddenCodeName=secretFormData.hiddenCodeName, //only present on update
		originalSecretPassword=secretFormData.originalSecretPassword,
		_id=secretFormData._id,
		ownerId=secretFormData.ownerId; //this should probably not be input, it should be looked up
		
		//change the above to be validation
		
		cryptographer= new cryptography(secretFormData);
	
		var secretPackage=cryptography.encrypt(secretContent);
		var codeName=secret.codeName?decrypFromStorage(hiddenCodeName):'';
		
		var storagePackage=secretServerInterface.post({hiddenSecret:secretPackage.hiddenText, codeName:codeName});
		
		secret.key=cryptography.encryptForStorage(secret.key);
		secret.codeName=cryptography.encryptForStorage(storagePackage.codeName);
		

		
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


Meteor.methods({
	'server.models.secrets.save': function(secret) {
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