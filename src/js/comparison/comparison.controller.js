app
    .controller('employeesCompareController', ['employeesCompareService','controlMenuService','modalWindowsService', 'collisionList', '$scope', '$rootScope', '$location','ngDialog', function (employeesCompareService, controlMenuService, modalWindowsService,collisionList, $location, $rootScope, $scope,ngDialog) {
        let ctrl = this;


        ctrl.data = collisionList;
        ctrl.spinner=false

        ctrl.unavailableSync=function(){
            ngDialog.open({
                template: '<div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class=" col-xs-12 text-center">Синхронізація неможлива, оскільки працівнику не присвоєно SID</h3>\n' +
                '<h5 class=" col-xs-12 text-center">Зверніться за допомогою у тех-підтримку</h5>\n' +
                '</div></div>',
                appendClassName: ' material-modal delete_confirmation',
                // controller: 'developPollsController',
                plain: true,
                // controllerAs: 'ctrl',
            });
        }
        ctrl.addNote=modalWindowsService.createNote
         ctrl.toggleNotes =function() {
             controlMenuService.toggleNotes();
             // ctrl.addNote=
         }
        ctrl.startSync = function () {
            ctrl.spinner = true

            ctrl.data = []
            employeesCompareService.startSync().then(
                function (response) {

                    employeesCompareService.getCompareList().then(resp=>{
                        ctrl.data=resp.data
                        ctrl.spinner = false

                    })
                })



        }

    }])
;