/*jshint esversion: 6 */

import Ember from 'ember';

export default Ember.Helper.helper(function(values, options) {
    if (arguments.length < 2)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    let operator = options.operator || "==";

    let operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        '&&':       function(l,r) { return l && r; },
        'typeof':   function(l,r) { return typeof l == r; }
    };

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    let result = operators[operator](values[0],values[1]);

    if( result ) {
        return true;
    } else {
        return false;
    }

});
