app
  .controller('testingController', ['testingService', '$scope', function (testingService, $scope) {
    let ctrl = this;
    ctrl.routeParams = testingService.getRouteParams();
    ctrl.polls = testingService.arrayOfPolls[ctrl.routeParams].polls;
    $scope.poll = testingService.getCurrPoll(ctrl.polls);
    testingService.buildEmptyFormTemplate($scope.poll);
    // testingService.scrollToTop();
    ctrl.submit = () => testingService.submitAnswers($scope, $scope.poll.key, $scope.input);
  }])
;