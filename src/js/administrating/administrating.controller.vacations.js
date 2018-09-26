app
    .controller('administratingVacationsCtrl', ['administratingService', 'controlMenuService', 'currentEmployeeService', 'translitServiceMy', 'employeesService', '$scope', '$route', '$location', 'modalWindowsService', 'ngDialog', function (administratingService, controlMenuService, currentEmployeeService, translitServiceMy, employeesService, $scope, $route, $location, modalWindowsService, ngDialog) {
        let ctrl = this;
        let serv = controlMenuService;
        ctrl.adminPane = 1

        ctrl.getPane = function () {
            ctrl.adminPane = currentEmployeeService.showPane();
            ctrl.spinner = true


        };
        ctrl.getPane()
        // ctrl.getYears = function () {
        //     administratingService.getYears().then(response => {
        //         $scope.restYears = response.sort();
        //
        //         ctrl.getRests($scope.restYears[0])
        //
        //     })
        // };
        // $scope.filterYear = '';
        // ctrl.filterByYear = (x) => {
        //     $scope.filterYear = x;
        //     ctrl.shownYear = $scope.restYears[x - 2];
        // };

        // ctrl.empStat = {
        //     curEmloyees: '',
        //     disEmployees: '',
        //     averYearCompanyA: '',
        //     averAgeA: '',
        //     averAgeD: '',
        //     averYearCompanyD: '',
        //     statisticsNew: [],
        //     statisticsDis: [],
        //
        // };
        // ctrl.requiredPeriod = {};

        // ctrl.refactorStatistics = (obj) => {
        //     let newobj = {}
        //     for (let key in obj) {
        //         newobj[key] = 0;
        //         for (skey in obj[key]) {
        //
        //             newobj[key] += parseInt(obj[key][skey])
        //
        //         }
        //
        //     }
        //     return newobj
        // }
        // ctrl.getEinfo = function (x) {
        //     let currentTime = new Date()
        //     x ? x : x = '%';
        //     let year = currentTime.getFullYear();
        //     ctrl.requiredPeriod.year = year;
        //     ctrl.requiredPeriod.month = new Date().getMonth() + 1;
        //     ctrl.spinner = true;
        //
        //     // y ? ctrl.requiredPeriod.year = y : y = ctrl.requiredPeriod.year
        //     administratingService.getStatistics('/api/admin/statistick/workers/count/active/' + x).then(response => {
        //             ctrl.empStat.curEmloyees = response;
        //
        //
        //             administratingService.getStatistics('/api/admin/statistick/workers/count/dismissed/' + x).then(response => {
        //                 ctrl.empStat.disEmployees = response;
        //
        //
        //                 administratingService.getStatistics('/api/admin/statistick/workers/average/active/' + x).then(response => {
        //                     ctrl.empStat.averYearCompanyA = response.experience;
        //                     ctrl.empStat.averAgeA = response.year;
        //                     ctrl.empStat.statisticsFullNew = response.statistics;
        //                     ctrl.empStat.statisticsNew = ctrl.refactorStatistics(response.statistics[0]);
        //                     ctrl.empStat.in = response.statistics[0][year][ctrl.requiredPeriod.month];
        //
        //                     administratingService.getStatistics('/api/admin/statistick/workers/average/dismissed/' + x).then(response => {
        //
        //                         ctrl.empStat.averYearCompanyD = response.experience;
        //                         ctrl.empStat.averAgeD = response.year;
        //                         ctrl.empStat.statisticsFullDis = response.statistics;
        //                         ctrl.empStat.statisticsDis = ctrl.refactorStatistics(response.statistics[0]);
        //                         ctrl.empStat.out = response.statistics[0][year][ctrl.requiredPeriod.month];
        //
        //                         ctrl.spinner = false
        //
        //                     })
        //                 })
        //             })
        //
        //         }
        //     )
        //
        //     ctrl.spinner = false
        // }
        // ctrl.getStatByMonth = function (x) {
        //     ctrl.spinner = true
        //     x ? ctrl.requiredPeriod.year = x : x = ctrl.requiredPeriod.year;
        //
        //     ctrl.empStat.in = ctrl.empStat.statisticsFullNew[0][x][ctrl.requiredPeriod.month];
        //     ctrl.empStat.out = ctrl.empStat.statisticsFullDis[0][x][ctrl.requiredPeriod.month];
        //
        //     // administratingService.getStatistics('/api/admin/statistick/period/' + ctrl.requiredPeriod.month + '/' + x).then(response => {
        //     //     ctrl.empStat.in = response.In;
        //     //     ctrl.empStat.out = response.Out;
        //
        //
        //     ctrl.spinner = false
        //     // })
        // }


        // ctrl.getYears();
        // ctrl.getRests = function (period) {
        //     ctrl.spinner = true
        //     administratingService.getRests(period).then(response => {
        //         $scope.personRest = response;
        //         ctrl.spinner = false
        //     })
        //
        //
        // }

        // ctrl.personRestF = false;
        // ctrl.getREstsFull = () => {
        //     ctrl.spinner2 = true;
        //
        //     administratingService.getRestsFull().then(response => {
        //
        //         ctrl.personRestF = response;
        //         ctrl.spinner2 = false;
        //     })


        // };
        // ctrl.getREstsFullDep = (dep) => {
        //     ctrl.spinner = true;
        //
        //     administratingService.getRestsFull(dep).then(response => {
        //
        //         ctrl.personRestF = response;
        //         ctrl.spinner = false;
        //     })


        // };


        // ctrl.showList = () => {
        // }
        // // ctrl.getREstsTest()
        ctrl.showAdminPane = 1
        let depName = '';
        ctrl.department = ''
        $scope.displayNotes = serv.displayNotes;
        $scope.sidebarVisible = serv.sidebarVisible;
        $scope.statusWorker = serv.statusWorker()



        ctrl.toggleNotes = serv.toggleNotes;
        ctrl.addNote = modalWindowsService.createNote;


//filter by city, department, city+department< no filtering
        ctrl.togglePanes = serv.togglePanes;

        ctrl.changePane = (pane) => {
            if (serv.checkHash(pane) && serv.checkFormInfo(ctrl.formInfo)) {
                serv.checkSavingModal(pane);
            } else {
                serv.changePane(pane);
            }
        };
        ctrl.startPeriod = new Date()
        ctrl.endPeriod = new Date()
        // ctrl.vacationsByPeriod = []

        ctrl.getVacationsByPeriod = () => {
            if(ctrl.startPeriod.getTime()>ctrl.endPeriod.getTime()){
                ctrl.endPeriod=new Date(ctrl.startPeriod)
            }

            let x = {
                start: ctrl.startPeriod,
                end: ctrl.endPeriod
            }
            administratingService.getByPeriod(x).then(response => {
                response.forEach(function (item, i, obj) {
                    item.end_date = new Date(item.end_date)
                    item.start_date = new Date(item.start_date)
                })
                ctrl.vacationsByPeriod = response
                return response
            })
        }
        $scope.showPane = currentEmployeeService.showPane;
    }])
;