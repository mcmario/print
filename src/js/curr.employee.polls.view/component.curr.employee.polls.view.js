app
  .component('currEmployeePollsView', {
    bindings: {
      pollId: '=',
      userData: '='
    },
    templateUrl: '..//templates/component.curr.employee.polls.view.html',
    controller: 'currEmployeePollsViewCtrl'
  })

;
