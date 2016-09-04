/*jshint esversion: 6 */

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToQuestionnaire (questionnaire) {
      this.transitionTo('polls.poll', questionnaire);
    }
  },

  model(params) {
    return this.get('store').getQuestionnaireById(params.poll_id);
  },

  store: Ember.inject.service()
});
