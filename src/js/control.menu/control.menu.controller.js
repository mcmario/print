app
    .controller('listMenuCompCtrl', ['controlMenuService', 'currentEmployeeService', 'employeesService', '$scope', '$location', 'modalWindowsService',
        function (controlMenuService, currentEmployeeService, employeesService, $scope, $location, modalWindowsService) {
            let ctrl = this;
            let serv = controlMenuService;
            let depName = '';
            ctrl.department = ''
            $scope.displayNotes = serv.displayNotes;
            $scope.sidebarVisible = serv.sidebarVisible;
            $scope.statusWorker = serv.statusWorker()
$scope.departments=[]
            $scope.citieslist=[]
            ctrl.addNote = modalWindowsService.createNote
            ctrl.personStatus = function () {
                if ($location.path().indexOf('active') >= 0) return 'employees/active'
                else if ($location.path().indexOf('dismissed') >= 0) return 'employees/dismissed'
                else if ($location.path().indexOf('ready') >= 0) return 'candidate/ready'
                else if ($location.path().indexOf('reserve') >= 0) return 'candidate/reserve'
                else if ($location.path().indexOf('rejected') >= 0) return 'candidate/rejected'
            }

            ctrl.getDepartments = function () {
                ctrl.spinner = true
                ctrl.employeeCandidate = $location.path().indexOf('employeesC')
                if ($scope.departments.length < 2) {
                    serv.getDepartments()
                        .then(data => {

                            $scope.departments = data;
                            ctrl.spinner = false;
                        });
                }
            };

            ctrl.getCities = function () {
                let x = new Date().getTime()
                if ($scope.citieslist < 2) {
                    serv.getCities()
                        .then(data => {
                            $scope.citieslist = data;
                            let y = new Date().getTime()
                        });


                }
            };

            ctrl.toggleNotes = serv.toggleNotes;
            let listType = $location.path().substring(11);
            ctrl.saveList=(dep,city)=>{
                !dep?dep='all':dep=dep
                !city?city='all':city=city
                let url='/api/employees/xls/'+dep+'/'+city
                controlMenuService.saveList(url)


            }



            ctrl.resetFilters = function () {

                ctrl.department = '';
                ctrl.city = ''
                serv.getUsersAll(listType, $scope.statusWorker).then(function (data) {
                    ctrl.people = data.data;

                })
            };
            //filter by city, department, city+department< no filtering
            ctrl.filterBCD = function () {

                if (ctrl.city === false && ctrl.department === false
                    || ctrl.department === false && !ctrl.city
                    || ctrl.city === false && !ctrl.department) {
                    serv.getUsersAll(listType).then(function (data) {
                        ctrl.people = data.data;
                    })
                } else if (!ctrl.city && ctrl.department || ctrl.city === false && ctrl.department) {
                    serv.getUsersDep(ctrl.department, listType)

                        .then(function (data) {
                            ctrl.people = data.data;
                        })
                } else if (ctrl.city && !ctrl.department || ctrl.city && ctrl.department === false) {
                    serv.getUsersCity(ctrl.city, listType)
                        .then(function (data) {
                            ctrl.people = data.data;


                        })
                } else if (ctrl.city && ctrl.department) {
                    serv.getUsersByDepCity(ctrl.department, ctrl.city, listType)
                        .then(function (data) {
                            ctrl.people = data.data;
                        })

                };
            };
            ctrl.togglePanes = serv.togglePanes;


            ctrl.filterByName = function ($event) {

            };


            ctrl.changePane = (pane) => {

                $scope.pane = pane

                if (pane === 'hire') {
                    serv.changePane(pane)
                }
                else if (serv.checkHash(pane) && serv.checkFormInfo(ctrl.formInfo)) {
                    serv.checkSavingModal(pane);
                } else {
                    serv.changePane(pane);
                }
            };

            $scope.showPane = currentEmployeeService.showPane;

            // ctrl.scrollOnHover = serv.scrollOnHover;
        }])
;