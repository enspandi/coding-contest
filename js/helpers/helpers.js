Ember.Handlebars.registerBoundHelper("formatDate", function (dateStr) {
  if (!dateStr) { return "-"; }
  if (dateStr) {
    var date = new Date(dateStr);
    if (date) {
      var DD = date.getDate(),
          MM = date.getMonth() + 1,
          hh = date.getHours(),
          mm = date.getMinutes();
      return (DD < 10 ? "0" + DD : DD) + "." + (MM < 10 ? "0" + MM : MM) + "." + date.getFullYear()
              + ", " + (hh < 10 ? "0" + hh : hh) + "." + (mm < 10 ? "0" + mm : mm);
    }
  }
  return dateStr;
});
Ember.Handlebars.registerBoundHelper("formateTime", function (timeinms) {
  if (!timeinms) { return "-"; }
  var insec = timeinms / 1000,
      inmin = insec / 60,
      inhour = inmin / 60,
      indays = inhour / 24;
  if (indays > 1) {
    return Math.round(indays * 10) / 10  + " days";
  }
  else if (inhour > 1) {
    return Math.round(inhour * 10) / 10  + " hours";
  }
  else if (inmin > 1) {
    return Math.round(inmin * 10) / 10 + " min";
  }
  else if (insec > 1) {
    return Math.round(insec) + " sec";
  }
  return timeinms;
});
Ember.Handlebars.registerBoundHelper("formatDistance", function (distanceinm) {
  if (!distanceinm) { return "-"; }
  var inkm = distanceinm / 1000;
  if (inkm > 1) {
    return Math.round(inkm * 100) / 100  + " km";
  }
  return distanceinm + " m";
});
Ember.Handlebars.registerBoundHelper("formatMapTrace", function (trace) {
  return (trace ? "Yes" : "No");
});