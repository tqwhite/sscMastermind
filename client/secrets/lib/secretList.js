
var setUpPasswordEntry = function(e) {
	var container = $('#listPasswordEntry');
	container.show()
		.find('[name=secretPassword]')
		.val('')
		.focus();
	container
		.find('[name=_id]')
		.val(this._id);
	container.show()
		.find('#prompt')
		.html("Enter password for <span class='secretPrompt'>" + this.name);
	
	Session.set('secretId', this._id);

	//relies on Template.listPasswordEntry.events: 'click #submitButton', defined elsewhere

};

Meteor.subscribe('findForUser');

Template.secretsManageList.helpers({
	secretList: function() {
		return Secrets.find();
	}
});
Template.secretsListItem.events({
	'click .secretListItem': setUpPasswordEntry
});


Template.newSecretButton.events({

	'click': function(e){
		Session.set('openSecret', {name:'', secret:'', _id:'', secretPassword:''});
		$('.secretContainer .entryFormContainer').show();
	}
	
});


// if we wanted this to globally available, use...
// Template.registerHelper('secretsManage.secretList', function(){
// 	return secretList;
// })
