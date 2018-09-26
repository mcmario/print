app
    .service('currentEmployeeService', ['RootFactory', 'toastsService', '$route', '$rootScope', '$http', '$location', '$sce', 'modalWindowsService', function (RootFactory, toastsService, $route, $rootScope, $http, $location, $sce, modalWindowsService) {
        let serv = this;
        serv.workerData = {}
        serv.lastRoute = $route.current;

        serv.getStatus = function () {
            if ($location.path().indexOf('candidate') >= 0) {
                return 'candidate'
            }
            else if ($location.path().indexOf('employee') >= 0) {
                return 'worker'
            }
        };
        serv.getReasons = function () {
            return $http.get('/api/dismiss/reasons').then(
                response => {
                    return response.data
                })
        }
        serv.getAccrualCode = () => {
            return $http.get('/api/accruals').then(resp => resp.data)
        }

        serv.getRouteParams = () => $route.current.params.identify;
        serv.checkForDat = function (data) {
            for (let i in data) {
                for (let j in data[i]) {
                    if (data[i][j] !== null && data[i][j].toString().indexOf('00:00') >= 0) {
                        data[i][j] = serv.changeDate(data[i][j])
                    }
                }
            }

            return data
        };
        serv.getEduTypes = function () {
            return $http.get('/api/edu/type')
                .then(
                    response => {

                        return response.data
                    },
                    response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                );

        };
        serv.getEduInstitutions = function () {
            return $http.get('/api/edu/institution').then(
                response => {
                    return response.data
                },
                response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
            );
        };


        serv.getEduSpecialty = function () {
            return $http.get('/api/edu/specialty').then(
                response => {
                    return response.data
                },
                response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
            );
        };


        serv.changeDate = function (date) {
            let newDate = new Date(date)
            return newDate.toISOString().slice(0, 10).replace(/-/g, "-");

        }
        serv.getData = function (url, obj) {
            return $http.get($sce.trustAsUrl(url), obj)
                .then(
                    response => {
                        return serv.checkForDat(response.data)
                    },
                    response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                );
        };


        serv.addNewDataInfo = function (data, type) {
            let testRequest = serv.getRouteParams();

            return $http.post('/api/' + testRequest + '/' + type + '/add', data).then(
                response => {
                    toastsService.toastEditSucMsg();

                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )

        }
        serv.saveData = function (data, url, form) {
            for (i in data) {
                if (data[i] === null || data[i] === 'None') {
                    data[i] = ''
                }
            }
            $http.post(url + data.id, data)
                .then(
                    response => {
                        toastsService.toastEditSucMsg();
                        form.$setPristine();
                        return response;
                    },
                    resp => {
                        toastsService.toastEditErrorMsg();
                        return resp;
                    }
                )

        }

        serv.saveEditedData = function (data, type,) {

            return $http.post('/api/' + data.id + '/' + type + '/update', data).then(
                response => {

                    toastsService.toastEditSucMsg();

                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }
        serv.saveEditedFamily = function (data, type, id) {

            return $http.post('/api/' + id + '/' + type + '/update', data).then(
                response => {

                    toastsService.toastEditSucMsg();

                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }


        serv.deleteData = function (data, type) {

            return $http.delete('/api/' + data.id + '/' + type + '/delete', data).then(
                response => {
                    toastsService.toastEditSucMsg();
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }
        serv.getEmployeeAnswers = function () {
            let testRequest = serv.getRouteParams();
            return serv.getData('/anketa/statistics/' + testRequest)
        }
        serv.getEmployeePriorityAnswers = function () {
            let testRequest = serv.getRouteParams();
            return serv.getData('/anketa/priority/' + testRequest)
        }
        serv.getEmployeeLanguages = function () {
            let testRequest = serv.getRouteParams();
            return serv.getData('/anketa/language/' + testRequest)
        }
        serv.getEmployeeMilitary = function () {
            let testRequest = serv.getRouteParams();
            return serv.getData('/anketa/military/' + testRequest)
        }
        serv.getEmployee = function () {
            let testRequest = serv.getRouteParams();

            if ($location.path().indexOf('candidate') >= 0) {

                return serv.getData('/api/candidate/info/' + testRequest);
            }
            else if ($location.path().indexOf('dismissed') >= 0) {
                let worker = serv.getData('/api/' + testRequest + '/general/info')

                worker.vacations = {}
                return worker
            }
            else {
                let worker = serv.getData('/api/' + testRequest + '/general/info')
                serv.workerData = worker
                worker.vacations = {}
                worker.vacations = serv.getData('/vacation/period/' + testRequest)
                return worker
            }
            ;
        };

        serv.getEmployeeDocuments = function () {
            let id = serv.getRouteParams();
            return $http.get('/documents/' + id).then(
                response => {
                    return response.data

                    // return response;
                    // },
                    // resp => {
                    //     toastsService.toastEditErrorMsg();
                    //     return resp;
                }
            )


            // return serv.getData('/documents/' + testRequest)


        }
        serv.changeDocStatus = function (id, status) {
            return $http.post('/api/documents/change/' + id + '/' + status)

        }
        serv.getEmployeeEducation = function () {
            let id = serv.getRouteParams();
            return $http.get('/api/' + id + '/education').then(
                response => {
                    return response.data

                    // return response;
                    // },
                    // resp => {
                    //     toastsService.toastEditErrorMsg();
                    //     return resp;
                }
            )
        }
        serv.getEmployeeWorkExp = function () {
            let id = serv.getRouteParams();
            return $http.get('/api/' + id + '/experience').then(
                response => {

                    return response.data


                }
            )
        }


        serv.getEmployeeFamily = function () {
            let testRequest = serv.getRouteParams();
            return serv.getData('/api/' + testRequest + '/family');

        };
        // serv.getEmployeeWorkExp = function () {
        //     let testRequest = serv.getRouteParams();
        //     return serv.getData('/api/' + testRequest + '/experience');
        //
        // };
        serv.getEmployeeVacations = function () {
            // let testRequest = ;
            !serv.getRouteParams() ? x = {} : x = serv.getData('/vacation/period/' + serv.getRouteParams())
            return x
        };

        serv.rejectVacation = function () {

        }


        serv.updateVacation = function (data, status) {
            let url = ''
            status !== 'conf' ? url = '/vacation/person/update/' : url = '/vacation/update/';

            return $http.post(url + data.id, data).then(
                response => {
                    toastsService.vacationsChange('Відпустку', 'успішно оновлено');
                    $route.reload()
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )

        }
        serv.addNewVacation = function (data) {
            let testRequest = serv.getRouteParams();

            return $http.post('/vacation/save/' + testRequest, data).then(
                response => {
                    toastsService.vacationsChange('Відпустку', 'успішно додано');
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )

        }
        serv.deleteVacations = function (id, status) {
            return $http.delete('/vacation/delete/' + id).then(
                response => {
                    toastsService.vacationsChange('Відпустку', 'успішно видалено');
                    $route.reload()
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }
        serv.deletePendingVacations = function (id,obj) {
            return $http.post('/vacation/reject/' + id,obj).then(
                response => {
                    toastsService.vacationsChange('Заявку на відпустку', 'успішно скасовано');
                    $route.reload()
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }


        serv.updateVacationCount = function (count) {
            let testRequest = serv.getRouteParams();
            return $http.post('/vacation/count/add/' + testRequest, count).then(
                response => {


                    toastsService.vacationsChange('Період', 'успішно додано');
                    // $route.reload()
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }
        serv.saveEditedPeriod = function (data) {
            return $http.post('/vacation/period/update/' + data.id, data).then(
                response => {
                    toastsService.vacationsChange('Період', 'успішно оновлено');
                    // $route.reload()
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }
        serv.deletePeriod = function (id) {

            return $http.delete('/vacation/period/delete/' + id).then(
                response => {
                    toastsService.vacationsChange('Період', 'Успішно видалено');
                    $route.reload()
                    return response;
                },
                resp => {
                    toastsService.toastEditErrorMsg();
                    return resp;
                }
            )
        }
        serv.changeStatus = function (type) {
            let testRequest = serv.getRouteParams();
            let status = "у відхилені"
            if (type === "reserve") {
                status = 'в резерв'
            } else if (type === "rejected") {
                status = 'у відхилені'
            }
            else if (type === 'ready') {
                status = 'в активні'

            }
            $http.post('/api/candidate/' + testRequest + '/' + type).then(response => {
                toastsService.toastChangeCandStatusSucMsg(status)
                $location.path('/candidate/' + type)

            })


        }


        serv.showPane = function () {
            if ($location.hash() === 'hire') {
                return 'hire'
            }
            else {

                return parseInt($location.hash() || 1);
            }
        };

        serv.isDissmissed = function () {
            return ($location.path()).search('dismissed') > 0;
        };
        serv.isWorker = function () {
            return ($location.path()).search('employees') > 0;
        };
        serv.isCandidate = function () {
            return ($location.path()).search('candidate') > 0;
        };

        serv.isConflict = function (values) {
            let item = values.value;

            let getEtalon = (val) => {
                for (let i of val) {
                    if (i !== null) {
                        return i;
                    }
                }
                return false;
            };

            let checkValues = (val, etalon) => {
                for (let i of val) {
                    if (i !== etalon && i !== null) {
                        return 'conflict';
                    }
                }
                return 'ok';
            };

            let etalonValue = getEtalon(item);
            return etalonValue ? checkValues(item, etalonValue) : 'ok';
        };

        serv.addPhotoToVac = function (id, file) {

            return true.then(response => {
                toastsService.toastEditSucMsg();

            })
        }

        serv.addVacationModal = function (obj) {
            modalWindowsService.vacationAddModal(obj);
        }
        serv.uploadFileModal = modalWindowsService.uploadFileModal;
        serv.uploadPhotoModal = modalWindowsService.uploadPhotoModal;
        serv.showDocumentModal = modalWindowsService.showDocumentModal;
        serv.showVacationDocumentModal = function (data) {

            modalWindowsService.showVacationDocumentModal(data);

        }
        serv.showModalQR = modalWindowsService.showModalQR;
        serv.printVacationDoc = function (id) {

        }
        serv.alertPeriod = function (n) {
            toastsService.alertPeriod(n)
        }
        serv.document = {}
        serv.showDocument = function (data) {
            serv.document = data
        }
        serv.showVacationRest = function (date, id) {
            // let testRequest = serv.getRouteParams();
            $http.post('/api/release/worker/' + id, date)
                .then(
                    response => {
                        serv.getReasons().then(resp => {
                            let obj = {
                                count: response.data,
                                reasons: resp,
                                day: new Date()
                            }
                            modalWindowsService.showVacationRestDism(obj)

                        })

                        // return serv.checkForDat(response.data)
                    },
                    response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                );

        }
        serv.idToDelete = 'zzz';
        serv.typeConfirm = 'xxx';
        serv.changeDismissDate = function (date) {
            let testRequest = serv.getRouteParams();
            return $http.post('/api/release/worker/' + testRequest, date)
                .then(
                    response => {
                        return response.data
                    },
                    response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                );

        }
        serv.getImg = (x) => {
            return $http.get(x).then(resp => resp)
        }

        serv.dismissWorker = function (data) {
            let testRequest = serv.getRouteParams();
            return $http.post('/api/dismissed/worker/' + testRequest, data).then(
                response => {
                    if (response.data == 'ok') {

                        toastsService.vacationsChange('Працівника', 'успішно звільнено');
                        return response;
                    } else {
                        toastsService.customMessageEr('Звільнення неможливе,', response.data)
                    }

                },
                response => {
                    toastsService.toastEditErrorMsg();
                    return response;
                }
            )
        }
        serv.getListPeople = function () {

            return $http.get(`/workers/active`)
                .then(resp => {
                    return resp
                });
        }
        // serv.alertFileSize = function () {
        //
        //     toastsService.alertFileSize()
        // }
        // serv.alertFileSizeOk = function(){
        //     toastsService.alertFileSizeOk()
        // }


        serv.savePermissions = (obj) => {
            obj.phonebook += ''
            obj.email += ''
            if (obj.change.email) {
                obj.email = ''
            }
            if (obj.change.phonebook) {
                obj.phonebook = ''
            }
            delete obj.change
            delete obj.ngDialogId;
            obj.position = serv.workerData.position.name
            obj.department = serv.workerData.department.name
            obj.sid = serv.workerData.sid;
            obj.name_en = serv.workerData.name_en;
            obj.surname_en = serv.workerData.surname_en;
            obj.id = serv.getRouteParams();
            return $http.post('/api/permission/change', obj).then((resp) => {
                toastsService.customMessageSuc("Дозволи", "успішно змінені")

            }, resp => {
                toastsService.customMessageEr("Сталася помилка", "дозволи не змінено")

            })
        }
        serv.editPermissions = () => {
            let obj = {}
            let testRequest = serv.getRouteParams();
            $http.get('/api/get_permissions/' + testRequest).then(
                response => {

                    modalWindowsService.editPermissions(response.data)
                })
        }

        // serv.getDuties=(str)=>{
        //     return str.split('&^&')
        //
        //
        //
        // }
        // serv.addDuties = (arr) => {
        // }
        serv.saveDuties = (arr, id) => {
            let el = arr.join('&^&')
            return $http.post('/api/worker/duties/' + id, el).then((resp) => {
                toastsService.customMessageSuc("Функціональні обов'язки", "успішно змінені")
                return resp
            }, resp => {
                toastsService.customMessageEr("Сталася помилка", "функціональні обов'язки не змінено")

            })

        }
        serv.getManagerData = (id) => {
            return $http.get('/api/get/manager/' + id).then(resp => {
                return resp.data
            })


        }
        serv.updateManager = (obj) => {
            let id = serv.getRouteParams();
            return $http.post('/api/manager/add/' + id, obj).then(resp => {


                resp.data
            })


        }

        serv.confirmationPendingVacation = (data) => {
            return $http.post('/vacation/confirm/' + data.id, data).then((resp) => {
                toastsService.customMessageSuc("Заявка на відпустку", "успішно підтверджена")
                return resp
            }, resp => {
                toastsService.customMessageEr("Сталася помилка", "заявка не підтверджена")

            })

        }
        serv.getDataForTransfer = (id) => {
            return $http.get('/api/get/personnel_transfer/' + id).then(resp => resp)
        }
        serv.transferEmployee=(data)=>{
            return $http.post('/api/personnel_transfer/'+data.fk_person,data).then(resp=>resp)
        }
        serv.confirmModal = modalWindowsService.vacationConfirmDeleteModal
        serv.addWorkExpModal = modalWindowsService.addWorkExpModal
        serv.addEduModal = modalWindowsService.addEduModal
        serv.addFamilyModal = modalWindowsService.addFamilyModal

    }])
;