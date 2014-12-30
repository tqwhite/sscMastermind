


var requireLogin = function() {
	if (!Meteor.user()) {
		this.layout('insideLayout');
		this.render('start');
	} else {
		this.next();
	}
}

Router.route('/', 'intro');

Router.route('/start', function() {
	this.layout('insideLayout');
	this.render('start');
});


//this needs to precede that parameter version or it don't work
Router.route('secretsManage', {
	layoutTemplate: 'insideLayout',
	template: 'secretsManage'});


Router.route('secretsManage/:_id', {
	name: 'secretsManageRoute',
	layoutTemplate: 'insideLayout',
	template: 'secretsManage',
	data: function() {
		var secret = Secrets.findOne({
			_id: this.params._id
		});
		return secret
	}
});


Router.onBeforeAction(requireLogin, {
	only: 'secretsManage'
});

