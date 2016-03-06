'use strict';

myApp.controller("MainController", ['$scope', '$uibModal', '$log', 'moment', 'eventService', function ($scope, $uibModal, $log, moment, eventService) {
    $scope.singleModel = 1;
    $scope.calendarView = 'month';
    //$scope.viewDate = new Date();


    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarDay = new Date();

    var refreshView = function () {
        eventService.GetStoredEvent()
        .then(function (result) {
            $scope.events = result;
        }, function (error) {
            console.log(error);
        });
    };
    refreshView();
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
            refreshView();
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
                    if (action === 'Add') {
                        $scope.calendarDay = clickedDay;
                    } else {
                        $scope.calendarDay = clickedDay.startsAt;
                        $scope.clickedEvent = clickedDay;
                    }
                    $scope.action = action;
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
                guid: selectedEvent.guid,
                draggable: true,
                resizable: true,
                editable: true
            };
            

            eventService.AddNewEventEntry(newEvent)
            .then(function (result) {
                refreshView();
            }, function (error) {
                console.log(error);
            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.progressViewDate = function (increment)
    {
        if ($scope.calendarView === 'month')
        {
            $scope.calendarDay = moment($scope.calendarDay).add(increment, "month").toDate();
        }
    }
    $scope.isCellOpen = true;
    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };

    $scope.onAddClick = function (clickedDate) {
        showAddEntry("Add", clickedDate);
    }
    $scope.eventEdited = function (event) {
        //showModal('Edited', event);
        showAddEntry('edit', event);
    };

    $scope.eventDeleted = function (event) {
        showModal('Deleted', event);
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


}]);