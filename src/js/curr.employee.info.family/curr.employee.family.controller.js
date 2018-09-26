app
    .controller('currEmployeeFamilyCtrl', ['$scope', 'currentEmployeeService', 'callsService', '$route', 'ngDialog', function ($scope, currentEmployeeService, callsService, $route, ngDialog) {
        let ctrl = this;
        ctrl.spinner = true
        ctrl.dissmissed = currentEmployeeService.isDissmissed();
        ctrl.worker = currentEmployeeService.isWorker()
        ctrl.candidate = currentEmployeeService.isCandidate()
        ctrl.femId = ''
        ctrl.newRelInfo = {

            name: '',
            surname: '',
            workplace: '',
            birthday: '',
            position: '',
            type_: ''
        }

        // ctrl.newRelInfo = {
        //         date: '',
        //         name: '',
        //         position: '',
        //         sname: '',
        //         type: '',
        //         work_place: ''
        //     }
        ctrl.test = function () {
        }
        ctrl.editFamily = function (n, data) {
            ctrl.edition = []
            ctrl.edition[n] = true;
            ctrl.editedRelative = data
            ctrl.editedRelative.birthday = new Date(data.birthday)
            ctrl.femId = data.id


        }
        ctrl.cancelEdition = function (n) {
            ctrl.edition[n] = false
            $scope.family[n].date = new Date($scope.family[n].date)
        }


        ctrl.saveEditedRelative = function (type) {
            ctrl.spinner = true
            ctrl.editedRelative.birthday = new Date(ctrl.editedRelative.birthday)

            delete ctrl.editedRelative.id
            currentEmployeeService.saveEditedFamily(ctrl.editedRelative, 'family', ctrl.femId).then(response => {
                ctrl.edition = []
                ctrl.$onInit()
            })
        }


        ctrl.addNewRelInfo = function () {
            ctrl.addNewFamilyInfoToggle = !ctrl.addNewFamilyInfoToggle;
            ctrl.newRelInfo = {

                name: '',
                surname: '',
                workplace: '',
                birthday: '',
                position: '',
                type_: ''
            }

        };
        ctrl.saveNewRelInfo = function () {
            ctrl.addNewFamilyInfoToggle = false
            ctrl.newRelInfo.date = new Date(ctrl.newRelInfo.date)
        };
        $scope.saveNewRelModal = function (data) {

            currentEmployeeService.addNewDataInfo(data, "family").then(
                response => {

                    $route.reload()
                    return true
                }
            )
        };

        ctrl.deleteRelative = function (data) {

            $scope.a = data;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '        <h3 class="text-center">Ви дісно хочете видалити запис про члена сім\'ї?</h3>\n' +
                '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteFamilyConf(a); closeThisDialog(0)">так</button>\n' +
                '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '    </div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,
                // controllerAs: 'ctrl',


            });


        };


        $scope.deleteFamilyConf = function (data) {
            currentEmployeeService.deleteData(data, 'family').then(response => ctrl.$onInit()
            )
        };


        ctrl.init = (data) => {
            ctrl.neRelSaved = false
            $scope.family = data;

            //
            // for (let i in $scope.family) {
            //     if ($scope.family[i].date) {
            //         $scope.family[i].date = new Date($scope.family[i].date).toISOString().slice(0, 10)
            //     }
            // }
            // for (let i in $scope.family) {
            //     for (let j in $scope.family[i]) {
            //         if ($scope.family[i][j]!==null&& $scope.family[i][j].toString().indexOf('00:00') >= 0) {
            //             $scope.family[i][j] = currentEmployeeService.changeDate($scope.family[i][j])
            //         }
            //     }
            // }
            ctrl.formInfo = $scope.formInfo;
            ctrl.spinner = false
        };

        ctrl.$onInit = function () {

            currentEmployeeService.getEmployeeFamily(ctrl.url)
                .then(data => {
                    ctrl.init(data);

                });
        };


        // ctrl.submit = function () {
        //   currentEmployeeService.saveData($scope.data, ctrl.url, $scope.formInfo);
        // };
        ctrl.addFamilyModal = currentEmployeeService.addFamilyModal
        ctrl.call = callsService.call;
    }])
;