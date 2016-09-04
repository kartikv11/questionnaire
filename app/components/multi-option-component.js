/*jshint esversion: 6 */

import Ember from 'ember';

export default Ember.Component.extend({

  init: Ember.on('init', function(){
    this._super();
  }),

  actions: {
    checkValue(option) {
      let currentOption = this.get('currentOption');
      let answer = this.get('answers');

      if (option.checkedValue) {
        var index = answer.indexOf(option.id);
        if (index > -1) {
          answer.splice(index, 1);
          this.set('currentOption.checkedValue', false);
        }
      }else {
        this.set('currentOption.checkedValue', true);
        answer.push(option.id);
      }
      this.set('answers',answer);
      this.rerender();
    }
  }
});
