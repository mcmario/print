app
  .component('currEmployeeInfoPolls', {
    bindings: {
      data: '=',
      formInfo: '=',
      url: '@'
    },
    templateUrl: 'static/templates/component.curr.employee.info.polls.html',
    controller: 'currEmployeeAnswersCtrl'
  })
;