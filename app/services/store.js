/*jshint esversion: 6 */

import Ember from 'ember';
import Option from 'questionnaire/models/option';
import Questionnaire from 'questionnaire/models/poll';
import Question from 'questionnaire/models/question';

const questionTypes = [
  {
    id: '1',
    input_type: 'Free Text Question'
  },
  {
    id: '2',
    input_type: 'Single Option'
  },
  {
    id: '3',
    input_type: 'Multiple Options'
  }
];

const questionnaires = [
  Questionnaire.create({
    id: '1',
    about: 'Questions that would help us know you more!',
    description: 'This is a questionnaire to know more about yourself.',
    current: 1,
    attempted: false,
    questions:[
      Question.create({
        id: 1,
        question: 'What are your priorities for Insurance?',
        required: true,
        type: {
          id: '1',
          input_type: 'Free Text Question'
        },
        answer: ''
      }),
      Question.create({
        id: 2,
        question: 'What are your hobbies?',
        required: true,
        type: {
          id: '2',
          input_type: 'Single Option'
        },
        options: [
          Option.create({ id: '1', value: 'Nightshade'}),
          Option.create({ id: '2', value: 'Hemlock'}),
          Option.create({ id: '3', value: 'Rhubarb'}),
        ],
        answer: '0'
      }),
      Question.create({
        id: 3,
        question: 'Favourite places to travel?',
        required: false,
        type: {
          id: '3',
          input_type: 'Multiple Option'
        },
        options: [
          Option.create({ id: '1', value: 'Paris', checkedValue: false}),
          Option.create({ id: '2', value: 'London', checkedValue: false}),
          Option.create({ id: '3', value: 'Berlin', checkedValue: false}),
        ],
        answer: []
      })
    ]
  }),

  Questionnaire.create({
    id: '2',
    about: 'Questions about your family details?',
    description: 'This is a questionnaire will fail on submission.',
    current: 1,
    attempted: false,
    questions:[
      Question.create({
        id: 1,
        question: 'What are your priorities for Insurance?',
        required: true,
        type: {
          id: '1',
          input_type: 'Free Text Question'
        },
        options: [],
        answer: ''
      }),

      Question.create({
        id: 2,
        question: 'Favourite places to travel as per your family?',
        required: true,
        type: {
          id: '3',
          input_type: 'Multiple Option'
        },
        options: [
          Option.create({ id: '1', value: 'India'}),
          Option.create({ id: '2', value: 'England'}),
          Option.create({ id: '3', value: 'Germany'}),
        ],
        answer: []
      }),
      Question.create({
        id: 3,
        question: 'What are your family common hobbies?',
        required: false,
        type: {
          id: '2',
          input_type: 'Single Option'
        },
        options: [
          Option.create({ id: '1', value: 'Travelling'}),
          Option.create({ id: '2', value: 'Movies'}),
          Option.create({ id: '3', value: 'Writing'}),
        ],
        answer: '0'
      })
    ]
  })
];

export default Ember.Service.extend({

  getQuestionnaireById(id) {
    return this.getQuestionnaires().findBy('id', id);
  },

  getQuestionnaires() {
    return questionnaires;
  },


  getQuestionnaireTypesById(id) {
    return questionTypes.findBy('id', id);
  }
});
