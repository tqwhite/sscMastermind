


cryptography = function(args) {

		this.secretName=args.secretName;
		this.secretContent=args.secretContent;
		this.storageKey=args.storageKey;
		this.hiddenCodeName=args.hiddenCodeName; //only present on update
		this.originalSecretPassword=args.originalSecretPassword;
		
		this.hiddenSuperKey=args.hiddenSuperKey;

		
		var self=this;
		
		var crypto = Npm.require('crypto'),
			algorithm = 'aes-256-ctr';

		var genSuperKey = function() {
			var superKey = crypto.randomBytes(33);
			return superKey.toString('binary');
		}

		var encryptSecret= function() {
			var message=self.secretContent;
			var superKey = genSuperKey();
			self.superKey=superKey;

			var cipher = crypto.createCipher(algorithm, superKey)
			var hiddenText = cipher.update(message, 'utf8', 'hex')
			hiddenText += cipher.final('hex');

			self.hiddenSecretContent=hiddenText;
			self.superKey=superKey;
		},

			decryptSecret= function(superKey, hiddenText) {
				var decipher = crypto.createDecipher(algorithm, superKey)
				var plaintext = decipher.update(hiddenText, 'hex', 'utf8')
				plaintext += decipher.final('utf8');
				return plaintext
			},

			encryptForStorage= function(storageKey, base64Message) {
				var cipher = crypto.createCipher(algorithm, storageKey)
				var hiddenBinary = cipher.update(base64Message.toString('binary'), 'binary', 'binary')
				hiddenBinary += cipher.final();
				var base64HiddenText = hiddenBinary.toString('base64')
				return base64HiddenText;
			},

			decryptFromStorage= function(storageKey, base64HiddenText) {
				var binaryMessage = base64HiddenText.toString('binary');
				var decipher = crypto.createDecipher(algorithm, storageKey)
				var plainBinary = decipher.update(binaryMessage, 'binary', 'binary')
				plainBinary += decipher.final();
				return plainBinary;
			};
		
		if (this.hiddenSuperKey){
			this.superKey=decryptFromStorage(this.storageKey, this.hiddenSuperKey);
		}

		
		this.getHiddenSecretContent=function(){
					
			if (!self.hiddenSecretContent){
				encryptSecret(this.secretContent); 
			}
			return self.hiddenSecretContent;
		}
		
		
		this.setHiddenSecretContent=function(hiddenSecretContent){
			self.hiddenSecretContent=hiddenSecretContent;
		}
		
		this.getOpenSecretContent=function(){
			return decryptSecret(this.secretKey, this.hiddenSecretContent);
		}
		
		this.setCodeName=function(codeName){
			self.codeName=codeName;
		}
		
		this.getHiddenSuperKey=function(){
			if (!self.superKey){
				encryptSecret(this.secretContent);
			}
			var datum=self.superKey,
				key=self.storageKey
			var outData = encryptForStorage(key, datum);
				
			return outData;
		}
		
		this.TESTINGgetHiddenSuperKey=function(){
			if (!self.superKey){
				encryptSecret(this.secretContent);
			}
			var datum=self.superKey,
				key=self.storageKey,
					displayName = 'superKey/storageKey';
					
				console.log("\n\n\n" + displayName + " real=\n" + datum.toString('base64'));
				
				var outData = encryptForStorage(key, datum);
				var test = decryptFromStorage(key, outData);
				
				console.log(displayName + " test=\n" + test.toString('base64'));
				if (datum.toString('base64') == test.toString('base64')) {
					console.log(displayName + "\nMATCHES");
				}
				console.log("\n\n\n");

				
			return outData;
		}
		
		this.getHiddenCodeName=function(){
			if (self.hiddenCodeName){
				return self.hiddenCodeName;
			}
			else{
				var datum = self.codeName,
					key = self.superKey;
				var outData = encryptForStorage(key, datum);
				return outData;
			}
		}
		
		this.TESTINGgetHiddenCodeName=function(){
			if (self.hiddenCodeName){
				return self.hiddenCodeName;
			}
			else{
			
			

				var datum = self.codeName,
					key = self.superKey,
					displayName = 'codeName/superKey';
					
				console.log("\n\n\n" + displayName + " real=\n" + datum.toString('binary').toString('base64'));
				
				var outData = encryptForStorage(key, datum);
				var test = decryptFromStorage(key, outData);
				
				console.log("\n\n"+displayName + " test2=\n" + test.toString('hex'));
				console.log('------------------------');
				if (datum == test) {
					console.log("\n"+displayName + "MATCHES");
				}
				
				
				
				console.log("\n\n\n");

				
				return outData;
			}
		}
		
		this.getOpenCodeName=function(){
			if (!this.secretKey){
				this.secretKey=decryptFromStorage(this.storageKey, this.hiddenSuperKey);
			}
			return decryptFromStorage(this.superKey, this.hiddenCodeName);
		}
		
		
return this;
}


var verifyCryptoObject=function(){

//simulate storage ===============================================================
console.log("\n\n\n========= save simulation ==========\n\n\n");
/*
1) generate superKey - implicit
2) encrypt hiddenSecretContent with superKey
3) get codeName from secretServer.post(hiddenSecretContent) - simulated
4) encrypt hiddenCodeName with superKey
5) encrypt hiddenSecretKey with storageKey/userPassword
6) save hiddenCodeName, hiddenSecretKey, etc
*/
var crypto = Npm.require('crypto')

var userPassword='secretPassword',
	userSecretContent='Another happy day',
	userSuppliedName='TQ test secret';

//simulate input from entryForm
var testArgsSave={
		secretName:userSuppliedName,
		secretContent:userSecretContent,
		storageKey:userPassword,
		hiddenCodeName:'', //only present on update
		originalSecretPassword:userPassword
};

var cryptographer=new cryptography(testArgsSave);

var hiddenSecretContent=cryptographer.getHiddenSecretContent();

var newCodeName=crypto.randomBytes(33).toString('base64'); //this stands in for the secretServer.post(hiddenSecretContent) which returns a codeName
console.dir("newCodeName64="+newCodeName);

cryptographer.setCodeName(newCodeName);

	var hiddenSuperKey=cryptographer.getHiddenSuperKey();
console.log('hiddenSuperKey='+hiddenSuperKey+'\n');


	var hiddenCodeName=cryptographer.getHiddenCodeName();

var saveObject={
	secretName:testArgsSave.secretName, //this is just for labeling purposes
	hiddenSuperKey:hiddenSuperKey,
	hiddenCodeName:hiddenCodeName
}
console.log("\n-----------\n");
console.dir({saveObject:saveObject});

//simulate retrieval ===============================================================
console.log("\n\n\n========= retrieval simulation ==========\n\n\n");
/*
1) decode super key with storageKey/userPassword - implicit
2) decode code name with superKey
3) get hiddenSecret from secretServer.get(codeName) - simulated
4) decode secretContent with superKey
5) put secretContent, codeName and storageKey/userPassword, etc, into formData
*/

var testArgsRetrieve=saveObject; //simulate data returned from Mongo and secretKeyEntryForm, ie, userPassword

var userPassword=userPassword; //would be user input, spec'd above for simulation

testArgs=testArgsRetrieve;
testArgs.storageKey=userPassword;

var cryptographer=new cryptography(testArgs);

var openCodeName=cryptographer.getOpenCodeName();
//hiddenSecretContent=secretServer.get(openCodeName); //from above in simulation
cryptographer.setHiddenSecretContent(hiddenSecretContent);
var openSecretContent=cryptographer.getOpenSecretContent();

var retrievedCodeName = openCodeName.toString('base64'); //yields a 44 character file name
console.log('retrievedCodeName='+retrievedCodeName+'\n');



var formData={
	secretName:testArgsSave.secretName,
	secretContent:openSecretContent,
	secretPassword:'assffasdaf'

}

console.dir({formData:formData});


if (openCodeName.toString('base64')===newCodeName.toString('base64')){
	console.log('CODE NAME MATCHES');
}
else{
	console.log("CODE NAME FAILS AFTER DECRYPTION");
}
if (formData.secretContent==userSecretContent){
	console.log("SECRET CONTENT MATCHES");
}
else{
	console.log("SUCKS TO BE ME");
}


}
//verifyCryptoObject();




