app
    .controller('currEmployeeDocumentsCtrl', ['$scope', '$rootScope', 'currentEmployeeService', '$route','modalWindowsService', function ($scope, $rootScope, currentEmployeeService, $route,modalWindowsService) {
        let ctrl = this;
        $scope.spinner = true
        ctrl.showDocument = function (doc) {
            // $rootScope.currentDocument = doc
            currentEmployeeService.showDocumentModal(doc)

        };


        ctrl.changeDocStatus = function (doc) {
            $scope.spinner = true
            if (doc.status === 'active') {
                status = 'not active'
            }
            else {
                status = 'active'
            }
            currentEmployeeService.changeDocStatus(doc.id, status).then((response) => {

                ctrl.reloadDocs()
            });

        };
        ctrl.editPhoto=(obj)=>{

            modalWindowsService.documentEditModal(obj)
        }
        ctrl.test = function () {
        }

        ctrl.checkPasIpn = function () {

        }
        ctrl.reloadDocs = function () {
            $route.reload()
        }

        ctrl.init = (data, docs) => {
            $scope.data = data;
            ctrl.formInfo = true;
            $scope.documents = docs
            $scope.spinner = false
        };
        ctrl.uploadNewDocument = () => {
            $scope.NewImage = ctrl.data

            currentEmployeeService.uploadFileModal(ctrl.data, '');
        };
        ctrl.uploadNewPhoto = () => {


            currentEmployeeService.uploadPhotoModal(ctrl.data, '');
        };
        ctrl.docsPas = false
        ctrl.disactivePanel = false
        ctrl.$onInit = function () {
            ctrl.url = '/';
            currentEmployeeService.getData(ctrl.url)
                .then(data => {

            currentEmployeeService.getEmployeeDocuments().then((response) => {
                    let t = false
                    for (let i in response) {
                        response[i].src = '/get/document/' + response[i].id
                        if (response[i].status == 'not active') {
                            t = true
                        }
                        if (response[i].type_ === 'passport') {
                            response[i].type_ = 'паспорт'
                            ctrl.docsPas = true
                        }
                        else if (response[i].type_ === 'photo') {
                            response[i].type_ = 'фото'
                        }
                        else if (response[i].type_ === 'ipn') {
                            response[i].type_ = 'ІПН'
                            ctrl.docsPas = true
                        }
                        else if (response[i].type_ === 'education') {
                            response[i].type_ = 'документи про освіту'
                        }
                        else if (response[i].type_ === 'license') {
                            response[i].type_ = 'посвідчення водія'
                        } else if (response[i].type_ === 'children') {
                            response[i].type_ = 'Свідоцтво про народження дитини '
                        }
                        else if (response[i].type_ === 'other') {
                            response[i].type_ = 'інше'
                        }
                    }
                    ctrl.disactivePanel = t
                    ctrl.init(data, response);
                }
            )
            }
            );
        };
        $scope.$on('reloadDocumentsData', function () {
            ctrl.$onInit();
        });

    }])
;