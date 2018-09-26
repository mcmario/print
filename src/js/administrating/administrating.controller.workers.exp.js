app
    .controller('administratingExpCtrl', ['administratingService', 'controlMenuService', 'currentEmployeeService', 'translitServiceMy', 'employeesService', '$scope', '$route', '$location', 'modalWindowsService', 'ngDialog', function (administratingService, controlMenuService, currentEmployeeService, translitServiceMy, employeesService, $scope, $route, $location, modalWindowsService, ngDialog) {
        let ctrl = this;
        let serv = controlMenuService;
        ctrl.adminPane = 1
        ctrl.getPane = function () {
            ctrl.adminPane = currentEmployeeService.showPane();
        };
        ctrl.getPane()
        ctrl.getYears = function () {
            administratingService.getYears().then(response => {
                ctrl.restYears = response.sort();
            })
        };
        $scope.filterYear = '';


        ctrl.getWorkersExpTotal = () => {
            ctrl.expStat = {}
            administratingService.getStatistics('/api/admin/statistick/workers/count/active/all/all').then(response => {
                ctrl.expStat.curEmloyees = response;
                administratingService.getStatistics('/api/admin/statistick/workers/count/dismissed/all/all').then(response => {
                    ctrl.expStat.disEmployees = response;
                    administratingService.getStatistics('/api/admin/statistick/workers/average/active/all/all').then(response => {
                        ctrl.expStat.averExpA = response.experience;
                        ctrl.expStat.averAgeA = response.year;
                        administratingService.getStatistics('/api/admin/statistick/workers/average/dismissed/all/all').then(response => {
                            ctrl.expStat.averExpD = response.experience;
                            ctrl.expStat.averAgeD = response.year;
                            ctrl.createJsonTable()
                        })

                    })
                })
            })

        }
        ctrl.getWorkersExpTotal()
        ctrl.depForXls, ctrl.cityForXls
        ctrl.getWorkersExp = (dep, city) => {
            dep && dep !== 'Усі відділи' ? dep = dep : dep = 'all'
            city && city !== 'Усі міста' ? city = city : city = 'all'
            ctrl.depForXls=dep
            ctrl.cityForXls=dep
            ctrl.expStatDep = {}
            administratingService.getStatistics('/api/admin/statistick/workers/count/active/' + dep + '/' + city).then(response => {
                ctrl.expStatDep.curEmloyees = response;


                administratingService.getStatistics('/api/admin/statistick/workers/count/dismissed/' + dep + '/' + city).then(response => {
                    dep && dep !== 'Усі відділи' ? dep = dep : dep = 'all'
                    city && city !== 'Усі міста' ? city = city : city = 'all'
                    ctrl.expStatDep.disEmployees = response;
                    administratingService.getStatistics('/api/admin/statistick/workers/average/active/' + dep + '/' + city).then(response => {

                        ctrl.expStatDep.averExpA = response.experience;
                        ctrl.expStatDep.averAgeA = response.year;
                        administratingService.getStatistics('/api/admin/statistick/workers/average/dismissed/' + dep + '/' + city).then(response => {
                            ctrl.expStatDep.averExpD = response.experience;
                            ctrl.expStatDep.averAgeD = response.year;

                            ctrl.expStatDif = {}
                            ctrl.expStatDif.ageA = ctrl.expStatDep.averAgeA - ctrl.expStat.averAgeA
                            ctrl.expStatDif.averExpD = ctrl.expStatDep.averExpD - ctrl.expStat.averExpD
                            ctrl.expStatDif.averExpA = ctrl.expStatDep.averExpA - ctrl.expStat.averExpA
                            ctrl.createJsonTable()
                        })
                        // })
                        // })

                        // })

                    })
                })
            })

        }


        ctrl.showAdminPane = 1
        let depName = '';
        ctrl.department = ''
        $scope.displayNotes = serv.displayNotes;
        $scope.sidebarVisible = serv.sidebarVisible;
        $scope.statusWorker = serv.statusWorker()

        ctrl.getDepartments = function () {
            ctrl.spinner = true


            ctrl.employeeCandidate = $location.path().indexOf('employeesC')
            serv.getDepartments()
                .then(data => {
                    $scope.departments = data;

                    ctrl.spinner = false;
                });


        };


        ctrl.getCities = function () {
            administratingService.getCities()
                .then(data => {

                    $scope.citieslist = data;
                });
        };


//filter by city, department, city+department< no filtering
        ctrl.togglePanes = serv.togglePanes;

        ctrl.changePane = (pane) => {
            if (serv.checkHash(pane) && serv.checkFormInfo(ctrl.formInfo)) {
                serv.checkSavingModal(pane);
            } else {
                serv.changePane(pane);
            }
        };


        $scope.showPane = currentEmployeeService.showPane;

        // ctrl.getEinfo('', '')
        ctrl.report = {}
        ctrl.createJsonTable = function (x) {
            ctrl.report = {}
            ctrl.dateStr = new Date().toLocaleDateString()

            ctrl.report[ctrl.dateStr] = []
            ctrl.report[ctrl.dateStr].push([
                'Уся компанія', ctrl.expStat.averAgeA, ctrl.expStat.averExpA, ctrl.expStat.averExpD, ctrl.expStat.curEmloyees, ctrl.expStat.disEmployees
            ])
            if(ctrl.expStatDep){
                ctrl.report[ctrl.dateStr].push([
                    ctrl.depForXls+ctrl.cityForXls?'/'+ctrl.cityForXls:null,ctrl.expStatDep.averAgeA, ctrl.expStatDep.averExpA, ctrl.expStatDep.averExpD, ctrl.expStatDep.curEmloyees, ctrl.expStatDep.disEmployees
                ])
                 ctrl.report[ctrl.dateStr].push([
                    'Різниця',
                     ctrl.expStatDep.averAgeA-ctrl.expStatDep.averAgeA,
                     ctrl.expStatDep.averExpA-ctrl.expStatDep.averExpA,
                     ctrl.expStatDep.averExpD-ctrl.expStatDep.averExpD,
                     ctrl.expStatDep.curEmloyees/ctrl.expStatDep.curEmloyees+'%',
                     ctrl.expStatDep.disEmployees/ctrl.expStatDep.disEmployees+'%'
                ])

            }


            ctrl.report.header = ['Департамент', "Вік працюючих(років)", "Стаж Працюючих(місяці)", "Стаж звыльнених(місяці)", "К-сть працюючих", "К-сть працюючих"]
        }
//

    }
    ])
;
