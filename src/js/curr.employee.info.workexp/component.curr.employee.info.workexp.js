app
  .component('currEmployeeInfoWorkexp', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.workexp.html',
    controller: 'currEmployeeWorkExpCtrl'
  })
;