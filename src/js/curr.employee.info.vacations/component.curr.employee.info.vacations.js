app
  .component('currEmployeeInfoVacations', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.vacations.html',
    controller: 'currEmployeeVacationsCtrl'
  })
;