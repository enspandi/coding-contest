ContestApp.RunSessionsController = Ember.ArrayController.extend({
  page: 1,
  sort_by: "start_time",
  order: "desc",
  
  sortProperties: function () {
    return [this.sort_by + ":" + this.order];
  }.property("sort_by", "order"),
  sortedRunSessions: Ember.computed.sort("model", "sortProperties"),
  
  actions: {
    sortBy: function (sortProperty) {
      this.set("sort_by", sortProperty);
      this.set("order", (this.get("order") === "desc" ? "asc" : "desc"));
    }
  },
  
  tableColumns: function () {
    var columns = [ Ember.Object.create({attr: "id", name: "#"}),
          Ember.Object.create({attr: "start_time", name: "Start Time"}),
          Ember.Object.create({attr: "end_time", name: "End Time"}),
          Ember.Object.create({attr: "duration", name: "Duration"}),
          Ember.Object.create({attr: "distance", name: "Distance"}),
          Ember.Object.create({attr: "sport_type_id", name: "Sport Type Id"}),
          Ember.Object.create({attr: "encoded_trace", name: "Map Available"})];
    for (var len = columns.length, idx = 0; idx < len; idx++) {
      var column = columns[idx];
      if (column.get("attr") === this.get("sort_by")) {
        column.set("isSorted", "true");
        column.set("sortClass", "glyphicon glyphicon-chevron-" + (this.get("order") === "desc" ? "down" : "up"));
      }
    }
    return columns;
  }.property("sortProperties"),
});
