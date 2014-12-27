Template.registerHelper('headerColor', function(){
	var url=Meteor.absoluteUrl();
	if (url.match(/localhost/)){
		return "#fde";	
	}
	else{
		return "#dfe";
	}
})