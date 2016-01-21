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
                //push to API
            }

            function deleteEvent(event)
            {
                storedEvents = _.reject(storedEvents, function (item) { return item.guid == event.guid; });
                //delete in API
            }
            return {
                GetStoredEvent: getStoredEvent,
                AddNewEventEntry: addNewEvent,
                DeleteEventEntry: deleteEvent
            };
        }]);
})();