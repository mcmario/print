app
  .component('componentControlMenuList', {
    templateUrl: 'static/templates/component.list.control.menu.list.html',
    controller: 'listMenuCompCtrl',
    bindings: {
      person: '=',
      city: '=',
      department: '=',
      people: '=',
    }
  })
;
