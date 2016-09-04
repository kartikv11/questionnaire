/*jshint esversion: 6 */

import Ember from 'ember';
import SnackBar from 'questionnaire/lib/snackbar';

export default Ember.Component.extend({
  radioChecked: 0,
  currentQuestion: '',

  init: Ember.on('init', function(){
    this._super();
  }),

  ongoingQuestion: Ember.computed('currentOngoingQuestionIndex', "currentQuestionnaire", function() {
    let currentQuestion = this.get('currentQuestionnaire.questions').findBy('id', this.get('currentOngoingQuestionIndex'));
    this.set('currentQuestion', currentQuestion);
    return (this.get('currentQuestion'));
 }),

 acknowledgeAnswer() {
   let currentQuestion = this.get('currentQuestion');
   let answer = currentQuestion.answer;
   if (currentQuestion.required) {
     if (answer <= 0 || answer.length <= 0) {
       return false;
     }
   }
   return true;
 },

 actions:{
   prevQuestion() {
      this.decrementProperty('currentOngoingQuestionIndex');
   },

   nextQuestion() {
     let prevQuestionAcknowledment = this.acknowledgeAnswer();
     if (prevQuestionAcknowledment) {
       this.incrementProperty('currentOngoingQuestionIndex');
     }else {
       SnackBar.createSnackBar("This Question is compulsory ! ", {isFailure: true});
     }
   },

   submit() {
     let prevQuestionAcknowledment = this.acknowledgeAnswer();
     if (prevQuestionAcknowledment) {
       let currentQuestionnaire = this.get('currentQuestionnaire');
       if (currentQuestionnaire.id == '1') {
         SnackBar.createSnackBar("Answers have been submitted. Thanks!");
         this.set('currentOngoingQuestionIndex', 1);
         this.set('currentQuestionnaire.attempted', true);
         this.sendAction('onSubmission');
       }else {
         SnackBar.createSnackBar("Your Answers have not been submitted. Please try again!", {isFailure: true});
         return false;
       }
     }else {
       SnackBar.createSnackBar("This Question is compulsory! Please check before submitting ", {isFailure: true});
     }
   },

   radioChecked(option_id) {
      this.set('currentQuestion.answer', option_id);
  }
 }
});
