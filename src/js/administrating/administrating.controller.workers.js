app
    .controller('administratingWorkersCtrl', ['administratingService', 'controlMenuService', 'currentEmployeeService', 'translitServiceMy', 'employeesService', '$scope', '$route', '$location', 'modalWindowsService', 'ngDialog', function (administratingService, controlMenuService, currentEmployeeService, translitServiceMy, employeesService, $scope, $route, $location, modalWindowsService, ngDialog) {
        let ctrl = this;
        let serv = controlMenuService;
        ctrl.adminPane = 1
        ctrl.searchYear = {}
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
        ctrl.filterByYear = (x) => {
            $scope.filterYear = x;
            ctrl.shownYear = $scope.restYears[x - 2];
        };
        ctrl.month = [' ', 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
        // ctrl.month = [' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        // ctrl.empStat = {
        //     curEmloyees: '',
        //     disEmployees: '',
        //     averYearCompanyA: '',
        //     averAgeA: '',
        //     averAgeD: '',
        //     averYearCompanyD: '',
        //     statisticsNew: [],
        //     statisticsDis: [],
        // };
        ctrl.requiredPeriod = {};

        ctrl.refactorStatistics = (obj) => {
            let newobj = {}
            for (let key in obj) {
                newobj[key] = 0;
                for (skey in obj[key]) {
                    newobj[key] += parseInt(obj[key][skey])
                }

            }
            return newobj
        };

        ctrl.getAverageWorkers = (obj) => {
            let newobj = {}
            for (let key in obj) {
                newobj[key] = 0;
                for (skey in obj[key]) {
                    newobj[key] += parseInt(obj[key][skey])
                }

                newobj[key] = Math.round(newobj[key] / Object.keys(obj[key]).length)
            }
            return newobj


        };

        ctrl.tableTitle = ''
        ctrl.getEinfo = function (x, y) {
            // ctrl.spinner = true;
            let currentTime = new Date()
            x && x !== 'Усі відділи' && x !== 'Оберіть департамент' ? x : x = '%';
            y && y !== 'Усі міста' && y !== 'Оберіть місто' ? y : y = '%';

            let year = currentTime.getFullYear();
            ctrl.requiredPeriod.year = year;
            ctrl.requiredPeriod.month = new Date().getMonth() + 1;

            x == '%' ? x = 'all' : x = x;
            y == '%' ? y = 'all' : y = y
            administratingService.getStatistics('/api/admin/worker/active/' + x + '/' + y).then(response => {


                ctrl.empStat = response
                for (let i in response) {
                    let average = 0
                    let TotalIn = 0
                    let TotalOut = 0
                    for (let j in response[i]) {
                        let k = parseInt(j) + 1
                        average += response[i][j][k]
                        TotalIn += response[i][j].in
                        TotalOut += response[i][j].out

                    }

                    ctrl.empStat[i].average = Math.round(average / ctrl.empStat[i].length)
                    ctrl.empStat[i].totalIn = TotalIn;
                    ctrl.empStat[i].totalOut = TotalOut;
                }

                ctrl.spinner = false
                let repYear = 'all'
                ctrl.searchYear.length !== 4 ? repYear = 'all' : repYear = ctrl.searchYear
                ctrl.createJsonTable(repYear)
            })

        }
        ;
        ctrl.childrenInit = () => {
            ctrl.childrenDate = new Date();
            ctrl.childrenDep = '%'
            ctrl.childrenCity = '%'
            let obj = {
                dep: ctrl.childrenDep,
                city: ctrl.childrenCity,
                date: ctrl.childrenDate

            }


        }
        ctrl.children = false
        ctrl.getChildrenInfo = () => {

            !ctrl.childrenDate ? ctrl.childrenDate = new Date() : ctrl.childrenDate
            let obj = {
                dep: ctrl.childrenDep,
                city: ctrl.childrenCity,
                date: ctrl.childrenDate

            }

            administratingService.getChildren(obj).then(resp => {
                ctrl.children = {}
                ctrl.children = resp
                 ctrl.createJsonChildren(ctrl.childrenDep)



            })

        }

        ctrl.getCount = (dep) => {
            let count = 0
            if (dep === 'all') {
                for (let i in ctrl.children) {
                    for (j in ctrl.children[i]) {
                        count += parseInt(ctrl.children[i][j].count)
                    }
                }
                return count
            } else {
                for (let i in ctrl.children[dep]) {

                    count += parseInt(ctrl.children[dep][i].count)
                }
                return count
            }
        }
        ctrl.curYearStatistics = {};


        ctrl.getYears();

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
        ctrl.getTotalQuarter = function (q, period) {
            let total = {
                in: 0, out: 0, workers: 0
            }
            let count = 3

            for (i in [1, 2, 3]) {
                let ind = parseInt(q) * 3 + parseInt(i)

                if (!ctrl.empStat[period][ind]) {
                    break
                }
                total.out += ctrl.empStat[period][ind].out
                total.in += ctrl.empStat[period][ind].in


            }


            return total
        }

        ctrl.getTotalQuarterAv = (q, period) => {
            let count = 3
            let limit = ctrl.empStat[period].length
            let countAv = 0;
            for (i in [1, 2, 3]) {
                let k = parseInt(q) * 3 + parseInt(i)
                if (k >= limit) {
                    count = limit % 3
                    break
                }
                countAv += ctrl.empStat[period][k][k + 1]
            }
            return Math.round(countAv / count)
        }
        $scope.showPane = currentEmployeeService.showPane;
        ctrl.report = {}


        ctrl.createJsonChildren = function (dep) {
            ctrl.report = {}
            ctrl.printStat = true
            if (!ctrl.children) {
                ctrl.printStat = false
                return false
            }
            if (dep === 'all'||dep === '%') {
                for (let key in ctrl.children) {
                    ctrl.report[key] = []
                    for (let i in ctrl.children[key]) {
                        let child = ''
                    for(let j in ctrl.children[key][i]['children']){
                       child = child + ctrl.children[key][i]['children'][j]['name']+ ' '+ ctrl.children[key][i]['children'][j]['birthday'] + '; '
                    }
                        let mRep = [ctrl.children[key][i].surname_ua + ' ' + ctrl.children[key][i].name_ua,ctrl.children[key][i].department.name, ctrl.children[key][i].position.name, ctrl.children[key][i].count, child]
                        ctrl.report[key].push(mRep)
                    }
                }
                ctrl.printStat = true
            }
            else {
                let key = dep
                ctrl.report[key] = []
                for (let i in ctrl.children[key]) {
                     let child = ''
                    for(let j in ctrl.children[key][i]['children']){
                       child = child + ctrl.children[key][i]['children'][j]['name']+ ' '+ ctrl.children[key][i]['children'][j]['birthday'] + '; '
                    }
                    let mRep = [ctrl.children[key][i].surname_ua + ' ' + ctrl.children[key][i].name_ua,ctrl.children[key][i].department.name, ctrl.children[key][i].position.name, ctrl.children[key][i].count, child]
                    ctrl.report[key].push(mRep)

                }

                ctrl.printStat = true
            }
            ctrl.report.header = ['Прізвище, Ім\'я', 'Відділ', "Посада", "Кількість дітей", "Ім\'я та дата народження"]
        }
        //create json for printing employees quantity statistics
        ctrl.createJsonTable = function (year) {
            ctrl.report = {}
            ctrl.printStat = true
            if (!ctrl.empStat) {
                ctrl.printStat = false
                return false
            }
            if (year === 'all') {
                for (let i in ctrl.restYears) {
                    let x = ctrl.restYears[i]


                    ctrl.report[x] = []

                    for (let month in ctrl.empStat[x]) {
                        if (!Number.isInteger(parseInt(month))) {
                            break
                        }
                        let k = parseInt(month) + 1
                        let mRep = [ctrl.month[k], ctrl.empStat[x][month].in, ctrl.empStat[x][month].out, ctrl.empStat[x][month][k]]
                        ctrl.report[x].push(mRep)
                    }
                }
                ctrl.printStat = true
            } else {
                let x = parseInt(year)
                ctrl.report[x] = []
                for (let month in ctrl.empStat[x]) {
                    if (!Number.isInteger(parseInt(month))) {
                        break
                    }
                    let k = parseInt(month) + 1
                    let mRep = [ctrl.month[k], ctrl.empStat[x][month].in, ctrl.empStat[x][month].out, ctrl.empStat[x][month][k]]
                    ctrl.report[x].push(mRep)
                }
                ctrl.printStat = true
            }
            ctrl.report.header = ['Місяць', "Прийнято", "Звільнено","Загальна кількість"]

        }

    }
    ])
;
