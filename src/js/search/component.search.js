app
  .component('searchComponent', {
    bindings: {
      person: '=',
      type: '=',
      department: '='
    },
    templateUrl: 'static/templates/component.search.html',
    controller: 'searchCompCtrl',
  })


  .controller('searchCompCtrl', ['searchCompService', '$scope', function (searchCompService, $scope) {
    let ctrl = this;

    ctrl.watcher = $scope.$watch(angular.bind(this, () => ctrl.person), () => {
      ctrl.displayName = ctrl.person;
      ctrl.watcher();
    });

    ctrl.peopleLists = searchCompService.peopleLists;

    ctrl.getSelectedList = (list) => {
      if (list.value !== 'else') {
        searchCompService.getSelectedList(list)
          .then((list) => {
            $scope.list = list;
            $scope.$emit('listByType', $scope.list);
          });
      }
    };

    ctrl.choosePerson = (person) => {
      ctrl.person = ctrl.displayName = person.displayName;
      ctrl.department = person.department;
    };

    ctrl.getType = (type) => {
      if (type) {
        ctrl.getSelectedList(type);
      }
    };
  }])
;