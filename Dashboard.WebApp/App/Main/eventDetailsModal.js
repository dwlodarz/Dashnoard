'use strict';

myApp.controller('EventDetailsModalController', ['$scope','$rootScope', '$log', '$uibModalInstance', 'eventService', function ($scope,$rootScope, $log, $uibModalInstance, eventService)
{
    var self = this;
    $scope.event = {};

    function getSelectedEvent()
    {
        $scope.event = $scope.$parent.event;
        $scope.action = $scope.$parent.action;
    }
    getSelectedEvent();

    $scope.handleCloseAction = function (action)
    {
        if (action === "Deleted")
        {
            eventService.DeleteEventEntry($scope.event);
            $uibModalInstance.close(event);
        }
        this.$close();
    }

}]);