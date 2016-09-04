/*jshint esversion: 6 */

import Ember from 'ember';
import SnackBar from 'questionnaire/lib/snackbar';

export default Ember.Route.extend({

  actions: {
    goToQuestionnaire(poll) {
      if (poll.attempted) {
        SnackBar.createSnackBar("You've completed this questionnaire already. ");
      }else {
        this.transitionTo('polls.about', poll);
      }
    }
  },

  model() {
    return this.get('store').getQuestionnaires();
  },

  store: Ember.inject.service()
});
