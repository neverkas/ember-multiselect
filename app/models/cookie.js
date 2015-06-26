import DS from 'ember-data';

var cookie = DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),

  label: function(){
  	return this.get('name');
  }.property('name')
});

cookie.reopenClass({
	FIXTURES:[
		{id: 1, name: 'Oreo', type: 'sweet'},
		{id: 2, name: 'Obleas', type: 'sweet'},
		{id: 3, name: 'Cerealitas', type: 'sweet'},
	]
});

export default cookie;