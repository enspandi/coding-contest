ContestApp.RunSessionsController = Ember.ArrayController.extend({
  queryParams: ["page", "sort_by", "order"],
  page: 1,
  sort_by: "start_time",
  order: "desc",

  sortProperties: function () {
    return [this.get("clientSort").sortBy + ":" + this.get("clientSort").order];
  }.property("clientSort"),
  sortedRunSessions: Ember.computed.sort("model", "sortProperties"),
  clientSort: { sortBy: "start_time", order: "desc" },

  pagination: function () {
    if (this.get("model.isLoaded")) {
      var modelType = this.get("model.type");
      return this.get("store").typeMapFor(modelType).metadata.pagination;
    }
  }.property("model.isLoaded"),
  incPage: function (amount) {
    var newPage = parseInt(this.get("pagination").page, 10) + amount;
    if (newPage <= parseInt(this.get("pagination").available_pages, 10) && newPage >= 1) {
      return newPage;
    }
  },
  prevPage: function () { return this.incPage(-1); }.property("pagination"),
  nextPage: function () { return this.incPage(1); }.property("pagination"),

  actions: {
    clientSortBy: function (sortProperty, sortOrder) {
      this.set("clientSort", {
        sortBy: sortProperty,
        order: sortOrder || (this.get("clientSort").order === "desc" ? "asc" : "desc")
      });
    }
  },

  tableColumns: function () {
    return [ Ember.Object.create({attr: "id", name: "#"}),
          Ember.Object.create({attr: "start_time", name: "Start Time"}),
          Ember.Object.create({attr: "end_time", name: "End Time"}),
          Ember.Object.create({attr: "duration", name: "Duration"}),
          Ember.Object.create({attr: "distance", name: "Distance"}),
          Ember.Object.create({attr: "sport_type_id", name: "Sport Type Id"}),
          Ember.Object.create({attr: "encoded_trace", name: "Map Available"})];
  }.property(),
  tableColumnsSorted: function () {
    var columns = this.get("tableColumns"),
        column, len, idx;
    for (len = columns.length, idx = 0; idx < len; idx++) {
      column = columns[idx];
      if (column.get("attr") === this.get("clientSort").sortBy) {
        column.set("isSorted", true);
        column.set("sortClass", "glyphicon glyphicon-chevron-" + (this.get("clientSort").order === "desc" ? "down" : "up"));
      }
      else {
        column.set("isSorted", false);
      }
    }
    return columns;
  }.property("sortProperties"),
  tableOrder: [{attr: "desc", name: "Descending"}, {attr: "asc", name: "Ascending"}]
});

