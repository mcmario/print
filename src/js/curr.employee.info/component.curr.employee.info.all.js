app
  .component('currEmployeeInfoAll', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.all.html',
    controller: 'currEmployeeInfoCtrl'
  })

;
