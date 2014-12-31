
Template.secretsEntryForm.events({
	'click #submitButton': function(e) {
		e.preventDefault();
		var formContainer=$(e.target).parent().parent();
		var post = {
			name: formContainer.find('[name=name]').val(),
			secret: formContainer.find('[name=secret]').val(),
			_id: formContainer.find('[name=_id]').val()
		};
		
		
		Meteor.call('models.secrets.save', post, function(error, result) { // display the error to the user and abort);
			if (error) {
				return alert(error.reason);
			}
			Router.go('secretsManage', {
				_id: result._id
			});
	
Session.set('openSecret', '');
			formContainer.find('[name=name]').val('');
			formContainer.find('[name=secret]').val('');
			formContainer.find('[name=_id]').val('');
			$('.secretContainer .entryFormContainer').hide();
		}
		);

	},
	
	
	'click #cancelButton': function(e) {
		e.preventDefault();
		var formContainer=$(e.target).parent();
	

			formContainer.find('[name=name]').val('');
			formContainer.find('[name=secret]').val('');
			formContainer.find('[name=_id]').val('');
			$('.secretContainer .entryFormContainer').hide();
	}
});

Template.secretsEntryForm.helpers({
openSecret:function(){
	return Session.get('openSecret');
}
})