(function(){
Template.body.addContent((function() {
  var view = this;
  return [ HTML.Raw("<h1>Where Secrets Come to Hide!</h1>\n\n  "), Spacebars.include(view.lookupTemplate("hello")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("hello");
Template["hello"] = new Template("Template.hello", (function() {
  var view = this;
  return [ HTML.Raw("<button>Click Me</button>\n  "), HTML.P("You've pressed the button ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("counter"));
  }), " times.") ];
}));

})();
