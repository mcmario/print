app
  .component('currEmployeeComparison', {
    bindings: {
      formInfo: '=',
      data: '=',
      urlGet: '@',
      urlPut: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.comparison.html',
    controller: 'currEmployeeComparisonCtrl'
  })
;
