'use strict';

myApp.controller("MainController", ['$scope', '$uibModal','$log', 'moment', 'eventService', function ($scope, $uibModal, $log, moment, eventService) {
    $scope.aVariable = 'anExampleValueWithinScope';
    $scope.valueFromService = 'test';
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();
    $scope.events = eventService.GetStoredEvent();
    var addEntryInstance;

    function showModal(action, event) {
        $uibModal.open({
            templateUrl: 'modalContent.html',
            controller: function () {
                var vm = this;
                vm.action = action;
                vm.event = event;
            },
            controllerAs: 'vm'
        });
    }

    function showAddEntry(action, clickedDay) {
        addEntryInstance = $uibModal.open({
            templateUrl: 'addEntry.html',
            controller: 'ModalInstanceController',
            resolve: {
                items: function () {
                    return clickedDay;
                }
            }
        });

        addEntryInstance.result.then(function (selectedEvent) {
            var newEvent = {
                title: 'New event1',
                type: 'warning',
                startsAt: selectedEvent.date,
                endsAt: moment(selectedEvent.date).add(1,'hour').toDate(),
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
        showModal('Clicked', event);
    };

    $scope.onAddClick = function (clickedDate)
    {
        showAddEntry("Add", clickedDate);
    }
    $scope.eventEdited = function (event) {
        showModal('Edited', event);
    };

    $scope.eventDeleted = function (event) {
        showModal('Deleted', event);
    };

    $scope.eventTimesChanged = function (event) {
        showModal('Dropped or resized', event);
    };

    $scope.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };
}]);