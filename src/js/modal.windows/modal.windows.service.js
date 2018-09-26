app
    .service('modalWindowsService', ['ngDialog', '$route','$location', function (ngDialog, $route,$location) {

        let serv = this;

        serv.uploadFileModal = (person, fileType) => {
            ngDialog.open({
                template: 'static/templates/curr.employee.documents.modal.html',
                appendClassName: 'material-modal modal10',
                controller: 'currEmployeeDocumentsModalCtrl',

                controllerAs: 'ctrl',
                resolve: {
                    fileType: function () {
                        return fileType || false;
                    },
                    person: function () {
                        return person;
                    }
                }
            });
        };
        serv.uploadPhotoModal = (data) => {
            ngDialog.open({
                template: 'static/templates/curr.employee.edit.photo.modal.html',
                appendClassName: 'material-modal modal10',
                controller: 'currEmployeePhotoEditModalCtrl',

                controllerAs: 'ctrl',
                data: data
                // resolve: {
                //     fileType: function () {
                //         return fileType || false;
                //     },
                //     person: function () {
                //         return person;
                //     }
                // }
            });
        };
        serv.uploadPhotoModalNew = (data) => {
            ngDialog.open({
                template: 'static/templates/curr.employee.edit.photo.modal.new.html',
                appendClassName: 'material-modal modal10',
                controller: 'currEmployeePhotoEditModalCtrl',

                controllerAs: 'ctrl',
                data: data
                // resolve: {
                //     fileType: function () {
                //         return fileType || false;
                //     },
                //     person: function () {
                //         return person;
                //     }
                // }
            });
        };


        serv.showVacationDocumentModal = (data) => {

            data.filename.indexOf('.pdf') < 0 ? data.file = '/vacation/document/' + data.id : data.pdf = '/vacation/document/' + data.id

            ngDialog.open({
                template: 'static/templates/curr.employee.vacation.documents.modal.html',
                appendClassName: 'material-modal',
                controller: ['$scope', 'currentEmployeeService', '$timeout', function ($scope, currentEmployeeService, $timeout) {
                    $scope.printDocModalVac = function () {
                        if (data.pdf) {
                            let windo = window.open("", "");
                            let objbuilder = '';
                            objbuilder += ('<embed width=\'100%\' height=\'100%\'  src="data:application/pdf;base64,');
                            objbuilder += (data.file);
                            objbuilder += ('" type="application/pdf" />');
                            windo.document.write(objbuilder);
                        } else {
                            let win = window.open('/vacation/document/' + data.id);

                            let xxx = $timeout(function () {
                                win.print()

                            }, 100)
                        }


                        // let y = '<div style="background: red;width: 200px; height: 300px;" background=""></div>'
                        //
                        // let x = "<div style='width:100%;display:flex; justify-content:center;height:500px;' background='/vacation/document/"+parseInt(data.id)+"'></div>"
                        //
                        //     // "<img style='max-height: 100%; max-width: 90%' src='/vacation/document/" + data.id + "'></div>"
                        // let win = window.open('/vacation/document/' + data.id);

                        // win.document.write(x)
                        // setTimeout(600,win.print())
                        // let win2=window.open()


                        // "<div style='width: 90%; display: flex; justify-content: center; height: auto;'><div style="" src='data:image/gif;base64,"+data.file+"' style='max-width: 90%;'></div>");
                        // win.close()
                    }
                }],
                data: data

            });


            // let win = window.open();
            // win.document.write('' +
            //     "<div style='width: 100%; display: flex; justify-content: center'><img src='" + data + "' style='max-width: 90%;'></div>");
            // win.print();
            // win.close()
        };
        serv.showVacationRestDism = (obj) => {

            ngDialog.open({
                template: 'static/templates/curr.employee.vacation.rest.modal.html',
                appendClassName: 'material-modal',
                controller: 'currEmployeeInfoCtrl',
                controllerAs: 'ctrl',
                data: obj

            });
        };
        serv.vacationConfirmDeleteModal = function (id, type, data) {
            data ? data : data = {}
            ngDialog.open({
                template: 'static/templates/curr.employee.vacation.confirm.modal.html',
                appendClassName: 'material-modal ',
                controller: 'currEmployeeVacationsCtrl',
                controllerAs: 'ctrl',
                data: {
                    id: id,
                    type: type,
                    data: data
                }

            });
        }
        serv.vacationAddModal = function (obj) {
            ngDialog.open({
                template: 'static/templates/curr.employee.info.general.vacation.add.modal.html',
                appendClassName: 'material-modal ',
                controller: 'currEmployeeVacationsCtrl',
                controllerAs: 'ctrl',
                data: obj

            });
        }
        // serv.documentEditModal = function (obj) {
        //     ngDialog.open({
        //         template: 'static/templates/curr.employee.edit.photo.modal.html',
        //         appendClassName: 'material-modal ',
        //         controller: 'currEmployeeDocumentsEditModalCtrl',
        //         controllerAs: 'ctrl',
        //         data: obj
        //
        //     });
        // }
        serv.editPermissions = function (obj) {
            ngDialog.open({
                template: 'static/templates/curr.employee.add.permissions.modal.html',
                appendClassName: 'material-modal ',
                controller: ['$scope', 'currentEmployeeService', function ($scope, currentEmployeeService) {
                    $scope.editPermissionsConfirmation = (obj) => {
                        currentEmployeeService.savePermissions(obj)

                    }
                }],

                data: obj

            });
        }

        serv.addWorkExpModal = function () {
            ngDialog.open({
                template: 'static/templates/curr.employee.info.general.workexp.add.modal.html',
                appendClassName: 'material-modal ',
                controller: 'currEmployeeWorkExpCtrl',
                controllerAs: 'ctrl',
            })
        }
        serv.addFamilyModal = function () {
            ngDialog.open({
                template: 'static/templates/curr.employee.info.general.family.add.modal.html',
                appendClassName: 'material-modal ',
                controller: 'currEmployeeFamilyCtrl',
                controllerAs: 'ctrl',
            })
        }
        serv.addEduModal = function (obj) {
            ngDialog.open({
                template: 'static/templates/curr.employee.info.general.edu.add.modal.html',
                appendClassName: 'material-modal education-modal',
                controller: 'currEmployeeEducationCtrl',
                controllerAs: 'ctrl',
                data: obj
            })
        }
        serv.pollsConfirmDeleteModal = function () {
            ngDialog.open({
                template: 'static/templates/polls.confirm.modal.html',
                appendClassName: 'material-modal delete_confirmation',
                controller: 'activePollsController',

                controllerAs: 'ctrl',

            });
        }
        serv.newEmpAlert = (data) => {
            ngDialog.open({
                template: 'static/templates/employee.new.alert.html',
                appendClassName: 'material-modal delete_confirmation',
                controller: ['$scope', function ($scope) {


                }],
                data: data

            })
        }

        serv.showDocumentModal = (data) => {
            ngDialog.open({
                template: 'static/templates/curr.employee.show.documents.modal.html',
                appendClassName: 'image_preview_modal',
                controller: ['$scope', 'currentEmployeeService', 'modalWindowsService', '$timeout', function ($scope, currentEmployeeService, modalWindowsService, $timeout) {
                    $scope.editDocModal = function (obj) {

                        modalWindowsService.documentEditModal(obj)

                    }

                    $scope.printDocModal = function () {

                        let win = window.open(data.src);
                        //
                        let xxx = $timeout(function () {
                            win.print()

                        }, 100)
                        // }


                    }
                }],
                data: data


            });
        };
        serv.showModalQR = () => {
            ngDialog.open({
                template: 'static/templates/curr.employee.show.QR.modal.html',
                appendClassName: 'qr_preview_modal',
                controller: 'currEmployeeInfoCtrl',

                controllerAs: 'ctrl',


            });
        };


        serv.addCandidate = () => {
            ngDialog.open({

                template: 'static/templates/candidate.new.modal.html',
                // appendClassName: 'attention_modal',
                controller: 'newIndividPollsController',
                controllerAs: 'ctrl',
            });
        };
        serv.addNewCity = () => {
            ngDialog.open({

                template: 'static/templates/administrating.city.modal.html',
                // appendClassName: 'attention_modal',
                controller: 'administratingCityBranchCtrl',
                controllerAs: 'ctrl',
            });
        };
        serv.addNewBranch = () => {
            ngDialog.open({

                template: 'static/templates/administrating.branch.modal.html',
                // appendClassName: 'attention_modal',
                controller: 'administratingCityBranchCtrl',
                controllerAs: 'ctrl',
            });
        };
        serv.publicatePoll = (x) => {
            ngDialog.open({

                template: 'static/templates/publicate.poll.modal.html',
                appendClassName: 'polls_modal_publicate',
                controller: 'developPollsController',
                controllerAs: 'ctrl',
            });
        };
        serv.checkSavingModal = (pane) => {
            ngDialog.open({
                template: 'static/templates/curr.employee.info.modal.html',
                appendClassName: 'attention_modal',
                showClose: false,
                closeByDocument: false,
                controller: ['controlMenuService', 'pane', '$scope', function (controlMenuService, pane, $scope) {
                    this.changePane = () => {
                        controlMenuService.changePane(pane);
                        $scope.closeThisDialog(0);
                    };
                }],
                controllerAs: 'ctrl',
                resolve: {
                    pane: () => pane
                }
            });
        };
        serv.createNote = function (note, emit, cancelling, form) {
            ngDialog.open({
                template: 'static/templates/create.note.modal.html',
                appendClassName: 'new-note-modal',
                controller: 'notesNewController',
                controllerAs: 'ctrl',
                resolve: {}
            });
        };
        serv.deleteNote = (note, emit, cancelling, form) => {
            ngDialog.open({
                template: 'static/templates/delete.note.modal.html',
                appendClassName: 'material-modal delete_confirmation ',
                controllerAs: 'ctrl',

            });
        };

        serv.showDuties = (data, id) => {
            let duties = []
            data ? duties = data.split('&^&') : duties = []
            ngDialog.open({
                template: 'static/templates/curr.employee.info.duties.html',
                // appendClassName: 'attention_modal',
                controller: ['controlMenuService', 'currentEmployeeService', '$scope', 'toastsService', function (controlMenuService, currentEmployeeService, $scope, toastsService) {
                    let ctrl = this;


                    ctrl.tehtareaHeight = (x) => {
                        document.getElementById('duty' + x).style.height = '61px'
                    }
                    $scope.checkDuties = (arr) => {
                        let newArr = arr.slice().sort()
                        if (newArr.length >= 2) {
                            for (let i = 0; i <= newArr.length - 1; i++) {
                                if (newArr[i + 1] == newArr[i]) {
                                    toastsService.customMessageEr('jlyfrjds j,jd')
                                    return false
                                }
                            }
                        }
                        return true
                    }
                    $scope.saveDuties = (arr, id) => {
                        let newArr = arr.slice().sort()
                        if (newArr.length >= 2) {
                            for (let i = 0; i <= newArr.length - 1; i++) {
                                if (newArr[i + 1] == newArr[i]) {
                                    toastsService.customMessageEr('jlyfrjds j,jd')
                                    return false
                                }
                            }
                        }
                        currentEmployeeService.saveDuties(arr, id).then(resp => {
                                ngDialog.close()
                                $route.reload()
                            }
                        )
                    }


                }],
                controllerAs: 'ctrl',
                data: {
                    duties: duties,
                    id: id
                }
            });
        };
        serv.showManager = (id, manager, lev, list) => {
            ngDialog.open({
                template: 'static/templates/curr.employee.info.manager.html',
                // appendClassName: 'attention_modal',
                controller: ['controlMenuService', 'currentEmployeeService', '$scope', function (controlMenuService, currentEmployeeService, $scope) {
                    let ctrl = this;
                    $scope.saveManager = (data) => {

                        let manager = {
                            manager: data.id,
                            level: data.level
                        }
                        currentEmployeeService.updateManager(manager).then(resp => resp)
                    }
                }],
                controllerAs: 'ctrl',
                data: {
                    manager: manager,
                    id: id,
                    level: parseInt(lev),
                    listManagers: list
                }
            });
        };
        serv.empToCandidateModal = (obj) => {
            ngDialog.open({
                template: 'static/templates/new.employee.to.candidate.confirm.modal.html',
                // appendClassName: 'attention_modal',
                controller: ['newIndividPollsService', '$scope', function (newIndividPollsService, $scope) {
                    let ctrl = this;
                    let data=obj
                    $scope.saveEmpToCand = (data) => {

                        newIndividPollsService.addNewCandidate(data).then(resp => {

                            console.log(resp.data)
                            // $route.reload()
                            $location.path('/candidate/ready/'+resp.data)
                        })
                    }
                }],
                controllerAs: 'ctrl',
                data:obj
            });
        };


        serv.transferEmployee = (data) => {
            data.dateTransfer = new Date()
            ngDialog.open({
                template: 'static/templates/curr.employee.transfer.modal.html',
                appendClassName: 'new-note-modal',
                controller: 'currEmployeeTransferCtrl',
                controllerAs: 'ctrl',
                data: data
            });
        }

    }])
;