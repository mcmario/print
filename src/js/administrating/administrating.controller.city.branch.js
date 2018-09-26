app
    .controller('administratingCityBranchCtrl', ['administratingService', 'controlMenuService', 'currentEmployeeService', 'translitServiceMy', 'employeesService', '$scope', '$route', '$location', 'modalWindowsService', 'ngDialog', function (administratingService, controlMenuService, currentEmployeeService, translitServiceMy, employeesService, $scope, $route, $location, modalWindowsService, ngDialog) {
        let ctrl = this;
        let serv = controlMenuService;
        ctrl.adminPane = 1

        ctrl.getPane = function () {
            ctrl.adminPane = currentEmployeeService.showPane();
            ctrl.spinner = true


        };
        ctrl.getPane()


        ctrl.showList = () => {
        }
        // ctrl.getREstsTest()
        ctrl.showAdminPane = 1
        let depName = '';
        ctrl.department = ''
        $scope.depList = []
        $scope.displayNotes = serv.displayNotes;
        $scope.sidebarVisible = serv.sidebarVisible;
        $scope.statusWorker = serv.statusWorker()
        ctrl.getCities = function () {
            administratingService.getCities()
                .then(data => {

                    $scope.citieslist = data;
                });
        };
        ctrl.getRegions = function () {
            administratingService.getRegions()
                .then(data => {
                    $scope.regionslist = data;
                });
        };
        ctrl.getDepartments_list = function () {
            administratingService.getDepartments_list()
                .then(data => {
                    $scope.depList = data;
                });
            // scope.department_list=[
            //     {id:1,
            //     name:'some name',
            //     status :'active'
            //     },{id:3,
            //     name:'some name3',
            //     status :'active'
            //     },{id:2,
            //     name:'some name2',
            //     status :'active'
            //     },{id:4,
            //     name:'some name4',
            //     status :'notactive'
            //     },{id:5,
            //     name:'some name5',
            //     status :'notactive'
            //     },{id:6,
            //     name:'some name6',
            //     status :'notactive'
            //     }


            // ]


        };
        ctrl.newCityModal = function () {
            modalWindowsService.addNewCity()
        }


        $scope.createNewCity = function (data) {
            data.name_en = translitServiceMy.translit(data.name.replace(/['"]/g,""))
            administratingService.addNewCity(data).then((response) => {

                $route.reload()

            })
        };

        ctrl.editCity = function (n) {
            ctrl.uCity = $scope.citieslist[n]

        };

        $scope.saveEdited = function (obj, type) {
            delete obj.ngDialogId
            let region = {}
            obj.name_en = translitServiceMy.translit(obj.name.replace(/['"]/g,""));
            if (type === 'city') {
                for (let i in $scope.regionslist) {
                    if (obj.fk_region === $scope.regionslist[i].id) {
                        region.name = $scope.regionslist[i].name,
                            region.name_en = translitServiceMy.translit($scope.regionslist[i].name.replace(/['"]/g,""))
                    }

                }

                delete obj.region;


                administratingService.updateCity(obj).then((response) => {
                    for (let i in $scope.citieslist) {
                        if ($scope.citieslist[i].id === obj.id) {
                            $scope.citieslist[i] = obj;
                            $scope.citieslist[i].region = region;
                            break
                        }
                    }

                    $scope.$apply()
                })
            }
            else if (type === 'branch') {
                let city = {}

                delete obj.branch;
                delete obj.city;
                for (i in $scope.citieslist) {
                    if (obj.fk_city === $scope.citieslist[i].id) {
                        city.name = $scope.citieslist[i].name
                        break
                    }
                }
                obj.address_en = translitServiceMy.translit(obj.address_ua.replace(/['"]/g,""))


                administratingService.updateBranch(obj).then((response) => {
                    for (let i in $scope.branches) {
                        if ($scope.branches[i].id === obj.id) {
                            $scope.branches[i] = obj
                            $scope.branches[i].city = city
                            break
                        }
                    }


                })


            }
        }
        $scope.translit = function (word) {
            return translitServiceMy.translit(word.replace(/['"]/g,""))
        }

        ctrl.deleteCity = function (n, i) {
            $scope.a = n;
            $scope.i = i;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class="text-center">Ви дісно хочете видалити місто {{a}}?</h3>\n' +
                '<button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteCityConf(i); closeThisDialog(0)">так</button>\n' +
                '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '</div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,


            });
        }
        ctrl.depChangeStatus = function (obj, type) {
            $scope.status = obj.status;
            $scope.id = obj.id;
            $scope.name = obj.name;
            $scope.type = type;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class="text-center">Ви дісно хочете <strong ng-bind="status===\'active\'?\'деактивувати\':\'активувати\'"></strong> <span>{{type}}</span> {{name}}?</h3>\n' +
                '<button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="depStatusChangeConfirm(id,status,type); closeThisDialog(0)">так</button>\n' +
                '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '</div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,


            });
        }
        $scope.depStatusChangeConfirm = function (id, status, type) {
            administratingService.changeDepStatus(id, status, type).then(response => {
                    if (response == 'ok') {

                        $route.reload()


                        return response
                    }


                }
            )


        }


        $scope.deleteCityConf = function (id) {
            administratingService.deleteData(id, 'city').then(response => {

                for (let i in $scope.citieslist) {
                    if ($scope.citieslist[i].id === id) {
                        $scope.citieslist.splice(i, 1)
                        break
                    }
                }
            })


        }


        ctrl.newBranchModal = modalWindowsService.addNewBranch


        ctrl.getBranches = function () {
            administratingService.getBranches().then((response) => {
                $scope.branches = response

            })
        }
        $scope.createNewBranch = function (data) {
            data.name_en = translitServiceMy.translit(data.name.replace(/['"]/g,""));
            data.address_en = translitServiceMy.translit(data.address_ua.replace(/['"]/g,""));
            administratingService.addNewBranch(data).then((response) => {

                $route.reload()


            })
        }
        ctrl.editBranch = function (n) {
            ctrl.uBranch = $scope.branches[n]

        };


        ctrl.deleteBranch = function (n, id) {
            $scope.a = n;
            $scope.i = id;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '        <h3 class="text-center">Ви дісно хочете видалити філіал {{a}}?</h3>\n' +
                '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteBranchConf(i); closeThisDialog(0)">так</button>\n' +
                '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '    </div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,
                // controllerAs: 'ctrl',


            });
        }
        $scope.deleteBranchConf = function (id) {
            administratingService.deleteData(id, 'branch').then(response => {
                    for (let i in $scope.branches) {
                        if ($scope.branches[i].id === id)
                            $scope.branches.splice(i, 1)
                    }
                }
            )


        };


        ctrl.getBranches()
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

        ctrl.showInfo = (data) => {
            // $scope.City = data
            ngDialog.open({

                template: 'static/templates/component.administrating.edit.modal.html',

                controller: 'administratingCityBranchCtrl',
                controllerAs: 'ctrl',
                data: data,

                scope: $scope,


            });
        }

        $scope.showPane = currentEmployeeService.showPane;

        // ctrl.adminPane === 4 ? ctrl.getEinfo() : null;
        // ctrl.adminPane === 2 ? ctrl.getCities() : null;
        ctrl.adminPane === 1 ? (ctrl.getCities(), ctrl.getRegions(), ctrl.getDepartments_list()) : null

// ctrl.scrollOnHover = serv.scrollOnHover;
    }])
;