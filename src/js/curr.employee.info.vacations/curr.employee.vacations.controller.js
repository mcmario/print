app
    .controller('currEmployeeVacationsCtrl', ['$scope', '$rootScope', '$route', 'currentEmployeeService', 'callsService', 'toastsService', '$location', function ($scope, $rootScope, $route, currentEmployeeService, callsService, toastsService) {
        let ctrl = this;
        ctrl.spinner = true;
        ctrl.periodTest = new RegExp(/^2\d{3}$/g);
        ctrl.curYear = new Date().getFullYear();
        ctrl.stopSave = false;




        $scope.checkConflictDates = function (x) {

            if (!$scope.vacations.period.length) {
                ctrl.stopSave = false;
                return true
            }
            let obj = {};
            x ? obj = x : obj = ctrl.newVacation;

            let start = new Date(new Date(obj.start_date).toDateString()).getTime();
            let finish = new Date(new Date(obj.end_date).toDateString()).getTime();
            ctrl.stopSave = false;
            for (let i in $scope.vacations.period) {
                let period = $scope.vacations.period[i];
                let startEx = new Date(new Date(period.start_date).toDateString()).getTime();
                let finishEx = new Date(new Date(period.end_date).toDateString()).getTime();

                if (finish >= startEx && start <= finishEx) {
                    toastsService.alertVacDates();
                    ctrl.stopSave = true;
                    return false

                }


            }
            return true

        };

        $scope.setVacationDuration = function () {


            ctrl.newVacation.end_date = new Date(new Date(ctrl.newVacation.start_date).getTime() + 86400000 * (ctrl.newVacation.count - 1))

            $scope.checkConflictDates()

        };
        $scope.setVacationDurationModal = function (obj) {

            $scope.checkConflictDates(obj)

            return new Date(new Date(obj.start_date).getTime() + 86400000 * (obj.count - 1))

        };

        $scope.setVacationDuratioModal = function (x) {


            ctrl.newVacation.end_date = new Date(new Date(ctrl.newVacation.start_date).getTime() + 86400000 * (ctrl.newVacation.count - 1))

            $scope.checkConflictDates()
        };
        ctrl.photo = {
            base64: '',
            filename: ''
        };
        ctrl.periodAvailable = {};
        $scope.vacations = {};
        ctrl.vacationToEdit = {
            id: 0,
            start_date: new Date(),
            end_date: new Date()
        };
        ctrl.idToDelete = 0;
        ctrl.newPeriod = {};
        ctrl.fileSize = true;

        ctrl.checkFileSize = (id) => {
            let file = document.getElementById(id).files[0];

            if (file.name.search(/(\.jpg|\.jpeg|\.png|\.pdf)$/) < 0) {

                toastsService.alertFileFormat()
                ctrl.fileSize = false
                ctrl.photoLoaded = false
                ctrl.photo = {
                    base64: '',
                    filename: ''
                };
                ctrl.spinner = false
                return false
            }
            else if (file.size > 3000000) {

                toastsService.alertFileSize()
                ctrl.fileSize = false
                ctrl.photoLoaded = false
                ctrl.photo = {
                    base64: '',
                    filename: ''
                };
                ctrl.spinner = false
                return false
            }

            else {
                toastsService.alertFileSizeOk()
                ctrl.fileSize = true
                ctrl.spinner = false

                return true
            }

        };
        ctrl.setTemplPeriods = function () {

            ctrl.periodAvailable.periods = [];
            ctrl.periodAvailable.total = [];
            ctrl.periodAvailable.years = [];
            ctrl.periodAvailable.all = [];
            ctrl.periodAvailable.freePeriods = [];
            ctrl.periodAvailable.zeroPeriods = [];
            for (let i = 1; i <= 5; i++) {
                ctrl.periodAvailable.periods.push(ctrl.curYear - i)
            }

            for (let i in $scope.vacations.count) {
                ctrl.periodAvailable.all.push($scope.vacations.count[i].year);
                if ($scope.vacations.count[i].year !== ctrl.curYear && $scope.vacations.count[i].balance <= 0) {
                    ctrl.periodAvailable.zeroPeriods.push($scope.vacations.count[i].year)
                }
                if ($scope.vacations.count[i].balance > 0) {
                    ctrl.periodAvailable.total.push($scope.vacations.count[i]);
                    ctrl.periodAvailable.years.push($scope.vacations.count[i].year);
                }

            }
            for (let i = ctrl.curYear; i >= ctrl.curYear - 10; i--) {
                if (i != ctrl.curYear && ctrl.periodAvailable.all.indexOf(i) < 0) {

                    ctrl.periodAvailable.freePeriods.push(i)
                }
            }
            ctrl.newPeriod = {
                count: 24,
                year: ctrl.periodAvailable.freePeriods[0],
                used: 0,
                balance: ctrl.newPeriod.count - ctrl.newPeriod.used
            }
            ctrl.periodAvailable.daysCount = 0
            ctrl.periodAvailable.daysRest = 0
            for (let i in ctrl.periodAvailable.total) {
                ctrl.periodAvailable.daysRest += ctrl.periodAvailable.total[i].balance
                ctrl.periodAvailable.daysCount += ctrl.periodAvailable.total[i].count

            }
            if (ctrl.periodAvailable.total.length > 0) {
                ctrl.newVacation.year = ctrl.periodAvailable.total[0].year
            }
        };

        ctrl.logData = function (data) {

        };

        ctrl.refactorDates = function (date) {
            return new Date(date)

        };
        ctrl.restDays = 0;

        ctrl.getAvailableRestDays = function (n) {


            for (let i in $scope.vacations.count) {
                if (n === $scope.vacations.count[i].year) {
                    ctrl.restDays = $scope.vacations.count[i].balance;
                    delete ctrl.newVacation.rest
                    ctrl.newVacation.rest = []
                    ctrl.newVacation.rest[ctrl.restDays - 1] = '';
                }
            }

        };

        ctrl.addVacationBut = function (x) {
            ctrl.photo = {
                base64: '',
                filename: ''
            };

            ctrl.newVacation = {
                start_date: new Date(),
                end_date: new Date(),
                year: parseInt(ctrl.periodAvailable.years[0]),
                file: '',
                filename: '',
                count: 1,
                rest: []

            }

            ctrl.getAvailableRestDays(ctrl.newVacation.year)
            ctrl.newVacation.rest[ctrl.restDays - 1] = ''
            ctrl.editExisPeriod = false;
            if (ctrl.edition) {
                for (let i in $scope.vacations.year) {
                    ctrl.edition[i] = false;
                }
            }
            ctrl.newPeriod = {
                count: 24, year: ctrl.periodAvailable.freePeriods[0], used: 0, balance: 0
            }
            $scope.checkConflictDates(ctrl.newVacation)
        };

        ctrl.vacationsLength = function (finish, start) {


            let timeDiff = new Date(finish).getTime() - new Date(start).getTime();
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1);
            return diffDays

        };
        ctrl.getExp = function (date) {
            let difference = {
                years: 0,
                monthes: ''
            }
            let today = new Date
            let start = new Date(date)
            let d1Y = start.getFullYear();
            let d2Y = today.getFullYear();
            let d1M = start.getMonth();
            let d2M = today.getMonth();
            let dif = (d2M + 12 * d2Y) - (d1M + 12 * d1Y)
            if (dif >= 12) {
                difference.years = parseInt(dif / 12)
                difference.monthes = dif % 12
            }
            else {
                difference.monthes = dif
            }

            return ctrl.yearsMonthes(difference);
        }
        ctrl.yearsMonthes = function (obj) {
            if (obj.years === 0) {
                obj.years = 0
            }
            else if (obj.years === 1) {
                obj.years = obj.years + ' рік'
            }
            else if (obj.years > 1 && obj.years < 5) {
                obj.years = obj.years + ' роки'

            }
            else if (obj.years > 4 && obj.years < 21) {
                obj.years = obj.years + ' років'
            } else if (obj.years > 20 && obj.years % 10 === 1)
                obj.years = obj.years + ' рік'
            else if (obj.years > 21 && obj.years % 10 < 4) {
                obj.years = obj.years + ' роки'

            } else {
                obj.years = obj.years + ' років'
            }
            if (obj.monthes === 0) {
                obj.monthes = 0
            }
            else if (obj.monthes === 1) {
                obj.monthes = obj.monthes + ' місяць'
            }
            else if (obj.monthes > 1 && obj.monthes < 5) {
                obj.monthes = obj.monthes + ' місяці'

            }
            else if (obj.monthes > 4) {
                obj.monthes = obj.monthes + ' місяців'

            }

            return obj
        };
        ctrl.sortVacations = function (obj) {
            obj.sort(function (a, b) {
                if (a.year < b.year) {
                    return 1;
                }
                if (a.year > b.year) {
                    return -1;
                }
                // a должно быть равным b
                return 0;
            });
            return obj
        };
        ctrl.getVacations = function () {
            currentEmployeeService.getEmployeeVacations().then((response) => {
                let TempVacations = response
                TempVacations.pending = []
                TempVacations.confirmed = []
                TempVacations.rejected = []
                TempVacations.exp = ctrl.getExp(TempVacations.start_work)
                TempVacations.start_work = ctrl.refactorDates(TempVacations.start_work)
                for (let i in TempVacations.period) {
                    TempVacations.period[i].end_date = ctrl.refactorDates(TempVacations.period[i].end_date)
                    TempVacations.period[i].start_date = ctrl.refactorDates(TempVacations.period[i].start_date)
                    TempVacations.period[i].count = TempVacations.period[i].count

                    if (['sent', 'pre_approval', 'approved'].includes(TempVacations.period[i].status)) {
                        TempVacations.pending.push(TempVacations.period[i])
                    }
                    else if (TempVacations.period[i].status === 'rejected') {
                        TempVacations.rejected.push(TempVacations.period[i])
                    } else {
                        TempVacations.confirmed.push(TempVacations.period[i])

                    }

                }

                TempVacations.period = TempVacations.confirmed
                TempVacations.total = {
                    count: 0, used: 0, balance: 0
                };

                for (let i in TempVacations.count) {
                    TempVacations.total.count += parseInt(TempVacations.count[i].count)
                    TempVacations.total.used += parseInt(TempVacations.count[i].used)
                    TempVacations.total.balance += parseInt(TempVacations.count[i].balance)
                }
                ;
                // TempVacations.period.sort(function(a,b) {return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);} );
                TempVacations.count.sort(function (a, b) {
                    return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                });
                $scope.vacations = TempVacations;
                ctrl.setTemplPeriods();
                ctrl.vacationPhoto = [];

                ctrl.photo = {
                    base64: '',
                    filename: ''
                };
                ctrl.spinner = false

            })
        };
        ctrl.vacationToEdit = {};
        ctrl.editVacations = function (n, data) {
            ctrl.editionP = []
            ctrl.editionR = []
            ctrl.edition = []
            ctrl.vacationToEdit = data
            ctrl.vacationToEdit.id = data.id;
            ctrl.vacationToEdit.count = data.count;

            ctrl.edition[n] = true;
            ctrl.vacationToEdit.availableDays = ''
            ctrl.vacationToEdit.availableDays = ctrl.restForEdition(data.year, data.count)
        };
        ctrl.editPendingVacations = function (n, data) {
            ctrl.editionP = []
            ctrl.editionR = []
            ctrl.edition = []
            ctrl.vacationToEdit = data
            ctrl.vacationToEdit.id = data.id;
            ctrl.vacationToEdit.count = data.count;

            ctrl.editionP[n] = true;
            ctrl.vacationToEdit.availableDays = ''
            ctrl.vacationToEdit.availableDays = ctrl.restForEdition(data.year, data.count)
        };
        ctrl.editRejectVacations = function (n, data) {
            ctrl.editionP = []
            ctrl.editionR = []
            ctrl.edition = []
            ctrl.vacationToEdit = data
            ctrl.vacationToEdit.id = data.id;
            ctrl.vacationToEdit.count = data.count;

            ctrl.editionR[n] = true;
            ctrl.vacationToEdit.availableDays = ''
            ctrl.vacationToEdit.availableDays = ctrl.restForEdition(data.year, data.count)
        };
        ctrl.restForEditionPeriodChange = function (year) {
            for (let i in $scope.vacations.count) {
                if ($scope.vacations.count[i].year === year) {
                    ctrl.vacationToEdit.availableDays = $scope.vacations.count[i].balance
                }
            }
        };
        ctrl.restForEdition = function (year, days) {
            for (let i in $scope.vacations.count) {
                if ($scope.vacations.count[i].year === year) {
                    let rest = parseInt($scope.vacations.count[i].balance) + parseInt(days)
                    return rest
                }
            }
        };
        ctrl.editVacationDuration = function () {
            ctrl.vacationToEdit.end_date = new Date(new Date(ctrl.vacationToEdit.start_date).getTime() + 86400000 * (ctrl.vacationToEdit.count - 1))
        };
        ctrl.cancelEdition = function (data, n) {
            ctrl.getVacations()
            ctrl.editCount = false;

        };


        $scope.deleteVacation = function (id) {
            currentEmployeeService.deleteVacations(id)

        };
        $scope.deletePendingVacation = function (id, obj) {
            currentEmployeeService.deletePendingVacations(id, obj)
        };


        ctrl.addNewVacation = function (x) {
            if ($scope.checkConflictDates()) {
                ctrl.spinner = true
                ctrl.newVacation.count = parseInt(ctrl.newVacation.count)
                ctrl.newVacation.year = parseInt(ctrl.newVacation.year)
                ctrl.newVacation.file = ctrl.photo.base64;
                ctrl.newVacation.filename = ctrl.photo.filename;
                ctrl.newVacation.file.length > 5 ? ctrl.newVacation.downloaded = 1 : ctrl.newVacation.downloaded = 0
                delete ctrl.newVacation.rest;
                delete ctrl.newVacation.photo;
                delete ctrl.newVacation.photoName;
                currentEmployeeService.addNewVacation(ctrl.newVacation).then(response => {
                    ctrl.newVacation = {
                        start_date: new Date(),
                        end_date: new Date(),
                        count: 1,
                        year: parseInt(ctrl.periodAvailable.years[0]),
                        file: '',
                        filename: 0
                    };
                    x ? $route.reload() : null
                    ctrl.addNewVac = false;
                    ctrl.spinner = false

                    ctrl.getVacations()
                    ctrl.setTemplPeriods()

                })
            }
        };


        $scope.addNewVacationModal = function (obj, x) {
            ctrl.spinner = true

            obj.count = parseInt(obj.count)
            obj.year = parseInt(obj.year)
            obj.file = ctrl.photo.base64;
            obj.filename = ctrl.photo.filename;
            obj.file.length > 5 ? obj.downloaded = 1 : obj.downloaded = 0
            delete obj.rest;
            delete obj.photo;
            delete obj.photoName;

            currentEmployeeService.addNewVacation(obj).then(response => {
                ctrl.newVacation = {
                    start_date: new Date(),
                    end_date: new Date(),
                    count: 1,
                    year: parseInt(ctrl.periodAvailable.years[0]),
                    file: '',
                    filename: 0
                };
                x ? $route.reload() : null
                ctrl.addNewVac = false;
                ctrl.spinner = false

                ctrl.getVacations()
                ctrl.setTemplPeriods()

            })
        };


        ctrl.updateVacation = function (n, status) {
            !status ? status = 'conf' : null

            ctrl.spinner = true
            // ctrl.vacationToEdit.count = ctrl.vacationsLength(ctrl.vacationToEdit.end_date, ctrl.vacationToEdit.start_date)
            ctrl.vacationToEdit.file = ctrl.photo.base64;
            ctrl.vacationToEdit.file.length > 10 ? ctrl.vacationToEdit.downloaded = true : ctrl.vacationToEdit.downloaded = false
            ctrl.vacationToEdit.filename = ctrl.photo.filename;
            //
            delete ctrl.vacationToEdit.availableDays;
            // delete ctrl.vacationToEdit.availableDays;


            currentEmployeeService.updateVacation(ctrl.vacationToEdit, status).then(resp => {
                ctrl.edition[n] = false;
                ctrl.spinner = false

                ctrl.getVacations()
            })
        };

        ctrl.checkNewPeriod = function (data) {

            data.balance = data.count - data.used
            if (parseInt(data.count) > 0 || parseInt(data.used) > 0) {
                if (parseInt(data.count) < parseInt(data.used)) {
                    currentEmployeeService.alertPeriod('використано забагато днів')
                    return false
                }
                else if (parseInt(data.count) < 0 || parseInt(data.used) < 0) {
                    currentEmployeeService.alertPeriod('не допускаються від\'ємні числа')
                    return false
                }
                else return true
            }
            else if (!data.count || !data.used) {
                currentEmployeeService.alertPeriod('не внесено кількість днів')
                return false
            }
            else return true
        };
        ctrl.changeCount = function (n) {
            ctrl.spinner = true
            if (ctrl.checkNewPeriod(n)) {
                ctrl.editCount = false

                currentEmployeeService.updateVacationCount(n).then(resp => {
                    ctrl.editCount = false;
                    ctrl.newPeriod = {}

                    ctrl.getVacations()
                    ctrl.spinner = false

                })
            }
        };
        $scope.deletePeriod = (id) => {
            currentEmployeeService.deletePeriod(id)
        }

        $scope.confirmationPendingVacation = (data) => {
            data.data.status = 'confirmed'
            currentEmployeeService.confirmationPendingVacation(data.data).then(resp => {
                $route.reload()
            })
        }
        ctrl.editPeriod = function (data) {
            ctrl.editExisPeriod = true;
            ctrl.newPeriod = data
        }
        ctrl.saveEditedPeriod = function () {
            ctrl.newPeriod.balance = ctrl.newPeriod.count - ctrl.newPeriod.used;
            delete ctrl.newPeriod.worker;
            currentEmployeeService.saveEditedPeriod(ctrl.newPeriod).then(response => {
                ctrl.editCount = false;
                ctrl.getVacations()


            })
        };
        // ctrl.addPhotoToVacation = function (id) {
        //     let doc = {
        //         file: ctrl.photo.base64,
        //         filename: ctrl.filename,
        //         downloaded:1
        //     }
        //     if (!ctrl.checkFileSize(ctrl.photo)) {
        //         currentEmployeeService.alertFileSize()
        //     } else {
        //     currentEmployeeService.addPhotoToVac(id, doc).then(resp => {
        //         ctrl.getVacations()
        //     })
        // }
        // }
        ctrl.showDocument = (data) => {
            // $rootScope.vacationDocId = '/vacation/document/' + data.id
            // if (data.filename.indexOf('.pdf') >= 0) {
            //     $rootScope.vacationDocType = 'pdf'
            //
            // }
            // else $rootScope.vacationDocType = 'jpg'

            currentEmployeeService.showVacationDocumentModal(data)
        }
        ctrl.idToDelete = currentEmployeeService.idToDelete;
        ctrl.typeConfirm = currentEmployeeService.typeConfirm;


        ctrl.confirmModal = (id, data) => {
            currentEmployeeService.idToDelete = id;
            currentEmployeeService.typeConfirm = data;
            currentEmployeeService.confirmModal(id, data)
        }
        ctrl.confirmPendingVacation = (id, type, obj) => {
            let start = new Date(new Date(obj.start_date).toDateString()).getTime()
            let finish = new Date(new Date(obj.end_date).toDateString()).getTime()
            for (let i in $scope.vacations.period) {
                let period = $scope.vacations.period[i]
                let startEx = new Date(new Date(period.start_date).toDateString()).getTime()
                let finishEx = new Date(new Date(period.end_date).toDateString()).getTime()
                if (finish >= startEx && start <= finishEx) {
                    toastsService.customMessageEr('Підтвердження заявки неможливе', 'дати накладаються')
                    ctrl.stopSave = true
                    return false

                }
                else ctrl.stopSave = false


            }
            if (!ctrl.stopSave) {

                currentEmployeeService.idToDelete = id;
                currentEmployeeService.typeConfirm = type;
                currentEmployeeService.confirmModal(id, type, obj)
            }

        }

        // ctrl.printDoc = function (data) {
        //     let win = window.open();
        //     win.document.write('' +
        //         "<div style='width: 100%; display: flex; justify-content: center'><img src='" + data + "' style='max-width: 90%;'></div>");
        //     win.print();
        //     win.close()
        // };


        ctrl.Init = () => {
            let x = currentEmployeeService.getRouteParams()

            ctrl.getVacations()
        }
        // ctrl.addVacationBut()
        ctrl.newVacation = {
            start_date: new Date(),
            end_date: new Date(),
            year: '',
            photo: '',
            photoName: '',
            count: 1
        }
        ctrl.Init()

        ctrl.addVacationModal = function () {
            ctrl.addVacationBut()
            let obj = {
                new: ctrl.newVacation,
                period: ctrl.periodAvailable

            }
            currentEmployeeService.addVacationModal(obj)
        }


        ctrl.getListPeople = () => {
            currentEmployeeService.getListPeople().then(resp => {
                ctrl.listPeople = resp.data
            })
        }
        ctrl.changeWorker = (id) => {
            location.href = '#!/employees/active/' + id + '#6';
        }
    }])
;