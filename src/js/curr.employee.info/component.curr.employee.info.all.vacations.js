app
    .component('currEmployeeInfoGeneralVacations', {
        bindings: {
            data: '=',
            formInfo: '=',
            url: '@'
        },
        templateUrl: 'static/templates/component.curr.employee.info.general.vacations.html',
        controller: 'currEmployeeVacationsCtrl'
    });