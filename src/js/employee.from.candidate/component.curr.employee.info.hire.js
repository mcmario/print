
app
    .component('currEmployeeInfoHire', {
        bindings: {
            data: '=',
            formInfo: '=',
            url: '@'
        },
        templateUrl: 'static/templates/component.curr.employee.info.hire.html',
        controller: 'candidateToEmpController'
    })
;