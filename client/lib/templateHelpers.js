Template.registerHelper('headerColor', function(){
	var url=Meteor.absoluteUrl();
	if (url.match(/localhost/)){
		return "#fde";	
	}
	else{
		return "#dfe";
	}
});

Template.registerHelper('userId', function(){
	return Meteor.user()._id;
})


Handlebars.registerHelper("debug", function(optionalValue) { 
  console.log("====================");
  console.log("Current Context: ");
  console.dir(this);
  
  console.log("--------------------");

  if (optionalValue) {
    console.log("Value:"); 
    console.log(optionalValue);
    console.log("====================");  
  } 
});