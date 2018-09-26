app
  .component('currEmployeeInfoGeneral', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.general.html',
    controller: 'currEmployeeInfoCtrl'
  })
;
