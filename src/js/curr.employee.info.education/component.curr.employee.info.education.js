app
  .component('currEmployeeInfoEducation', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.education.html',
    controller: 'currEmployeeEducationCtrl'
  })
;