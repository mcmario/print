app
    .controller('currEmployeeComparisonCtrl', ['$scope', 'currentEmployeeService','employeesCompareService',
        function ($scope, currentEmployeeService,employeesCompareService) {
            let ctrl = this;

            ctrl.init = (data) => {

                ctrl.formInfo = $scope.formInfo;
                $scope.data = data;
                ctrl.data = data;
                // $scope.comparison = data[1][0];

                ctrl.item = 0;
            };

            ctrl.$onInit = function () {

                employeesCompareService.getData(ctrl.urlGet)
                    .then(data => {
                        ctrl.init(data);
                    });
            };

            ctrl.isConflict = currentEmployeeService.isConflict;
            ctrl.showUpdatedPerson = function () {

            }
            ctrl.submit = function () {

            };
        }])
;