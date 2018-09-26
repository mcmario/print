app
  .controller('currEmployeePollsCtrl', ['$scope', 'currentEmployeeService',
    function ($scope, currentEmployeeService) {
      let ctrl = this;

      $scope.showPoll = false;

      ctrl.init = (data) => {
        $scope.data = data;
        ctrl.formInfo = false;
      };

      ctrl.$onInit = function () {
        // ctrl.userData
// TODO  вияснити по цій урлі
        ctrl.url = 'http://localhost:3000/api_personId_polls';

        currentEmployeeService.getData(ctrl.url)
          .then(data => {
            ctrl.init(data);
          });
      };

      ctrl.viewPoll = (pollId) => {
        $scope.pollId = pollId;
        $scope.showPoll = true;
      };

      //подія на вимкнення перегляду опитування та переходу до списку опитувань
      $scope.$on('hidePoll', function () {
        $scope.showPoll = false;
      });
    }])
;