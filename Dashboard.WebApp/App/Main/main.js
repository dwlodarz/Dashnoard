'use strict';

myApp.controller("MainController", ['$scope', '$uibModal', 'moment', 'eventService', function ($scope, $uibModal, moment, eventService) {
    $scope.aVariable = 'anExampleValueWithinScope';
    $scope.valueFromService = 'test';
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();
    $scope.events = eventService.GetStoredEvent();


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
    $scope.isCellOpen = true;
    $scope.eventClicked = function (event) {
        showModal('Clicked', event);
    };

    $scope.onAddClick = function (event)
    {
        debugger;
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