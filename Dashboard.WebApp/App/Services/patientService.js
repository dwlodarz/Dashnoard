(function () {
    'use strict';
    angular.module('app.services')
        .service("patientService", ['$q', '$http', function ($q, $http) {
            var apiUri = 'http://localhost/Dashboard.WebApi/api/';
            
            function queryPatients(searchQuery)
            {
                return ['aaa', 'aabc', 'abc', 'adf', 'awe'];
            }
            return {
                QueryPatients: queryPatients
            };
        }]);
})();