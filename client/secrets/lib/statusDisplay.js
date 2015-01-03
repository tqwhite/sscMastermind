var getMessage = function() {
	var status = Session.get('status') || {};

	if (!status) {
		return '';
	}

	var t = $(Template.instance().firstNode);
	t.removeClass('bad').removeClass('good');
	t.hide().addClass(status.type).show();

	if (status.type != 'bad') {
		t.fadeOut('6000');
	}

	return status.message
}

Template.statusDisplay.helpers({
	message: getMessage
});
