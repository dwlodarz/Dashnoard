(function () {
    'use strict';
    angular.module('app.services')
        .service("patientService", ['$q', '$http', function ($q, $http) {
            var apiUri = 'http://localhost/Dashboard.WebApi/api/';

            function getPatientsByQuery(query) {
                var getEventRequest = $http({
                    method: 'GET',
                    url: apiUri + 'patient?query=' + query
                }).then(function (response) {
                    if (response && response.data) {
                        return response.data;
                    }
                });
                return getEventRequest;
            }

            function queryPatients(searchQuery) {
                return ['aaa', 'aabc', 'abc', 'adf', 'awe'];
            }
            return {
                QueryPatients: getPatientsByQuery
            };
        }]);
})();