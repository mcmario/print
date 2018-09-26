app
    .controller('currentEmployeeController', ['currentEmployeeService', 'employee', '$scope', function (currentEmployeeService, employee, $scope) {
        let ctrl = this;

        $scope.showPane = currentEmployeeService.showPane;
        ctrl.data = employee;

        currentEmployeeService.workerData = employee[0]
        if (ctrl.data[0].type_) {
            ctrl.data[0].date_of_issue = new Date(ctrl.data[0].date_of_issue)
            ctrl.data[0].department.name = ctrl.data[0].department
            ctrl.data[0].birthday = new Date(ctrl.data[0].birthday)
            ctrl.data[0].person = {
                birthday: ctrl.data[0].birthday,
                date_of_issue: new Date(ctrl.data[0].date_of_issue),
                id: ctrl.data[0].id,
                ipn: ctrl.data[0].ipn,
                marital_status: ctrl.data[0].marital_status,
                home_phone: ctrl.data[0].home_phone,
                mobile_phone: ctrl.data[0].mobile_phone,
                passport_id: ctrl.data[0].passport_id,
                place_of_residence: ctrl.data[0].place_of_residence,
                registration: ctrl.data[0].registration,
                issued_by: ctrl.data[0].issued_by,


            }


        }
        else {
            ctrl.data[0].person.birthday = new Date(ctrl.data[0].person.birthday)
            ctrl.data[0].person.date_of_issue = new Date(ctrl.data[0].person.date_of_issue)
            ctrl.personStatus = currentEmployeeService.getStatus()
            ctrl.data[0].personStatus = ctrl.personStatus

        }
    }])
;
