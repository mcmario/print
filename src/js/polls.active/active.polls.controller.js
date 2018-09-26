app
    .controller('activePollsController', ['activePollsService', 'generalPollsService', 'modalWindowsService', '$scope', 'ngDialog', function (activePollsService, generalPollsService, modalWindowsService, $scope, ngDialog) {
        let ctrl = this;
        $scope.spinner = true;
        $scope.spinner2 = false;

        ctrl.copyPoll = function (data, name) {
            $scope.spinner = true
            generalPollsService.copyPoll(data, name)
            $scope.spinner = false

        };

        ctrl.closePoll = function (data, name) {
            $scope.a = data;
            $scope.name = name;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class="text-center">Ви дісно хочете завершити опитування \"{{name}}\"?</h3>\n' +
                '<button class="btn btn-success col-xs-5 col-xs-offset-1" ' +
                'ng-click="closePollConfirmed(a,name); closeThisDialog(0)">' +
                'так' +
                '</button>\n' +
                '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '</div></div>',
                appendClassName: 'material-modal delete_confirmation',
                plain: true,
                scope: $scope,
            });
        };


        $scope.closePollConfirmed = function (data1, data2) {
            generalPollsService.closePoll(data1, data2)
                .then(
                    response => ctrl.$onInit()
                )
        }


        ctrl.deleteFromContacts = function (numb, arr) {
            ctrl.pollContacts[arr].splice(numb, 1)
        }

        ctrl.publicatePoll = function (id) {
            $scope.spinner = true

            generalPollsService.saveId(id);
            modalWindowsService.publicatePoll()
            $scope.spinner = false


        };
        ctrl.publicateThisPoll = function () {
            $scope.spinner = true;
            $scope.spinner2 = true;
            generalPollsService.publicatePolls(ctrl.pollContacts)
                .then(response => {

                    ctrl.$onInit()
                })
        };


        ctrl.init = (data, data2) => {
            $scope.polls = data;
            $scope.pollAnk = data2
            $scope.spinner = false
            $scope.spinner2 = false
        };

        ctrl.statPoll = function (id) {
            generalPollsService.saveId(id);
        }

        ctrl.$onInit = function () {
            $scope.spinner = true

            activePollsService.getActivePolls()
                .then(data => {
                    generalPollsService.getDevelopPollsAnk().then(
                        response => {
                            ctrl.init(data, response)
                        }
                    )
                    ;

                });
        };
        ctrl.$onInit()


    }])
;