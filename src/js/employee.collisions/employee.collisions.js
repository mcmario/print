app
    .controller('currEmployeeComparisonCtrl', ['$scope', 'currentEmployeeService','employeesCompareService',
        function ($scope, currentEmployeeService,employeesCompareService) {
            let ctrl = this;


            ctrl.isConflict = currentEmployeeService.isConflict;
            ctrl.showUpdatedPerson = function () {
            }
            ctrl.submit = function () {

            };
        }])
;