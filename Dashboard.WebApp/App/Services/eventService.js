(function () {
    'use strict';
    angular.module('app.services', [])
        .service("eventService", ['$q', function ($q) {

            function getStoredEvent() {
                return [
                  {
                      title: 'An event',
                      type: 'warning',
                      startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                      endsAt: moment().startOf('week').subtract(2, 'days').add(9, 'hours').toDate(),
                      draggable: true,
                      resizable: true,
                      editable: true
                  }, {
                      title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
                      type: 'info',
                      startsAt: moment().subtract(1, 'day').toDate(),
                      endsAt: moment().subtract(1, 'day').add(1, 'hours').toDate(),
                      draggable: true,
                      resizable: true,
                      editable: true
                  }, {
                      title: 'This is a really long event title that occurs on every year',
                      type: 'important',
                      startsAt: moment().startOf('day').add(7, 'hours').toDate(),
                      endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                      recursOn: 'year',
                      draggable: true,
                      resizable: true,
                      editable: true
                  }
                ];
            }

            return {
                GetStoredEvent: getStoredEvent
            };
        }]);
})();