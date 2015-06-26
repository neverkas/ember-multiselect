import Ember from 'ember';
import layout from '../templates/components/multi-select';

export default Ember.Component.extend({
  layout: layout,
  modelName: null,
  store: null,
  filterText: '',
  filterTextSelect: '',
  maxResults: 5,
  threshold: 2,
  canEdit: false,
  placeholder: 'Ingrese el texto',
  content: [],
  selections: [],

  didInsertElement: function(){
  	this.set('selections', Ember.ArrayController.create({
  		sortProperties: ['order'],
  		sortAscending: false,
  	}));

  	this.set('content', Ember.ArrayController.create({
  		sortProperties: ['order'],
  		sortAscending: false,
  		items: null,
  	}));  	

		this.findContent();
  },

  actions:{
		selectItem: function(object){			
			object.set('selected', !object.get('selected'));
		},
		upItem: function(object){
			console.log(object.order);
			//this.incrementProperty(object.order);
			object.set('order', parseInt(object.order) + 1);
			console.log(object.order);
		},
	},  

  findContent: function(){
		var results = this.store.find(this.get('modelName'), {search: this.get('text')});

		this.set('content.items', results);
  },

  listFiltered: function(){
		var regex 		= new RegExp(this.get('filterText').toString().toLowerCase());
		var filtered 	= [];

		if(this.get('content') && this.get('content.items'))
		{
			var items = this.get('content.items').filterBy('selected', false);

			if(this.get('content') && this.get('content.items'))
			{			
				if(this.get('filterText').length >= this.get('threshold'))
				{
					filtered = items.filter(function(item){
						return regex.test((item.get('label')).toLowerCase());
					});
				}
				else
				{
					filtered = items;
				}
			}

		}

		return filtered;
  }.property('content.items.@each', 'content.items.@each.order', 'content.items.@each.selected', 'filterText'), 

  listSelected: function(){
		var regex 		= new RegExp(this.get('filterTextSelect').toString().toLowerCase());
		var filtered 	= [];

		if(this.get('content') && this.get('content.items'))
		{
			var items = this.get('content.items').filterBy('selected', true);

			if(this.get('filterTextSelect').length >= this.get('threshold'))
			{			
				filtered = items.filter(function(item) {
					return regex.test((item.get('label')).toLowerCase());
				});
			}
			else
			{
				filtered = items;
			}
		}

		return filtered;
  }.property('content.items.@each.selected', 'filterTextSelect'), 
});
