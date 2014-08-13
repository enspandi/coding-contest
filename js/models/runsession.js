ContestApp.RunSession = DS.Model.extend({
  start_time: DS.attr('date'),
  end_time: DS.attr('date'),
  duration: DS.attr('number'),
  distance: DS.attr('number'),
  encoded_trace: DS.attr('string'),
  sport_type_id: DS.attr('number')
});
