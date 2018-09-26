app
    .controller('currEmployeeAnswersCtrl', ['$scope', 'currentEmployeeService', 'callsService','$timeout', function ($scope, currentEmployeeService, callsService,$timeout) {
        let ctrl = this;
        ctrl.spinner=true

        $scope.pollAnswers = []

        $scope.pollLanguages=[]
        ctrl.getPollAnswers = function () {
            ctrl.spinner=true
            currentEmployeeService.getEmployeeAnswers().then((response) => {


                $scope.pollAnswers = response
            })

            currentEmployeeService.getEmployeeLanguages().then((response) => {


                $scope.pollLanguages = response
            })
            currentEmployeeService.getEmployeeMilitary().then((response) => {


                $scope.pollMilitary = response
            })

            currentEmployeeService.getEmployeePriorityAnswers().then((response) => {


                $scope.pollPriorityAnswers = response
                $scope.pollPriorityAnswers=$scope.pollPriorityAnswers.sort(function (a, b) {
                        if (a.value > b.value) {
                            return 1;
                        }
                        if (a.value < b.value) {
                            return -1;
                        }

                        return 0;
                    })
            })
            $timeout(function(){ctrl.spinner=false}, 1000)

            // setTimeout("ctrl.spinner=false", 1000)
            // ctrl.spinner=false
        }



        ctrl.getPollAnswers()

    }])
;