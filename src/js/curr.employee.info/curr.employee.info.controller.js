app
    .controller('currEmployeeInfoCtrl', ['$scope', '$rootScope', 'currentEmployeeService', 'controlMenuService', 'callsService', 'translitServiceMy', 'modalWindowsService', function ($scope, $rootScope, currentEmployeeService, controlMenuService, callsService, translitServiceMy, modalWindowsService) {
        let ctrl = this;
        $scope.spinner = true
        $scope.vacations = {}
        ctrl.dissmissed = currentEmployeeService.isDissmissed();
        $scope.departments = []
        $scope.citieslist = []

        ctrl.showDuties = (duties, id) => {
            modalWindowsService.showDuties(duties, id)
        }
        ctrl.showManager = (id, managerId, level) => {

            currentEmployeeService.getManagerData(id).then(manager => {
                currentEmployeeService.getListPeople().then(list => {
                    modalWindowsService.showManager(id, manager, level, list.data)

                })
            })
        }
        ctrl.transferEmployee = (id) => {
            currentEmployeeService.getDataForTransfer(id).then(resp => {
                resp.data.dateTransfer=new Date()
                modalWindowsService.transferEmployee(resp.data)

            })
        }
        ctrl.transWord = (word) => {

            return translitServiceMy.translit(word)


        }


        ctrl.getDepartments = function () {
            controlMenuService.getDepartments()
                .then(data => {

                    $scope.departments = data;
                });
        };
        ctrl.getCities = function () {
            controlMenuService.getCities()
                .then(data => {
                    $scope.citieslist = data;
                });
        };
        ctrl.changeStatus = function (type) {
            currentEmployeeService.changeStatus(type)
        }
        ctrl.getVacations = function () {
            currentEmployeeService.getEmployeeVacations().then((response) => {
                $scope.vacations = response

            })
        }
        ctrl.reasons = {}


        ctrl.changePane = function (x) {
            controlMenuService.changePane(x)
        }
        ctrl.init = (data) => {
            ctrl.getDepartments()
            ctrl.getCities()
            $scope.polls = data;
            ctrl.formInfo = $scope.formInfo;
            $scope.spinner = false

        };
        ctrl.init()

        ctrl.dateDismissed = new Date()


        ctrl.getVacDismissed = function (id) {


            // let date = new Date(ctrl.dateDismissed)
            currentEmployeeService.showVacationRest(new Date(ctrl.dateDismissed), id)
        };
        $scope.vacationRestsDissmissed = 0
        $scope.changeDismissDate = (newDate) => {
            let date = new Date(newDate)

            return currentEmployeeService.changeDismissDate(date).then(resp => {
                $scope.vacationRestsDissmissed = resp
                return resp
            })
        };

        ctrl.editPermissions = () => {
            //rout to get permissions

            currentEmployeeService.editPermissions();
        };
        $scope.dissmissWorker = function (day, reason, art, comments) {
            let workerDismissed = {
                c: {
                    dismissalarticle: art.code,
                    enddate: day,
                    dismissalreason: reason.code
                },
                worker: {
                    status: 'dismissed',
                    finished_to_work: day,
                    dismissal_reason: reason.name,
                    dismissal_article: art.name,
                    dismissal_comment: comments
                }
            };
            currentEmployeeService.dismissWorker(workerDismissed).then(resp => {
            })


        }


        ctrl.saveWorkerData = (obj) => {
            !obj.name_ua ? obj.name_ua = obj.name : null
            !obj.surname_ua ? obj.surname_ua = obj.surname : null
            !obj.middle_name_ua ? obj.middle_name_ua = obj.middle_name : null


            if (obj) {
                ctrl.syncWorker = {
                    id: obj.person.id,
                    person: {
                        name: obj.name_ua,
                        surname: obj.surname_ua,
                        middle_name: obj.middle_name_ua,
                        birthday: obj.person.birthday,
                        place_of_residence: obj.person.place_of_residence,
                        registration: obj.person.registration,
                        mobile_phone: obj.person.mobile_phone,
                        home_phone: obj.person.home_phone,
                        email: obj.email,
                        skype: obj.skype,
                        ipn: obj.person.ipn,
                        passport_id: obj.person.passport_id,
                        date_of_issue: obj.person.date_of_issue,
                        issued_by: obj.person.issued_by,
                        marital_status: obj.marital_status
                    },
                    worker: {
                        name_ua: obj.name_ua,
                        // name_ru: obj.name_ru,
                        name_en: obj.name_en,
                        surname_ua: obj.surname_ua,
                        // surname_ru: obj.surname_ru,
                        surname_en: obj.surname_en,
                        middle_name_ua: obj.middle_name_ua,
                        skype: obj.skype,
                        ip_phone: obj.ip_phone,
                        email: obj.email,
                    },
                    c: {
                        name: obj.name_ua,
                        surname: obj.surname_ua,
                        middlename: obj.middle_name_ua,
                        IPN: obj.person.ipn,
                        SID: obj.sid,
                        // id: obj.person.id,
                        address_of_residence: obj.person.place_of_residence,
                        place_of_residence: obj.person.registration,
                        phone: obj.person.mobile_phone,
                        family: [],
                        education: [],
                        passport: []


                    },
                    AD: {
                        // sn: obj.surname_ru,
                        // givenName: obj.name_ru,
                        ipPhone: obj.ip_phone,
                        mail: obj.email,
                        mobile: obj.person.mobile_phone,
                        pager: obj.skype,
                        snUa: obj.surname_ua,
                        snEN: obj.surname_en,
                        givenNameUa: obj.name_ua,
                        'givenName-En': obj.name_en
                    }
                }
                if (!obj.personStatus) {
                    ctrl.syncWorker.person.position = obj.position;
                    ctrl.syncWorker.person.city = obj.city;
                    ctrl.syncWorker.person.department = obj.department;

                }

                return ctrl.syncWorker
            }
        }
        ctrl.changeEmpty = (obj) => {
            for (let i in obj) {
                for (let subKey in obj[i]) {
                    if (!obj[i][subKey] || obj[i][subKey] === '' || obj[i][subKey] === 'None') {
                        i === 'AD' ? obj[i][subKey] = [] : obj[i][subKey] = ''
                    }
                }
            }
        }

        ctrl.submit = function (data) {

            ctrl.newData = ctrl.saveWorkerData(data)

            ctrl.changeEmpty(ctrl.newData)
            if (data.personStatus == 'worker') {
                ctrl.url = '/api/update/worker/'
            }
            else {

                delete ctrl.newData.worker;
                delete ctrl.newData.c;
                delete ctrl.newData.AD;

                ctrl.url = '/api/candidate/update/'
            }

            currentEmployeeService.saveData(ctrl.newData, ctrl.url, $scope.formInfo)
        };
        ctrl.getQr = function (mail) {
            $rootScope.QR = mail

            currentEmployeeService.showModalQR()

        }
        ctrl.call = callsService.call;
    }])
;