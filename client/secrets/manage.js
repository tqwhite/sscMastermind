var secretList = Secrets.find();

Template.secretsManageList.helpers({
	secretList: function() {
		return secretList;
	}
});


Template.secretsEntryForm.events({
	'click #submitButton': function(e) {
		e.preventDefault();
		var post = {
			name: $(e.target).parent().find('[name=name]').val(),
			secret: $(e.target).parent().find('[name=secret]').val(),
			_id: $(e.target).parent().find('[name=_id]').val()
		};
		Meteor.call('models.secrets.save', post, function(error, result) { // display the error to the user and abort);
	
		
			if (error){
				return alert(error.reason);
			}
			Router.go('secretsManage', {
				_id: result._id
			});
		}
	);

	}
});






// if we wanted this to globally available, use...
// Template.registerHelper('secretsManage.secretList', function(){
// 	return secretList;
// })


