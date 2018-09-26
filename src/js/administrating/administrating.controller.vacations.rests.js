app
    .controller('administratingVacationsRestsCtrl', ['administratingService', 'controlMenuService', 'currentEmployeeService', 'translitServiceMy', 'employeesService', '$scope', '$route', '$location', 'modalWindowsService', 'ngDialog', function (administratingService, controlMenuService, currentEmployeeService, translitServiceMy, employeesService, $scope, $route, $location, modalWindowsService, ngDialog) {
        let ctrl = this;
        let serv = controlMenuService;
        ctrl.adminPane = 1

        ctrl.getPane = function () {
            ctrl.adminPane = currentEmployeeService.showPane();
            ctrl.spinner = true
        };
        ctrl.getPane()
        ctrl.getYears = function () {
            administratingService.getYears().then(response => {
                ctrl.restYears = response.sort();
                ctrl.getRests(ctrl.restYears[0])

            })
        };
        ctrl.filterYear = '';
        ctrl.getYears();
        ctrl.getRests = function (period) {
            ctrl.spinner = true
            administratingService.getRests(period).then(response => {
                $scope.personRest = response;
                ctrl.spinner = false
            })
        }
        ctrl.printStat = (x) => {


            let data = document.getElementById('exportable' + x).innerHTML
            let blob = new Blob([data], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, "employees_report_" + new Date().getFullYear() + '_' + (new Date().getMonth() + 1) + ".xls", true);
        }
        ctrl.report = {}
        ctrl.personRestF = false;
        ctrl.getREstsFull = (d, y) => {
            let url = ''
            d && y ? url = '/' + d + '/' + y : d && !y ? url = '/department/' + d : !d && y ? url = '/' + y : url = ''
            ctrl.spinner2 = true;
            administratingService.getRestsFull(url).then(response => {
                ctrl.personRestF = response;

                ctrl.report = ctrl.getJsonForStat(ctrl.personRestF, y)
                ctrl.spinner2 = false;
            })
        };

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

        ctrl.toggleNotes = serv.toggleNotes;
        ctrl.addNote = modalWindowsService.createNote;
        ctrl.togglePanes = serv.togglePanes;

        ctrl.changePane = (pane) => {
            if (serv.checkHash(pane) && serv.checkFormInfo(ctrl.formInfo)) {
                serv.checkSavingModal(pane);
            } else {
                serv.changePane(pane);
            }
        };
        ctrl.getJsonForStat = (obj, year) => {

            let json = {}
            json.header = ['прізвище, ім\'я']
            let temp = []


            if (ctrl.restYears.indexOf(year) < 0) {
                json.header = json.header.concat(ctrl.restYears, ['Загальний залишок'])
                for (dep in obj) {
                    json[dep] = []
                    for (i in obj[dep]) {
                        let temp = [obj[dep][i].surname_ua + ' ' + obj[dep][i].name_ua]
                            temp.push( obj[dep][i].vacation[0][0]?obj[dep][i].vacation[0][0].balance:0)
                            temp.push( obj[dep][i].vacation[1][0]?obj[dep][i].vacation[1][0].balance:0)
                            temp.push( obj[dep][i].vacation[2][0]?obj[dep][i].vacation[2][0].balance:0)
                            temp.push(temp[1]+temp[2]+temp[3])
                        json[dep].push(temp)
                    }
                }
            } else {
                json.header = ['прізвище, ім\'я', year, 'Загальний залишок']
                for (dep in obj) {
                    json[dep] = []
                    for (i in obj[dep]) {
                        let temp = [obj[dep][i].surname_ua + ' ' + obj[dep][i].name_ua, obj[dep][i].vacation[0][0].balance, obj[dep][i].vacation[0][0].total]
                        json[dep].push(temp)
                    }
                }


            }

            // for (key in obj) {
            //
            //
            //     json[key] = []
            //     for (i in obj[key]) {
            //         temp.name = obj[key][i].surname_ua + ' ' + obj[key][i].name_ua
            //
            //     }
            //     ;
            //     if (year) {
            //         temp[obj[key][i].vacation[0].year] = obj[key][i].vacation[0].balance
            //         temp.total += obj[key][i].vacation[0].balance
            //     }
            //     for (j in ctrl.restYears) {
            //
            //
            //         if (obj[key][i].vacation[j][0]) {
            //             temp[obj[key][i].vacation[j][0].year] = obj[key][i].vacation[j][0].balance
            //             temp.total += obj[key][i].vacation[j][0].balance
            //         }
            //         else {
            //             temp[ctrl.restYears[j]] = ''
            //         }
            //     }
            //
            //     json[key].push(temp)
            //
            // }
            // json.header.push('Загальний залишок')
            return json
        }
        ctrl.formJson = () => {

        }

        $scope.showPane = currentEmployeeService.showPane;

    }])
;