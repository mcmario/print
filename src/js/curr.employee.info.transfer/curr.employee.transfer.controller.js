app
    .controller('currEmployeeTransferCtrl', ['$scope', 'currentEmployeeService', 'newUserService', 'callsService', '$route', 'ngDialog','toastsService', function ($scope, currentEmployeeService, newUserService, callsService, $route, ngDialog,toastsService) {
        let ctrl = this;
        ctrl.spinner = true
        $scope.departments = []
        $scope.managers = []
        $scope.positions = []
        $scope.schedules = []
        $scope.accruals = []
        ctrl.getData = () => {
            newUserService.getDepartments().then(departments => {
                $scope.departments = departments
                newUserService.getPositions().then(positions => {
                    $scope.positions = positions

                    newUserService.getSchedule().then(schedule => {
                        $scope.schedules = schedule
                        newUserService.getAccrualCode().then(accruals => {
                            $scope.accruals = accruals
                            newUserService.getListPeople().then(managers => {
                                $scope.managers = managers;
                                ctrl.spinner = false

                            })
                        })
                    })
                })
            })

        }
        $scope.transferEmployee = (data) => {

           data.ngDialogId?id=data.ngDialogId.slice():null
            delete data.ngDialogId
            currentEmployeeService.transferEmployee(data).then(resp => {
               if(resp.data!='ok'){
                    toastsService.customMessageEr('Помилка',resp.data)
               }else if(resp.data=='ok'){
                   toastsService.customMessageSuc('Кадрове переміщення,','завершене успішно' )
                   ngDialog.close(id)
               }
                    return resp
                },
                function (resp) {
               let x='Сталася невідома помилка'
                toastsService.customMessageEr('Ой лишенько,',x)
                }
            )
        }
        ctrl.init = () => {
            ctrl.getData()
        }
        ctrl.init()


    }])
;