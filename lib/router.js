


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

Router.route('secretsManage', function() {
	this.layout('insideLayout');
	this.render('secretsManage');
});

Router.onBeforeAction(requireLogin, {
	only: 'secretsManage'
});
