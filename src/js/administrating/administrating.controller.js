app
    .controller('administratingGeneralCtrl', ['administratingService', 'controlMenuService', 'currentEmployeeService','RootFactory', 'translitServiceMy', 'employeesService', '$scope', '$route', '$location', 'modalWindowsService', 'ngDialog', function (administratingService, controlMenuService, currentEmployeeService,RootFactory, translitServiceMy, employeesService, $scope, $route, $location, modalWindowsService, ngDialog) {
        let ctrl = this;
        let serv = controlMenuService;
        ctrl.adminPane = 1

        ctrl.getPane = function () {
            ctrl.adminPane = currentEmployeeService.showPane();
            ctrl.spinner = true


        };
        ctrl.getPendingNumber=()=>{
            administratingService.getPendingNumber().then(resp=>{
                $scope.Number=resp
                RootFactory.routingMap[4].elements[4].count=resp.data
            })
        }



        ctrl.getPendingNumber()
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
        //
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
        //
        // ctrl.printStat = function () {
        //     let win = window.open();
        //     let a = '<table class="table table-bordered table-hover" style="width:80%; border: 1px solid black; border-collapse: collapse;" ><tr style="width: 100%; border:2px solid black"><th ng-click="sorter=\'sname\';orderS=!orderS "style="width: 100%; border:2px solid black">прізвище, ім\'я</th>\n' +
        //         '<th style="width: 100%; border:2px solid black">нараховано днів</th>\n' +
        //         '<th style="width: 100%; border:2px solid black">використано днів</th>\n' +
        //         '<th style="width: 100%; border:2px solid black" ng-click="sorter=\'saldo\';orderS=!orderS ">залишок днів</th>\n' +
        //         '</tr>'
        //     for (let i in  $scope.personRest) {
        //         a += '<tr style="width: 100%; border:2px solid black">' +
        //             '' +
        //             '<td style="width: 100%; border:2px solid black">' + $scope.personRest[i].name + ' ' + $scope.personRest[i].sname + '</td> ' +
        //             '<td style="width: 100%; border:2px solid black">' + $scope.personRest[i].count + '</td> ' +
        //             '<td style="width: 100%; border:2px solid black">' + $scope.personRest[i].used + '</td> ' +
        //             '<td style="width: 100%; border:2px solid black">' + $scope.personRest[i].saldo + '</td> ' +
        //             '</tr>'
        //
        //     }
        //     a += '</table>';
        //     win.document.write(a);
        //     win.print();
        //     win.close()
        // };
        //
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
        //
        // ctrl.personRestF = false;
        // ctrl.getREstsFull = () => {
        //     ctrl.spinner2 = true;
        //
        //     administratingService.getRestsFull().then(response => {
        //
        //         ctrl.personRestF = response;
        //         ctrl.spinner2 = false;
        //     })
        //
        //
        // };
        // ctrl.getREstsFullDep = (dep) => {
        //     ctrl.spinner = true;
        //
        //     administratingService.getRestsFull(dep).then(response => {
        //
        //         ctrl.personRestF = response;
        //         ctrl.spinner = false;
        //     })
        //
        //
        // };
        //
        // ctrl.showList = () => {
        // }
        // // ctrl.getREstsTest()
        // ctrl.showAdminPane = 1
        // let depName = '';
        // ctrl.department = ''
        // $scope.displayNotes = serv.displayNotes;
        // $scope.sidebarVisible = serv.sidebarVisible;
        // $scope.statusWorker = serv.statusWorker()
        //
        // // ctrl.getDepartments = function () {
        // //     ctrl.spinner = true
        // //     ctrl.employeeCandidate = $location.path().indexOf('employeesC')
        // //     serv.getDepartments()
        // //         .then(data => {
        // //             $scope.departments = data;
        // //
        // //             ctrl.spinner = false;
        // //         });
        // //
        // //
        // // };
        // //
        // // ctrl.newCity = {
        // //     fk_region: '',
        // //     name: '',
        // //     name_en: ''
        // // }
        // // ctrl.newBranch = {
        // //     city: '',
        // //     name: '',
        // //     name_en: '',
        // //     zip_code: '',
        // //     address_ua: '',
        // //     address_en: '',
        // //     address_ru: ''
        // // }
        //
        //
        // ctrl.getCities = function () {
        //     administratingService.getCities()
        //         .then(data => {
        //
        //             $scope.citieslist = data;
        //         });
        // };
        // ctrl.getRegions = function () {
        //     administratingService.getRegions()
        //         .then(data => {
        //             $scope.regionslist = data;
        //         });
        // };
        // ctrl.newCityModal = modalWindowsService.addNewCity
        //
        //
        // $scope.createNewCity = function (data) {
        //     data.name_en = translitServiceMy.translit(data.name)
        //     administratingService.addNewCity(data).then((response) => {
        //
        //         $route.reload()
        //
        //     })
        // };
        //
        // ctrl.editCity = function (n) {
        //     ctrl.uCity = $scope.citieslist[n]
        //
        // };
        //
        // $scope.saveEdited = function (obj, type) {
        //     delete obj.ngDialogId
        //     let region = {}
        //     obj.name_en = translitServiceMy.translit(obj.name);
        //     if (type === 'city') {
        //         for (let i in $scope.regionslist) {
        //             if (obj.fk_region === $scope.regionslist[i].id) {
        //                 region.name = $scope.regionslist[i].name,
        //                     region.name_en = translitServiceMy.translit($scope.regionslist[i].name)
        //             }
        //
        //         }
        //
        //         delete obj.region;
        //
        //
        //         administratingService.updateCity(obj).then((response) => {
        //             for (let i in $scope.citieslist) {
        //                 if ($scope.citieslist[i].id === obj.id) {
        //                     $scope.citieslist[i] = obj;
        //                     $scope.citieslist[i].region = region;
        //                     break
        //                 }
        //             }
        //
        //             $scope.$apply()
        //         })
        //     }
        //     else if (type === 'branch') {
        //         let city = {}
        //
        //         delete obj.branch;
        //         delete obj.city;
        //         for (i in $scope.citieslist) {
        //             if (obj.fk_city === $scope.citieslist[i].id) {
        //                 city.name = $scope.citieslist[i].name
        //                 break
        //             }
        //         }
        //         obj.address_en = translitServiceMy.translit(obj.address_ua)
        //
        //
        //         administratingService.updateBranch(obj).then((response) => {
        //             for (let i in $scope.branches) {
        //                 if ($scope.branches[i].id === obj.id) {
        //                     $scope.branches[i] = obj
        //                     $scope.branches[i].city = city
        //                     break
        //                 }
        //             }
        //
        //
        //         })
        //
        //
        //     }
        // }
        // $scope.translit=function(word){
        //     return translitServiceMy.translit(word)
        // }
        //
        // ctrl.deleteCity = function (n, i) {
        //     $scope.a = n;
        //     $scope.i = i;
        //     ngDialog.open({
        //         template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
        //         '<h3 class="text-center">Ви дісно хочете видалити місто {{a}}?</h3>\n' +
        //         '<button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteCityConf(i); closeThisDialog(0)">так</button>\n' +
        //         '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
        //         '</div></div>',
        //         appendClassName: 'material-modal delete_confirmation',
        //
        //         plain: true,
        //         scope: $scope,
        //
        //
        //     });
        // }
        // $scope.deleteCityConf = function (id) {
        //     administratingService.deleteData(id, 'city').then(response => {
        //
        //         for (let i in $scope.citieslist) {
        //             if ($scope.citieslist[i].id === id) {
        //                 $scope.citieslist.splice(i, 1)
        //                 break
        //             }
        //         }
        //     })
        //
        //
        // }
        //
        //
        // ctrl.newBranchModal = modalWindowsService.addNewBranch
        //
        //
        // ctrl.getBranches = function () {
        //     administratingService.getBranches().then((response) => {
        //         $scope.branches = response
        //
        //     })
        // }
        // $scope.createNewBranch = function (data) {
        //     data.name_en = translitServiceMy.translit(data.name);
        //     data.address_en = translitServiceMy.translit(data.address_ua);
        //     administratingService.addNewBranch(data).then((response) => {
        //
        //         $route.reload()
        //
        //
        //     })
        // }
        // ctrl.editBranch = function (n) {
        //     ctrl.uBranch = $scope.branches[n]
        //
        // };
        //
        //
        // ctrl.deleteBranch = function (n, id) {
        //     $scope.a = n;
        //     $scope.i = id;
        //     ngDialog.open({
        //         template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
        //         '        <h3 class="text-center">Ви дісно хочете видалити філіал {{a}}?</h3>\n' +
        //         '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteBranchConf(i); closeThisDialog(0)">так</button>\n' +
        //         '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
        //         '    </div></div>',
        //         appendClassName: 'material-modal delete_confirmation',
        //
        //         plain: true,
        //         scope: $scope,
        //         // controllerAs: 'ctrl',
        //
        //
        //     });
        // }
        // $scope.deleteBranchConf = function (id) {
        //     administratingService.deleteData(id, 'branch').then(response => {
        //             for (let i in $scope.branches) {
        //                 if ($scope.branches[i].id === id)
        //                     $scope.branches.splice(i, 1)
        //             }
        //         }
        //     )
        //
        //
        // };
        //
        //
        // ctrl.getBranches()
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
        // ctrl.startPeriod = new Date()
        //
        // ctrl.endPeriod = new Date(ctrl.startPeriod.getTime() + 2592000)
        // ctrl.vacationsByPeriod = []
        // ctrl.getVacationsByPeriod = () => {
        //     let x = {
        //         start: ctrl.startPeriod,
        //         end: ctrl.endPeriod
        //     }
        //
        //     administratingService.getByPeriod(x).then(response => {
        //
        //         response.forEach(function (item, i, obj) {
        //             item.end_date = new Date(item.end_date)
        //             item.start_date = new Date(item.start_date)
        //         })
        //         ctrl.vacationsByPeriod = response
        //         return response
        //     })
        // }
        // ctrl.showInfo = (data) => {
        //     // $scope.City = data
        //     ngDialog.open({
        //
        //         template: 'static/templates/component.administrating.edit.modal.html',
        //
        //         controller: 'administratingCtrl',
        //         controllerAs: 'ctrl',
        //         data: data,
        //
        //         scope: $scope,
        //
        //
        //     });
        // }


        $scope.showPane = currentEmployeeService.showPane;


    }])
;