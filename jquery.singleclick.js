// jQeury SingleClick
// ----------------------------------
// v1.0.0
//
// Written by Omri Yariv.
// Distributed under MIT license.

(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        var $ = require('jquery');
        module.exports = factory($);
    } else {
        factory(root.jQuery);
    }

}(this, function($) {
    'use strict';

    var singleclick = $.event.special.singleclick = {

        delegateType: 'click',

        bindType: 'click',

        timeout: 250,

        dataProp: 'singleclicktimeout',

        handle: function(event) {
            // Cache a jQuery wrapped version of the DOM element.
            var $el = $(this);

            // If abortTrigger returns true it means it aborted a pending trigger
            // and that this click is second click leading to a double click. If
            // this is the case then we don't want to queue another trigger function.
            if (!singleclick.abortTrigger($el, event, arguments)) {
                singleclick.queueTrigger($el, event, arguments);
            }
        },

        queueTrigger: function($el, event, args) {
            // Queue a trigger function.
            var timeout = setTimeout(function() {
                // Before applying the handler, we change the type of the
                // standard 'click' event to 'singleclick'.
                event.type = event.handleObj.origType;
                event.handleObj.handler.apply($el, args);

                // After calling the handler we recover the original type
                // to try to avoid unexpected behavior of other handlers
                // that might be holding a reference to the event object.
                event.type = event.handleObj.type;

                // If the queued event fired successfully, we remove the variable
                // referencing the timeout to indicate 'no more pending triggers'.
                $el.removeData(singleclick.dataProp);
            }, singleclick.timeout);

            // Save a reference to the queued trigger function.
            $el.data(singleclick.dataProp, timeout);
        },

        abortTrigger: function($el, events, args) {
            var timeout = $el.data(singleclick.dataProp);
            if (timeout) {
                // Remove the queued trigger function and mark that it has been removed.
                clearTimeout(timeout);
                $el.removeData(singleclick.dataProp);

                // Indicate that the function was removed.
                return true;
            }
        }

    };

    return $;

}));
