var testCrypto = function() {

console.log("======================\n\n");
var crypto = Npm.require('crypto'),
	algorithm = 'aes-256-ctr';

	var userPassword = "MyWife'sName";
	
//Start with this message;
	message = 'goodbye cruel world';

//generate a 264 bit key
	var testKey = crypto.randomBytes(33);
	var binaryKey = testKey.toString('binary'); //this prevents cracking from detecting success

//encrypt message
	var cipher = crypto.createCipher(algorithm, binaryKey)
	var goodbyeCrypt = cipher.update(message, 'utf8', 'hex')
	goodbyeCrypt += cipher.final('hex');

//encrypt testKey with user supplied password;
	var cipher = crypto.createCipher(algorithm, userPassword)
	var cryptKey = cipher.update(binaryKey, 'binary', 'binary')
	cryptKey += cipher.final();

//store it in Mongo, retrieve it from Mongo;
	storageKey = cryptKey.toString('base64'); //Mongo friendly storage format
	retrieveKey = storageKey.toString('binary');

//decrypt testKey retrieved from storage;
	var decipher = crypto.createDecipher(algorithm, userPassword)
	var plainKey = decipher.update(retrieveKey, 'binary', 'binary')
	plainKey += decipher.final();

//apply testKey to get our message back; 
	var decipher = crypto.createDecipher(algorithm, plainKey)
	var goodbyePlain = decipher.update(goodbyeCrypt, 'hex', 'utf8')
	goodbyePlain += decipher.final('utf8');

	console.log("original message='" + message + "'");
	console.log("decrypted message='" + goodbyePlain + "'");
	if (message == goodbyePlain) {
		console.log('HOORAY IT MATCHES');
	} else {
		console.log('SUCKS TO BE ME');
	}
console.log("\n\n======================cryptoTest.js\n\n");
}; 

testCrypto();
