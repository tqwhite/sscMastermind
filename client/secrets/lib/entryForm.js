
Template.secretsEntryForm.events({
	'click #submitButton': function(e) {
		e.preventDefault();
		var formContainer=$(e.target).parent().parent();
		var post = {
			secretName: formContainer.find('[name=secretName]').val(),
			secretContent: formContainer.find('[name=secretContent]').val(),
			secretPassword: formContainer.find('[name=secretPassword]').val(),
			_id: formContainer.find('[name=_id]').val(),
			ownerId: Meteor.user()._id
		};
		
console.dir(post);		
		Meteor.call('server.models.secrets.save', post, function(error, result) { // display the error to the user and abort);
			if (error) {
				Session.set('status', {   
				  message:error.reason,   
				  type:'bad' });
				return;
			}
			else{
				Session.set('status', {   
				  message:'Secret Saved',   
				  type:'good' });
			}
			Router.go('secretsManage', {
				_id: result._id
			});
			

	
Session.set('openSecret', '');
			formContainer.find('[name=secretName]').val('');
			formContainer.find('[name=secretContent]').val('');
			formContainer.find('[name=secretPassword]').val('');
			formContainer.find('[name=originalSecretPassword]').val('');
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
			formContainer.find('[name=secretPassword]').val('');
			formContainer.find('[name=_id]').val('');
			$('.secretContainer .entryFormContainer').hide();
	}
});

Template.secretsEntryForm.helpers({
openSecret:function(){
	return Session.get('openSecret');
}
})