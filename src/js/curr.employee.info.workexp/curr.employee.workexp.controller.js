app
    .controller('currEmployeeWorkExpCtrl', ['$scope', 'currentEmployeeService', 'callsService','ngDialog','$route', function ($scope, currentEmployeeService, callsService,ngDialog,$route) {
        let ctrl = this;
        ctrl.spinner=true
        $scope.workExpC=[]
        ctrl.dissmissed = currentEmployeeService.isDissmissed();
        ctrl.addWorkExpModal=currentEmployeeService.addWorkExpModal
        ctrl.editWorkExp = function (n, data) {
            ctrl.edition = []
            ctrl.edition[n] = true;
            ctrl.editedWorkExp = data
        };
        ctrl.saveEditedWorkExp = function (type) {
            currentEmployeeService.saveEditedData(ctrl.editedWorkExp, 'experience').then(response =>
                ctrl.$onInit()
            );
            ctrl.edition = [];
        };
        ctrl.objExpComponent=function () {
            $scope.workExpC=$scope.workExp.slice(-2).reverse()

        }
        ctrl.addNewWorkExpInfo = function () {
            ctrl.addNewWorkExpInfoToggle = !ctrl.addNewWorkExpInfoToggle
            ctrl.newWorkExpInfo = {
                workplace: '',
                position: '',
                duties: '',
                salary: '',
                years: '',
                dismissal_reason: '',

            }

        }
        $scope.saveNewWorkExpModal = function (data) {
            ctrl.addNewWorkExpInfoToggle = false
            currentEmployeeService.addNewDataInfo(data, "experience").then(
               response=> {

                   $route.reload()


               }
            )

        };
        ctrl.changeWidget=function(){

        }

        ctrl.deleteWorkExp = function (data) {
            $scope.a=data;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '        <h3 class="text-center">Ви дісно хочете видалити запис про досвід роботи?</h3>\n' +
                '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteWorkExperienceConf(a); closeThisDialog(0)">так</button>\n' +
                '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '    </div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,
                // controllerAs: 'ctrl',


            });


        }
            $scope.deleteWorkExperienceConf=function(data){
            currentEmployeeService.deleteData(data, 'experience').then(response=> ctrl.$onInit()
            )
        };


        ctrl.init = (data) => {
            $scope.workExp = data;
            ctrl.formInfo = $scope.formInfo;
            ctrl.spinner=false
            ctrl.objExpComponent()
        };

        ctrl.$onInit = function () {

            currentEmployeeService.getEmployeeWorkExp(ctrl.url)
                .then(data => {
                    ctrl.init(data);

                });
        };


        ctrl.call = callsService.call;
    }])
;