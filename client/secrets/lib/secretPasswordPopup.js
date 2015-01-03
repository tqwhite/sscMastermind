

var getSecret = function(secretPassword, _id, callback) {

	Meteor.call('server.retrieving.decryptedFindOne', {
		secretPassword: secretPassword,
		selector: {
			_id: _id
		}
	}, function(err, result) {
		callback(err, result)
	});
};

var secureRetrieve = function(e) {
	e.stopPropagation();
	e.preventDefault();
	var t=Template.instance();
	var passwordContainer = $(t.firstNode);
	var secretPassword = passwordContainer.find('[name=secretPassword]').val();
	
	if (!secretPassword){
		Session.set('status', {message:"You have to enter a 'Secret Password'", type:'bad'});
		return;
	}
	
	var _id = passwordContainer.find('[name=_id]').val();
	var secret = getSecret(secretPassword, _id, function(err, result) {
		if (err) {
			Session.set('status', {message:err.reason, type:'bad'});
			return;
		} else {
			Session.set('status', {message:'', type:'good'});
			Session.set('openSecret', result);
			passwordContainer.hide();
			$('.secretContainer .entryFormContainer').show();
		}
	});


}


Template.listPasswordEntry.events({
	'click #submitButton': secureRetrieve,
	'click #cancelButton': function(e){
		Session.set('status', {message:'Canceled', type:'good'});
		var t=Template.instance();
		$(t.firstNode).hide();
	}
})

Template.secretsEntryForm.helpers({
	formData: function() {}
});
