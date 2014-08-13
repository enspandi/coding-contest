window.ContestApp = Ember.Application.create();

ContestApp.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://intense-bastion-3210.herokuapp.com",
  pathForType: function(type) {
    return Ember.String.underscore(Ember.String.pluralize(type));
  }
});

// Routes
ContestApp.Router.map(function () {
  this.resource("runSessions", { path: "/runs" });
});

ContestApp.IndexRoute = Ember.Route.extend({
  beforeModel: function () {
    this.transitionTo("runSessions");
  }
});

ContestApp.RunSessionsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find("runSession", { page: 1 });
  }
});
