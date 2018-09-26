app
    .controller('candidateToEmpController', ['$scope', 'candidateToEmpService', 'currentEmployeeService', '$location', '$route', 'toastsService', 'translitServiceMy', 'modalWindowsService', 'currEmployeeDocumentsModalService',
        function ($scope, candidateToEmpService, currentEmployeeService, $location, $route, toastsService, translitServiceMy, modalWindowsService, currEmployeeDocumentsModalService) {

            let ctrl = this;
            let serv = candidateToEmpService;
            let servEmp = currentEmployeeService

            ctrl.selectedDept = '';
            ctrl.photo = {};
            ctrl.photo.base64 = '';
            ctrl.userTempTitlesEdu = {};
            ctrl.candidate = [];
            ctrl.newEmp = {};
            ctrl.newEmp = {};
            ctrl.dismissed = false;
            ctrl.getCandidateData = function () {
                servEmp.getEmployee().then(response => {
                        let obj = JSON.stringify(response);
                        ctrl.candidate = JSON.parse(obj);
                        ctrl.candidate[0].phonebook = 0
                        ctrl.candidate[0].wifi = 0
                        if (response[0].status) {
                            ctrl.dismissed = true
                            ctrl.fillNewDismissedEmp(response[0])
                        }
                        else {
                            ctrl.dismissed = false

                            ctrl.fillNewEmp(ctrl.candidate[0])
                        }
                        if (!isFinite(ctrl.candidate[0].passport_id[0])) {
                            ctrl.candidate[0].passport_n = ctrl.candidate[0].passport_id.slice(2);
                            ctrl.candidate[0].passport_id = ctrl.candidate[0].passport_id.slice(0, 2)
                        }
                        else {
                            ctrl.candidate[0].passport_n = ctrl.candidate[0].passport_id;
                            ctrl.candidate[0].passport_id = ''
                        }


                    }
                )
            }
            ctrl.getCandidateData()


            ctrl.getAccrualCode = () => {
                return servEmp.getAccrualCode().then(resp => {
                    ctrl.AccrualCode = resp
                })
            }
            ctrl.getAccrualCode()


            $scope.questions = [
                //ПІП
                {
                    name: 'Прізвище(укр)',
                    order: 1,
                    type: 'textC',
                    require: true,
                    value: 'surname',
                    // cand: 'sname'
                },
                {
                    name: 'Ім\'я (укр)',
                    order: 1,
                    type: 'textC',
                    require: true,
                    value: 'name',
                    // cand: 'name'

                },
                {
                    name: 'По-батькові(укр)',
                    order: 1,
                    type: 'textC',
                    require: true,
                    value: 'middle_name',
                    // cand: 'midlename'
                },
                {
                    name: 'Прізвище (рус)',
                    order: 1,
                    type: 'textCr',
                    require: true,
                    value: 'surname_ru',
                    // cand: ''
                },
                {
                    name: 'Ім\'я (рус)',
                    order: 1,
                    type: 'textCr',
                    require: true,
                    value: 'name_ru',
                    // cand: ''
                },
                {
                    name: 'По-батькові(рус)',
                    order: 1,
                    type: 'textCr',
                    require: true,
                    value: 'middle_name_ru',
                    // cand: ''
                },
                {
                    name: 'Стать',
                    order: 1,
                    type: 'selectG',
                    require: true,
                    value: 'gender',
                    // cand: 'gender'
                },
                {
                    name: 'Дата народження',
                    order: 1,
                    type: 'date',
                    require: true,
                    value: 'birthday',
                    // cand: 'date'
                }, {
                    name: 'Сімейний стан',
                    order: 1,
                    type: 'selectM',
                    require: true,
                    value: 'marital_status',
                    // cand: 'date'
                },
                //реєстраційні дані
                {
                    name: 'ІПН',
                    order: 2,
                    type: 'textN',
                    require: true,
                    value: 'ipn',
                    // cand: 'ipn'
                },
                {
                    name: 'Паспорт (серія)',
                    order: 2,
                    type: 'textPas',
                    require: false,
                    value: 'passport_id',
                    // cand: 'series'
                }, {
                    name: 'Номер паспорта(ID картки)',
                    order: 2,
                    type: 'textPas',
                    require: true,
                    value: 'passport_n',
                    // cand: 'series'
                },
                {
                    name: 'Дата видачі',
                    order: 2,
                    type: 'date',
                    require: true,
                    value: 'date_of_issue',
                    // cand: 'doc_date'
                },
                {
                    name: 'Ким виданий',
                    order: 2,
                    type: 'text',
                    require: true,
                    value: 'issued_by',
                    // cand: 'issuedby'
                },
                {
                    name: 'Адреса проживання',
                    order: 2,
                    require: false,
                    type: 'textarea',
                    value: 'place_of_residence',
                    // cand: 'address_residence'
                },
                {
                    name: 'Адреса прописки',
                    order: 2,
                    type: 'textarea',
                    require: false,
                    value: 'registration',
                    // cand: 'registration'
                },
                {
                    name: 'Мобільний номер телефону',
                    order: 2,
                    type: 'text',
                    require: true,
                    value: 'mobile_phone',
                    // cand: 'phone'
                },
                {
                    name: 'Домашній номер телефону',
                    order: 2,
                    type: 'text',
                    require: false,
                    value: 'home_phone',
                    // cand: 'phone'
                },
                {
                    name: 'Скайп',
                    order: 2,
                    type: 'text',
                    require: false,
                    value: 'skype',
                    // cand: 'skype'
                },

                //company information
                {
                    name: 'Філіал',
                    order: 3,
                    type: 'branch',
                    require: true,
                    value: 'company',
                    // cand: ''
                },
                {
                    name: 'Місто',
                    order: 3,
                    type: 'city',
                    require: true,
                    value: 'cityUa',
                    // cand: ''
                },
                {
                    name: 'Відділ',
                    order: 3,
                    type: 'selectDept',
                    require: true,
                    value: 'departmentUa',
                    // cand: ''
                },

                {
                    name: 'Посада ',
                    order: 3,
                    type: 'position',
                    require: true,
                    value: 'titleUa',
                    // cand: ''
                },
                {
                    name: 'Лінійний керівник',
                    order: 3,
                    type: 'dropdownManager',
                    require: true,
                    value: 'manager'
                },
                {
                    name: 'Організаційний рівень',
                    order: 3,
                    type: 'selectLevel',
                    require: true,
                    value: 'confirmation_level'
                },
                {
                    name: 'Графік роботи',
                    order: 3,
                    type: 'selectSchedule',
                    require: true,
                    value: 'schedule',
                    obj: 'ctrl.schedule',
                    // cand: ''
                },
                {
                    name: 'Дата прийому на роботу',
                    order: 3,
                    type: 'date',
                    require: true,
                    value: 'dateIn',
                    // cand: ''
                },
                {
                    name: 'Тип нарахувань',
                    order: 3,
                    type: 'selectAcc',
                    require: true,
                    value: 'AccrualCode'
                },
                {
                    name: 'Фактичний оклад',
                    order: 3,
                    type: 'text',
                    require: true,
                    value: 'salary',
                    // cand: ''
                },
                {
                    name: 'Додати до телефонної книги',
                    order: 3,
                    type: 'permission',
                    require: true,
                    value: 'phonebook'
                }, {
                    name: 'Створити корпоративний e-mail',
                    order: 3,
                    type: 'permission',
                    require: true,
                    value: 'wifi'
                },


            ];

            ctrl.fillNewDismissedEmp = function (obj) {
                ctrl.newEmp = obj
                for (let key in obj.person) {
                    ctrl.newEmp[key] = obj.person[key]
                }

                ctrl.newEmp.birthday = new Date(obj.birthday);
                ctrl.newEmp.name = obj.name_ua;
                ctrl.newEmp.surname = obj.surname_ua;
                ctrl.newEmp.middle_name = obj.middle_name_ua;
                obj.person.gender === 'Мужской' ? ctrl.newEmp.gender = 'Чоловіча' : obj.person.gender.length > 2 ? ctrl.newEmp.gender = 'Жіноча' : ctrl.newEmp.gender = ''
                ctrl.newEmp.ipn = parseInt(obj.ipn);
                ctrl.newEmp.date_of_issue = new Date(obj.date_of_issue);

                for (i in $scope.questions) {
                    if (!ctrl.newEmp[$scope.questions[i].value] || ctrl.newEmp[$scope.questions[i].value] === 'None') {
                        ctrl.newEmp[$scope.questions[i].value] = ''
                    }

                }

                //
                // ctrl.newEmp.surname_ru='';
                // ctrl.newEmp.name_ru='';
                // ctrl.newEmp.middle_name_ru='';
                //
            }
            ctrl.fillNewEmp = function (obj) {
                ctrl.newEmp = obj
                ctrl.newEmp.birthday = new Date(obj.birthday)

                ctrl.newEmp.ipn = parseInt(obj.ipn);
                ctrl.newEmp.date_of_issue = new Date(obj.date_of_issue)
                for (i in $scope.questions) {
                    if (!ctrl.newEmp[$scope.questions[i].value]) {
                        ctrl.newEmp[$scope.questions[i].value] = ''
                    }
                }

                //
                // ctrl.newEmp.surname_ru='';
                // ctrl.newEmp.name_ru='';
                // ctrl.newEmp.middle_name_ru='';
                //
            }


            ctrl.page = 1;
            ctrl.pages = 3;
            ctrl.perPage = 8;

            ctrl.showTime = (time) => {

            }
            ctrl.getPositions = function (dept) {
                serv.getPositions(dept)
                    .then(
                        (d) => {
                            ctrl.positions = d;
                        }
                    );
            };

            ctrl.getCompanyStructure = function () {
                serv.getBranches()
                    .then(
                        (d) => {
                            ctrl.branches = d;
                            serv.getCities()
                                .then(
                                    (d) => {
                                        ctrl.cities = d;
                                        serv.getDepartments()
                                            .then(
                                                (d) => {
                                                    ctrl.departments = d;
                                                    serv.getSchedule()
                                                        .then(
                                                            (d) => {
                                                                ctrl.schedule = d;

                                                            }
                                                        )
                                                }
                                            )
                                    }
                                )

                        }
                    )
            };
            ctrl.getCompanyStructure();

            ctrl.selectDept = function () {
                ctrl.newEmp.departmentUa = ctrl.selectedDept;
                ctrl.getPositions(ctrl.selectedDept)
            };
            ctrl.translit = function (word) {
                return translitServiceMy.translit(word.replace(/['"]/g, ""))

            };
            ctrl.setProgress = (part) => {
                ctrl.progres = part / ctrl.pages * 100 + '%'
            };
            ctrl.checkForSymbol = function (el) {

                return el


            }
            ctrl.ChangePart = function (a) {
                ctrl.page += a;
                if (ctrl.page < 1) {
                    ctrl.page = 1;
                }
                else if (ctrl.page > ctrl.pages) {
                    ctrl.page = ctrl.pages;
                }

                ctrl.setProgress(ctrl.page)

            };
            ctrl.setPageWithEmpty = function (numb) {
                ctrl.page = numb
                ctrl.setProgress(ctrl.page)

            };

            ctrl.progres = ctrl.page / ctrl.pages * 100 + '%';
            ctrl.emptyField = false;

            ctrl.checkForm = function (obj) {

                for (let i in $scope.questions) {

                    if ($scope.questions[i].require === true && !obj[$scope.questions[i].value] && !angular.isObject(obj[$scope.questions[i].value])) {
                        toastsService.emptyFieldError($scope.questions[i].name);
                        ctrl.emptyField = false;
                        ctrl.setPageWithEmpty($scope.questions[i].order);
                        ctrl.emptyField = true;
                        break
                    }
                    else ctrl.emptyField = false
                }
            };

            ctrl.getListManagers = () => {


                candidateToEmpService.getListPeople().then(resp => {
                    ctrl.listManagers = resp
                })

            }
            ctrl.createNewWorker = (obj) => {
                let newObj = {
                    photo: obj.photo,
                    salary: obj.salary,
                    manager: parseInt(obj.manager),

                    permissions: {
                        phonebook: obj.phonebook === 'a' ? '1' : '0',
                        email: obj.wifi === 'a' ? '1' : '0'
                    },
                    person: {
                        name: obj.name,
                        surname: obj.surname,
                        middle_name: obj.middle_name,
                        birthday: obj.birthday,
                        place_of_residence: obj.place_of_residence,
                        registration: obj.registration,
                        mobile_phone: obj.mobile_phone,
                        home_phone: obj.home_phone,
                        email: '',
                        skype: obj.skype,
                        ipn: obj.ipn,
                        marital_status: obj.marital_status,
                        gender: obj.gender,
                        passport_id: obj.passport_id + obj.passport_n,
                        date_of_issue: obj.date_of_issue,
                        issued_by: obj.issued_by,


                    },
                    worker: {
                        name_ua: obj.name,
                        name_ru: obj.name_ru,
                        name_en: ctrl.translit(obj.name.replace(/['"]/g, "")),
                        surname_ua: obj.surname,
                        surname_ru: obj.surname_ru,
                        surname_en: ctrl.translit(obj.surname.replace(/['"]/g, "")),
                        middle_name_ua: obj.middle_name,
                        middle_name_ru: obj.middle_name_ru,
                        skype: obj.skype,
                        ip_phone: '',
                        email: '',
                        // sid: '',
                        confirmation_level: obj.confirmation_level,
                        status: "active",
                        work_schedule: obj.schedule,
                        started_to_work: obj.dateIn,
                        finished_to_work: '0001-01-01',
                        dismissal_comment: ''
                    },
                    department: obj.departmentUa,
                    city: obj.cityUa,
                    branch: obj.company,
                    position: obj.titleUa,
                    c: {
                        name: obj.name,
                        surname: obj.surname,
                        birthday: obj.birthday,
                        schedule: obj.schedule,
                        middlename: obj.middle_name,
                        IPN: obj.ipn,
                        address_of_residence: obj.place_of_residence,
                        place_of_residence: obj.registration,
                        phone: obj.mobile_phone,
                        family: [],
                        education: [],
                        AccrualCode: obj.AccrualCode,
                        passport: [{
                            doc_series: obj.passport_id,
                            doc_number: obj.passport_n,
                            doc_date: obj.date_of_issue,
                            doc_issuedby: obj.issued_by,
                        }],
                        startdate: obj.dateIn,


                    },
                    AD: {
                        sn: obj.surname_ru,
                        givenName: obj.name_ru,
                        l: ctrl.translit(obj.cityUa.replace(/['"]/g, "")),
                        ipPhone: '',
                        mail: '',
                        mobile: obj.mobile_phone,
                        pager: obj.skype,
                        snUa: obj.surname,
                        snEn: ctrl.translit(obj.surname.replace(/['"]/g, "")),
                        givenNameUa: obj.name,
                        'givenName-En': ctrl.translit(obj.name.replace(/['"]/g, "")),
                        // work_schedule: obj.schedule,
                    }


                }
                return newObj
            }
            ctrl.addNewPhotoCandToEmp = () => {
                modalWindowsService.uploadPhotoModalNew()

            }
            ctrl.pushPhoto = (id) => {
                !id ? id = $route.current.params.identify : null

                let canvas = document.getElementById('canvasNewL')
                if (canvas) {


                    let obj = {
                        name: 'фотографія',
                        type: 'photo',
                        base: canvas.toDataURL('image/jpeg', 0.5).replace('data:image/jpeg;base64,', ''),
                        mimetype: 'image/jpeg'
                    }
                    currEmployeeDocumentsModalService.saveEditedPhoto(obj, id).then(
                        resp => {
                            // toastsService.customMessageSuc('фото профілю','успішно змінено')
                            // ;$route.reload()
                        },
                        resp => {
                            toastsService.customMessageEr('Ой лишенько', "сталася невідома помилка")
                        })
                }


            }


            ctrl.hireCandidate = function (obj) {
                ctrl.checkForm(ctrl.newEmp);
                ctrl.newEmp.photo = ctrl.photo.base64;

                if (!ctrl.emptyField) {
                    if (ctrl.dismissed === true) {

                        candidateToEmpService.dismissedToEmployee(ctrl.createNewWorker(ctrl.newEmp)).then(resp => {

                                // ctrl.setPageWithEmpty(1)

                                if (resp.status !== 200) {
                                    toastsService.customMessageEr('Ой лишенько', "Сталася невідома помилка")
                                }
                                else if (resp.data === 'ok') {
                                    ctrl.newEmp = {};
                                    ctrl.pushPhoto()

                                    toastsService.customMessageSuc('Працівник ' + ctrl.newEmp.surname, 'успішно прийнятий на роботу')
                                    $location.path('/employees/dismissed')

                                } else if (resp.status === 200 && resp.data !== 'ok') {
                                    toastsService.customMessageEr('Помилка', resp.data)
                                }


                            }, response => {
                                console.error(response)
                            }
                        );
                    }
                    else {


                        candidateToEmpService.candidateToEmployee(ctrl.createNewWorker(ctrl.newEmp))
                            .then(resp => {

                                    ctrl.newIndividualid = resp.data
                                    ctrl.pushPhoto(resp.data)
                                    // let x = document.getElementById("documentsForm2");
                                    // if (document.getElementById("fileName2").value) {
                                    //     document.getElementById("formIdInput").value = resp.data;
                                    //     x.submit()
                                    //
                                    // }

                                    ctrl.setPageWithEmpty(1)
                                    ctrl.newEmp = {};
                                    // $location.path('/candidate/ready')
                                }
                            );

                    }
                }

            }
        }
    ])
;