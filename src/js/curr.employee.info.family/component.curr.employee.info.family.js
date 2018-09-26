app
  .component('currEmployeeInfoFamily', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.family.html',
    controller: 'currEmployeeFamilyCtrl'
  })
;