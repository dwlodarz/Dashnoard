'use strict';

myApp.controller('EventDetailsModalController', ['$scope','$rootScope', '$log', '$uibModalInstance', 'eventService', function ($scope,$rootScope, $log, $uibModalInstance, eventService)
{
    var self = this;
    $scope.event = {};

    $scope.getEventDuration = function(event)
    {
        if (event && event.endsAt && event.startsAt) {
            var duration = moment.duration(moment(event.endsAt).diff(event.startsAt));
            return duration.format("h:mm");
        }
        return '';
    }

    $scope.getFormatedDate = function (event)
    {
        return moment(event.startsAt).format('DD MM YYYY, H:m').toString();
    }

    function getSelectedEvent()
    {
        $scope.event = $scope.$parent.event;
        $scope.action = $scope.$parent.action;
    }
    getSelectedEvent();

    $scope.handleCloseAction = function (action)
    {
        if (action === "Deleted") {
            eventService.DeleteEventEntry($scope.event).then(function (events) {
                $scope.events = events;
                //refreshEvents();
                $uibModalInstance.close($scope.events);
            });
        }
        else {
            this.$close();
        }
    }



}]);