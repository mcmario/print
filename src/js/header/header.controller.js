app
  .controller('headerCompCtrl', ['$scope','$rootScope', 'RootFactory','$location','$route','modalWindowsService','controlMenuService', function ($scope,$rootScope, RootFactory,$location, $route,modalWindowsService,controlMenuService) {
    let ctrl = this;
ctrl.block=''
      ctrl.semiBlock=''
    ctrl.toggleSidebar = function () {
      RootFactory.set('visibleSidebar', !RootFactory.get('visibleSidebar'));
    };

 ctrl.displayNotes = function () {

                return RootFactory.get('notesStatus');
            };
ctrl.addNote = modalWindowsService.createNote
ctrl.toggleNotes = controlMenuService.toggleNotes;
    ctrl.getUrl=function(){
        let link=$location.path().split('/')
        ctrl.block=link[1]
        ctrl.semiBlock=link[2]

        //
        // if(link.includes('employees')){
        //     ctrl.block='employees'
        //     // if(link.includes('active')){
        //     //     ctrl.semiBlock='active'
        //     // }
        //     // else if(link.includes('dismissed')){
        //     //     ctrl.semiBlock='dismissed'
        //     // }
        //     // else if(link.includes('new')){
        //     //     ctrl.semiBlock='new'
        //     // }
        // }
        // else if(link.includes('candidate')){
        //      ctrl.block='candidate'
        //     // if (link.includes('ready')){
        //     //     ctrl.semiBlock='ready'
        //     // }
        //     // else if (link.includes('reserve')){
        //     //     ctrl.semiBlock='reserve'
        //     // }
        //     // else if (link.includes('rejected')){
        //     //     ctrl.semiBlock='rejected'
        //     // }
        //     // else if (link.includes('new_individ')){
        //     //     ctrl.semiBlock='new_individ'
        //     // }
        //
        //     }
        //     else if (link.includes('polls')){
        //      ctrl.block='polls'}




    }
    ctrl.getUrl()





  }])
;