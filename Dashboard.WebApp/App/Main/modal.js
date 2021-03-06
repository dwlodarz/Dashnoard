﻿'use strict';

myApp.controller('ModalInstanceController', ['$scope', '$rootScope', '$log', '$uibModalInstance', 'eventService', 'patientService', function ($scope, $rootScope, $log, $uibModalInstance, eventService, patientService) {
    var self = this;
    $scope.patients = [];
    $scope.patientQuery = '';
    $scope.spinner = '';
    $scope.addNewUserView = false;
    $scope.newPatient = {};

    $scope.openAddNewUser = function ()
    {
        $scope.newPatient = {};
        $scope.addNewUserView = true;
    }

    $scope.closeAddNewUser = function ()
    {
        $scope.addNewUserView = false;
    }

    $scope.onSelectedPatient = function (selectedPatient)
    {
        if (selectedPatient) {
            $scope.eventDetails.patient = selectedPatient;
        }
    }
    $scope.updatePatients = function (typed) {
        typed = typed.trim();
        if ($scope.patients.length == 0 || $scope.patients[0].LastName.trim().charAt(0).toLowerCase() != typed.charAt(0).toLowerCase()) {
            $scope.spinner = 'active';
            patientService.QueryPatients(typed).then(function (data)
            {
                $scope.patients = data;
                $scope.spinner = '';
            })
        }
    }
    var prepopulateFields = function (action) {
        if (action === 'Add') {
            $scope.eventDetails =
            {
                patient:{},
                description: '',
                startTime: new Date(),
                endTime: moment().add(1, 'hours').toDate()
            };
            $scope.newPatient =
                {
                    Guid: guid(),
                    FirstName: '',
                    LastName: '',
                    PhoneNo: '',
                    AdditionalInfo: ''
                }
        } else {
            $scope.eventDetails = $scope.clickedEvent;
            $scope.eventDetails.startTime = $scope.clickedEvent.startsAt;
            $scope.eventDetails.endTime = $scope.clickedEvent.endsAt;
        }
    }
    prepopulateFields($scope.action);

    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.ismeridian = false;//24H

    $scope.$watch('eventForm.$valid', function (newVal, oldVal) {
        if ($scope.showError && $scope.showError == true && newVal == true) {
            $scope.showError = false;
        }
    }, true);

    this.checkForFormValidity = function ()
    {
        $scope.showError = false;
        if ($scope.eventForm.$valid == false) {
            $scope.showError = true;
            return false;
        }
        return true;
    }

    $scope.addUser = function ()
    {
        if (!self.checkForFormValidity()) { return; }
        $scope.closeAddNewUser();
    }

    $scope.ok = function () {
        if (!self.checkForFormValidity()) { return; }

        var hour = moment($scope.eventDetails.startTime).hour();
        var minute = moment($scope.eventDetails.startTime).minute();
        $scope.dt = moment($scope.dt).startOf('day').hour(hour).minute(minute).toDate();
        hour = moment($scope.eventDetails.endTime).hour();
        minute = moment($scope.eventDetails.endTime).minute();

        event = {
            date: $scope.dt,
            endDate: moment($scope.dt).startOf('day').hour(hour).minute(minute).toDate(),
            patient: $scope.eventDetails.patient,
            guid: $scope.eventDetails.guid ? $scope.eventDetails.guid : guid(),
            description: $scope.eventDetails.description,
        }
        $scope.debounce = true;
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
    $scope.oneAtATime = true;

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
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