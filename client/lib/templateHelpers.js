Template.registerHelper('headerColor', function(){
	var url=Meteor.absoluteUrl();
	if (url.match(/localhost/)){
		return "#fde";	
	}
	else{
		return "#dfe";
	}
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