/*jshint esversion: 6 */

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('polls', function() {
    this.route('poll', { path: '/:poll_id/questions' });
    this.route('about', { path: '/:poll_id/about' });
  });
  // Catch everything else!
  this.route('bad_url', { path: '/*badurl' });
});

export default Router;
