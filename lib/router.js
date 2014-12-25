

Router.route('/', 'intro');
Router.route('/start', function(){
	this.layout('insideLayout');
	this.render('start');
});

Router.route('/secrets/manage', function(){
	this.layout('insideLayout');
	this.render('secretsManage');
});