/*jshint esversion: 6 */

import Ember from 'ember';

var SnackBar = Ember.Object.extend({
  // Variable containing reference to previous snackbar.
  // It needs to be dismissed in case new one appears
  previous: null,
  /**
   * Create Snackbar as per material design
   * Uses CSS from app.scss
   * For additional functionality, pass attributes hash as second parameter. Parameters supported:
   *   - timeout : Timeout after which snackbar should dismiss, Default to 5000 milliseconds
   *   - actionText: Text to be displayed on right side as action link
   *   - action: function callback which is to be called if actionText is clicked
   *   - isFailure: flag to modify snackbar style in case of failure message
   *
   * @param  {[String]} message [Message to be displayed]
   * @param  {[JSON]}   options [Options hash]
   */
  createSnackBar: function(message, options) {
    var actionText = null;
    var action = null;
    var timeout = 5000;
    var isFailure = null;
    if (options) {
      actionText = options.actionText || actionText;
      action = options.action || action;
      timeout = options.timeout || timeout;
      isFailure = options.isFailure || isFailure;
    }
    var self = this;
    if (this.previous) {
      this.previous.dismiss();
    }
    var snackbar = document.createElement('div');
    snackbar.className = 'paper-snackbar';
    snackbar.dismiss = function() {
      this.style.opacity = 0;
      this.style.zIndex =  -2;
    };
    var text = document.createTextNode(message);
    snackbar.appendChild(text);
    if (actionText) {
      if (!action) {
        action = snackbar.dismiss.bind(snackbar);
      }
      var actionButton = document.createElement('button');
      actionButton.className = 'action';
      actionButton.innerHTML = actionText;
      actionButton.addEventListener('click', action);
      snackbar.appendChild(actionButton);
    }
    setTimeout(function() {
      if (self.previous === this) {
        self.previous.dismiss();
      }
    }.bind(snackbar), timeout);

    snackbar.addEventListener('transitionend', function(event, elapsed) {
      if (event.propertyName === 'opacity' && this.style.opacity === 0) {
        this.parentElement.removeChild(this);
        if (self.previous === this) {
          self.previous = null;
        }
      }
    }.bind(snackbar));



    self.previous = snackbar;
    document.body.appendChild(snackbar);
    // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
    getComputedStyle(snackbar).bottom;
    snackbar.style.bottom = '0px';
    if (isFailure) {
      snackbar.style.backgroundColor = 'red';
    }
    snackbar.style.opacity = 1;
  }

});
export default SnackBar.create();
