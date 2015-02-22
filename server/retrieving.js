


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
		
		var secret=Secrets.findOne(selector);

		var cryptographer = new cryptography.v1({
			secretName: secret.secretName,
			hiddenCodeName: secret.hiddenCodeName,
			hiddenSuperKey: secret.hiddenSuperKey,
			storageKey:secretPassword
		});

		var codeName=cryptographer.getOpenCodeName();

		var serverInfoPackage = secretServerInterface.get({
			codeName: secret.hiddenCodeName
		});			
		var secretContent=serverInfoPackage.content.fileData; //cryptographer.getOpenSecretContent()
		
//		cryptographer.setHiddenSecretContent(secretContent);
		
//		var secret=cryptographer.getOpenSecretContent();


/*

STATUS: 

1) server saves files correctly
2) server sends data back that appears to be correct
3) code name is not managed correctly, don't presently know where it goes bad
4) file data gets back to client, appears to be a byte streamsalty
5) cypto won't operate on it, though, wrong data type
6) secret SIX has it's file name hard coded and should have the correct key in the db

*/
		var formData={
			secretName:secret.secretName,
			secretContent:secretContent,
			secretPassword:secretPassword,
			_id:secret._id,
			originalSecretPassword:secretPassword,
			hiddenCodeName:secret.hiddenCodeName
		};
		return formData;
	}
});