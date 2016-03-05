'use strict';

myApp.controller("MainController", ['$scope', '$uibModal', '$log', 'moment', 'eventService', function ($scope, $uibModal, $log, moment, eventService) {
    $scope.singleModel = 1;
    $scope.calendarView = 'month';

    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarDay = new Date();

    eventService.GetStoredEvent()
        .then(function (result)
        {
            $scope.events = result;
        }, function (error) {
            console.log(error);
        });

    var addEntryInstance;
    var eventDetailsInstance;

    function showModal(action, event) {
        eventDetailsInstance = $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: 'EventDetailsModalController',
            scope: $scope,
            resolve: {
                items: function () {
                    $scope.event = event;
                    $scope.action = action;
                    return event;
                }
            }
        });
        eventDetailsInstance.result.then(function (event) {
            eventService.GetStoredEvent().then(function (result) { debugger; $scope.events = result; });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    function showAddEntry(action, clickedDay) {
        addEntryInstance = $uibModal.open({
            scope: $scope,
            templateUrl: 'addEntry.html',
            controller: 'ModalInstanceController',
            resolve: {
                items: function () {
                    $scope.calendarDay = clickedDay;
                    return clickedDay;
                }
            }
        });

        addEntryInstance.result.then(function (selectedEvent) {
            var newEvent = {
                title: selectedEvent.lastName + ', ' + selectedEvent.firstName + ', ' + s.truncate(selectedEvent.description, 20) + '...',
                type: 'warning',
                firstName: selectedEvent.firstName,
                lastName: selectedEvent.lastName,
                phone: selectedEvent.phone,
                description: selectedEvent.description,
                startsAt: selectedEvent.date,
                endsAt: selectedEvent.endDate,
                guid: guid(),
                draggable: true,
                resizable: true,
                editable: true
            };
            $scope.events.push(newEvent);

            eventService.AddNewEventEntry(newEvent)
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //function addNewEventEntry()
    //{
    //    eventService.AddNewEventEntry()
    //}

    $scope.isCellOpen = true;
    $scope.eventClicked = function (event) {
        var a = showModal('Clicked', event);
    };

    $scope.onAddClick = function (clickedDate) {
        showAddEntry("Add", clickedDate);
    }
    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function (event) {
        var a = showModal('Deleted', event);
    };

    $scope.eventTimesChanged = function (event) {
        eventService.EditEvent(event);
        showModal('Dropped or resized', event);
    };

    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }
}]);