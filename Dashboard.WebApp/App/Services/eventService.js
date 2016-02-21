(function () {
    'use strict';
    angular.module('app.services', [])
        .service("eventService", ['$q', '$http', function ($q, $http) {
            var apiUri = 'http://localhost/Dashboard.WebApi/api/';
            var storedEvents = [];

            function getStoredEvent() {
                var eventRequest = $http({
                    method: 'GET',
                    url:apiUri + 'event'
                }).then(function (response) {
                    if (response && response.data) {
                        storedEvents = [];
                        for(var i =0; i< response.data.length; i++)
                        {
                            storedEvents.push(convertToCalendarEvent(response.data[i]))
                        }
                        return storedEvents;
                    }
                });
                return eventRequest;
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

            function editEvent(event)
            {
                var editedEvent = _.findWhere(storedEvents, { guid: event.guid });
                if (editedEvent)
                {
                    //UpdateApi
                }
            }

            function convertToCalendarEvent(model)
            {
                return {
                    title: model.Title,
                    type: 'warning',
                    firstName: model.FirstName,
                    lastName: model.LastName,
                    phone: model.Phone,
                    description: model.Description,
                    startsAt: moment(model.StartsAt).toDate(),
                    endsAt: moment(model.EndsAt).toDate(),
                    guid: model.Guid,
                    draggable: true,
                    resizable: true,
                    editable: true
                };
            }
            return {
                GetStoredEvent: getStoredEvent,
                AddNewEventEntry: addNewEvent,
                DeleteEventEntry: deleteEvent,
                EditEvent: editEvent
            };
        }]);
})();