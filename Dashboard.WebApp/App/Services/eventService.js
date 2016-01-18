(function () {
    'use strict';
    angular.module('app.services', [])
        .service("eventService", ['$q', function ($q) {
            var storedEvents = [];
            function getStoredEvent() {
                return storedEvents;
            }

            function addNewEvent(event)
            {
                storedEvents.push(event);
            }

            return {
                GetStoredEvent: getStoredEvent,
                AddNewEventEntry: addNewEvent
            };
        }]);
})();