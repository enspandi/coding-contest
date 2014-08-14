window.ContestApp = Ember.Application.create();

ContestApp.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://intense-bastion-3210.herokuapp.com",
  pathForType: function (type) {
    return Ember.String.underscore(Ember.String.pluralize(type));
  }
});

// Routes
ContestApp.Router.map(function () {
  this.resource("runSessions", { path: "/runs" });
  this.resource('runSession', { path: '/run/:runSession_id' });
});

ContestApp.IndexRoute = Ember.Route.extend({
  beforeModel: function () {
    this.transitionTo("runSessions");
  }
});

ContestApp.RunSessionsRoute = Ember.Route.extend({
  queryParams: {
    page:    { refreshModel: true },
    sort_by: { refreshModel: true },
    order:   { refreshModel: true }
  },
  model: function (params) {
    return this.store.find("runSession", params);
  }
});
