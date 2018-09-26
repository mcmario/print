app
    .controller('closedPollsController', ['closedPollsService', 'modalWindowsService','generalPollsService', '$scope','ngDialog', function (closedPollsService, modalWindowsService, generalPollsService,  $scope,ngDialog) {
        let ctrl = this
        ctrl.spinner=true
        ctrl.spinner2=true

        ctrl.copyPoll=function(id, name){
            ctrl.spinner=true

            generalPollsService.copyPoll(id, name)
            ctrl.spinner=false

        };



        ctrl.publicatePoll = function (id) {
            generalPollsService.saveId(id);
            modalWindowsService.publicatePoll()

        };
        ctrl.publicateThisPoll = function () {
            ctrl.spinner=true
            ctrl.spinner2=false

            generalPollsService.publicatePolls(ctrl.pollContacts)
                .then(response => ctrl.$onInit())
        };
        ctrl.dataToDel=''
        ctrl.nameToDel=''
        ctrl.typeConfirmation='123'







        ctrl.deletePoll = function (data, name) {
             $scope.a = data;
            $scope.name = name;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class="text-center">Ви дісно хочете видалити опитування \"{{name}}\"?</h3>\n' +
                '<button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deletePollConfirmed(a,name); closeThisDialog(0)">так</button>\n' +
                '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '</div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,


            });
        }

        $scope.deletePollConfirmed=function (data1,data2) {
            generalPollsService.deletePoll(data1,data2).then(
                response => ctrl.$onInit()
            )
        }


        // ctrl.deletePoll = function (data, name) {
        //     ctrl.spinner=true
        //
        //
        //     generalPollsService.deletePoll(data, name).then(
        //         response =>ctrl.$onInit()
        //
        //     )
        //
        //
        // }
        ctrl.init = (data) => {
            $scope.polls = data;

            ctrl.spinner=false
            ctrl.spinner2=false

        };

        ctrl.$onInit = function () {

            closedPollsService.getClosedPolls()
                .then(data => {
                    ctrl.init(data);

                });
        };
        ctrl.$onInit()


    }])
;