app
    .controller('currEmployeeEducationCtrl', ['$scope', 'currentEmployeeService', 'callsService', 'ngDialog', '$route', function ($scope, currentEmployeeService, callsService, ngDialog, $route) {
        let ctrl = this;
        ctrl.spinner = true
        $scope.eduTypes = currentEmployeeService.getEduTypes().then(data => {
            return data
        })
        ctrl.eduTypes = []
        ctrl.dissmissed = currentEmployeeService.isDissmissed();
        currentEmployeeService.getEduTypes().then(data => ctrl.eduTypes = data);
        ctrl.editEducation = function (n, data) {
            ctrl.edition = []
            ctrl.edition[n] = true;
            ctrl.editedEducation = data
        };
        ctrl.saveEditedEducation = function () {
            currentEmployeeService.saveEditedData(ctrl.editedEducation, 'education');
            ctrl.edition = [];
            $route.reload()
            ctrl.$onInit()


        }
        ctrl.getEduTypes=()=>{
            currentEmployeeService.getEduTypes().then(data => ctrl.eduTypes = data);
        }
        ctrl.deleteEducation = function (data, type) {
            $scope.a = data;
            $scope.b = type;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '        <h3 class="text-center">Ви дісно хочете видалити запис про освіту?</h3>\n' +
                '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteEducationConf(a,b); closeThisDialog(0)">так</button>\n' +
                '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '    </div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,
                // controllerAs: 'ctrl',


            });


        }
        $scope.deleteEducationConf = function (data, type) {

            currentEmployeeService.deleteData(data, type).then(resp => ctrl.$onInit())
        }
        ctrl.addNewEduInfo = function () {
            ctrl.spinner = true
            ctrl.addNewEduInfoToggle = !ctrl.addNewEduInfoToggle;
            currentEmployeeService.getEduTypes().then(data => ctrl.eduTypes = data);

            ctrl.newEduInfo = {
                date_finish: '',
                diplom: '',
                faculty: '',
                form_training: '',
                main_specialty: '',
                main_specialty_year: '',
                name_institute: '',
                qualification: '',
                specialty: '',
                type_education: ''
            }

            ctrl.spinner = false
            return ctrl.eduTypes
        };
        ctrl.test = function () {
        }
        $scope.saveNewEduInfo = function (data) {
            ctrl.addNewFamilyInfoToggle = false

            currentEmployeeService.addNewDataInfo(data, "education").then(resp => {
                $route.reload()
            })

        };


        ctrl.init = (data) => {
            $scope.education = data;
            ctrl.formInfo = $scope.formInfo;

            ctrl.spinner = false
        };

        ctrl.$onInit = function () {
            ctrl.spinner = true
            currentEmployeeService.getEmployeeEducation()
                .then(data => {
                    ctrl.init(data);
                    currentEmployeeService.getEduTypes().then(data => {
                            ctrl.eduTypes = data

                        }
                    )
                });
        };


        // ctrl.submit = function () {
        //   currentEmployeeService.saveData($scope.data, ctrl.url, $scope.formInfo);
        // };
        ctrl.addEduModal = function () {


            currentEmployeeService.addEduModal(ctrl.addNewEduInfo())

        }
        ctrl.call = callsService.call;
    }])
;