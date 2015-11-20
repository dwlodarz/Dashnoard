'use strict';

myApp.controller("MainController", ['$scope', '$uibModal', 'moment', 'eventService', function ($scope, $uibModal, moment, eventService) {
    $scope.aVariable = 'anExampleValueWithinScope';
    $scope.valueFromService = 'test';
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();
    $scope.events = [
      {
          title: 'An event',
          type: 'warning',
          startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
          endsAt: moment().startOf('week').subtract(2, 'days').add(9, 'hours').toDate(),
          draggable: true,
          resizable: true
      }, {
          title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
          type: 'info',
          startsAt: moment().subtract(1, 'day').toDate(),
          endsAt: moment().subtract(1, 'day').add(1, 'hours').toDate(),
          draggable: true,
          resizable: true
      }, {
          title: 'This is a really long event title that occurs on every year',
          type: 'important',
          startsAt: moment().startOf('day').add(7, 'hours').toDate(),
          endsAt: moment().startOf('day').add(19, 'hours').toDate(),
          recursOn: 'year',
          draggable: true,
          resizable: true
      }
    ];
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