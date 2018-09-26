app
  .component('componentListPeople', {
    templateUrl: 'static/templates/component.list.people.html',
    controller: 'listPeopleCompCtrl',
    bindings: {
      person: '=',
      city: '=',
      department: '=',
      people: '=',
    }
  })
  .controller('listPeopleCompCtrl', ['listPeopleCompService', 'translitService', '$routeParams', '$scope', 'callsService','modalWindowsService', function (listPeopleCompService, translitService, $routeParams, $scope, callsService,modalWindowsService) {
    let ctrl = this;

    ctrl.TranslitWord = (word) => new translitService.Translit(word.replace(/\s/g, '')).translit();
    ctrl.employeesType = $routeParams.employeesType;
    ctrl.togglePane = listPeopleCompService.togglePane;
    ctrl.call = callsService.call;
    ctrl.showDuties=(duties,id)=>{
modalWindowsService.showDuties(duties,id)
    }

  }])
;
