app
  .controller('errorController', [function () {
    let ctrl = this;
    ctrl.button = false;
    ctrl.error = true;
    ctrl.message = {
      title: '404',
      description: 'Сторінку не знайдено'
    };
  }])

  .controller('greetingTestingController', ['testingService', function (testingService) {
    let ctrl = this;
    ctrl.button = true;
    ctrl.routeParams = testingService.getRouteParams();
    ctrl.message = testingService.pollInfo[ctrl.routeParams].greeting;
  }])

  .controller('farewellTestingController', ['testingService', function (testingService) {
    let ctrl = this;
    ctrl.button = false;
    ctrl.farewell = true;
    ctrl.routeParams = testingService.getRouteParams();
    ctrl.message = testingService.pollInfo[ctrl.routeParams].farewell;
  }])

;