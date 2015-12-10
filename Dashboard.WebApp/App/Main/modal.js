'use strict';

myApp.controller('ModalInstanceController', ['$scope','$rootScope', '$log', '$uibModalInstance', 'eventService', function ($scope,$rootScope, $log, $uibModalInstance, eventService)
{
    //$scope.events = eventService.GetStoredEvent();
    $scope.startTime = new Date();
    $scope.endTime = moment().add(1, 'hours').toDate();

    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = false;//24H

    $scope.ok = function () {
        var hour = moment($scope.startTime).hour();
        var minute = moment($scope.startTime).minute();
        $scope.dt = moment($scope.dt).startOf('day').hour(hour).minute(minute).toDate();

        event = {
            text: "test",
            date: $scope.dt,
            phone: "555-123-456",
            clientName: "John Doe"
        }
        $uibModalInstance.close(event);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.dayClickedOnCalendar = function () {
        $scope.dt = $scope.$parent.calendarDay;
    };
    $scope.dayClickedOnCalendar();

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function ($event) {
        $scope.status.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
      [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
      ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
}]);