

var getSecret = function(secretPassword, _id, callback) {

	Meteor.call('models.secrets.decryptedFindOne', {
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
	var passwordContainer = $(e.target).parent();
	var secretPassword = passwordContainer.find('[name=secretPassword]').val();
	var _id = passwordContainer.find('[name=_id]').val();
	var secret = getSecret(secretPassword, _id, function(err, result) {
		if (err) {
			return alert(err.reason);
		} else {
			Session.set('openSecret', result);
			passwordContainer.hide();
			$('.secretContainer .entryFormContainer').show();
		}
	});


}


Template.listPasswordEntry.events({
	'click #submitButton': secureRetrieve
})

Template.secretsEntryForm.helpers({
	formData: function() {}
});
