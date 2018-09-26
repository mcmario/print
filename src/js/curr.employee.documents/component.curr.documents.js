app
  .component('currEmployeeDocuments', {
    bindings: {
      formInfo: '=',
      data: '=',
      url: '@',
    },
    templateUrl: 'static/templates/component.curr.employee.documents.html',
    controller: 'currEmployeeDocumentsCtrl'
  })
;

