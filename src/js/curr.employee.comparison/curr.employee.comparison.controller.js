app
  .controller('currEmployeeComparisonCtrl', ['$scope', 'currentEmployeeService',
    function ($scope, currentEmployeeService) {
      let ctrl = this;

      // ctrl.init = (data) => {
      //
      //   ctrl.formInfo = $scope.formInfo;
      //   $scope.data = data;
      //     $scope.updatedUser={};
      //
      //
      // };
      //
      //
      //
      //
      //
      //
      // ctrl.$onInit = function () {
      //
      //
      //     ctrl.urlGet='/api/collisions/user/';
      //
      //
      //   currentEmployeeService.getData(ctrl.urlGet)
      //     .then(data => {
      //       ctrl.init(data);
      //     });
      // };
      //
      // ctrl.isConflict = currentEmployeeService.isConflict;
      //
      // ctrl.submit = function () {
      //
      //   ctrl.urlPut = 'http://localhost:3000/api_personId_comparison_save';
      //   currentEmployeeService.saveData($scope.comparison, ctrl.urlPut)
      //     .then(
      //       resp => {
      //
      //         if (resp) {
      //           $scope.formInfo.$setPristine();
      //           ctrl.$onInit();
      //         }
      //       }
      //     );
      // };
    }])
;