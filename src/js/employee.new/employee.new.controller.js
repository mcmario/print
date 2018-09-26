app
    .controller('newUserController', ['$scope','$location', 'newUserService', '$route', 'toastsService', 'translitServiceMy', 'modalWindowsService', 'currEmployeeDocumentsModalService', 'ngDialog',
        function ($scope,$location, newUserService, $route, toastsService, translitServiceMy, modalWindowsService, currEmployeeDocumentsModalService, ngDialog) {

            let ctrl = this;
            ctrl.AccrualCode = []
            ctrl.getAccrualCode = () => {
                console.log(654654654654)
                return newUserService.getAccrualCode().then(resp => {
                    ctrl.AccrualCode = resp
                })
            }
            ctrl.address_residence = {
                zip_code: '',
                region: '',
                city: '',
                street: '',
                house: '',
                flat: ''
            };
            ctrl.address_registration = {
                zip_code: '',
                region: '',
                city: '',
                street: '',
                house: '',
                flat: ''
            };

            ctrl.spinner = true;
            ctrl.selectedDept = '';
            ctrl.photo = {}
            ctrl.photo.base64 = ''
            ctrl.userTempTitlesEdu = {};
            ctrl.templateUser = {
                address_residence: "",
                birthday: '',
                cityEn: "",
                cityUa: "",
                company: "",
                departmentUa: "",
                education: [],
                family: [],
                gender: "",
                givenName: "",
                'givenName-En': '',
                givenNameUa: "",
                ipPhone: "",
                ipn: "",
                dateIn: '',
                cEmail: '',
                phonebook: '',
                pasNumber: '',
                pasId: '',
                pasDate: '',
                pasIssued: '',
                middlename: "",
                middlenameRu: "",
                military: "",
                militaryRang: "",
                militaryType: "",
                militaryYears: "",
                pager: "",
                phone: "",
                registration: "",
                salary: "",
                AccrualCode: "",
                confirmation_level: "",
                schedule: "",
                sn: "",
                snEn: "",
                snUa: "",
                titleUa: '',
                married: '',
                workExp: []


            };
            ctrl.newUser = {
                address_residence: "",
                birthday: '',
                cityEn: "",
                cityUa: "",
                company: "",
                departmentUa: "",
                education: [],
                family: [],
                gender: "",
                givenName: "",
                'givenName-En': '',
                dateIn: '',
                givenNameUa: "",
                ipPhone: "",
                ipn: "",
                pasNumber: '',
                pasId: '',
                pasDate: '',
                pasIssued: '',
                married: '',
                middlename: "",
                middlenameRu: "",
                military: "",
                militaryRang: "",
                militaryType: "",
                militaryYears: "",
                pager: "",
                phone: "",
                registration: "",
                AccrualCode: "",
                confirmation_level: "",
                salary: "",
                schedule: "",
                sn: "",
                snEn: "",
                snUa: "",
                titleUa: '',
                workExp: []
            };
            ctrl.userTempTitles = [

                //ПІП
                {
                    name: 'Прізвище(укр)',
                    order: 1,
                    type: 'textC',
                    require: true,
                    value: 'snUa'
                },
                {
                    name: 'Ім\'я (укр)',
                    order: 1,
                    type: 'textC',
                    require: true,
                    value: 'givenNameUa'
                },
                {
                    name: 'По-батькові(укр)',
                    order: 1,
                    type: 'textC',
                    require: true,
                    value: 'middlename'
                },
                {
                    name: 'Прізвище (рус)',
                    order: 1,
                    type: 'textCr',
                    require: true,
                    value: 'sn'
                },
                {
                    name: 'Ім\'я (рус)',
                    order: 1,
                    type: 'textCr',
                    require: true,
                    value: 'givenName'
                },
                {
                    name: 'По-батькові(рус)',
                    order: 1,
                    type: 'textCr',
                    require: true,
                    value: 'middlenameRu'
                },
                {
                    name: 'Стать',
                    order: 1,
                    type: 'selectG',
                    require: true,
                    value: 'gender'
                },
                {
                    name: 'Дата народження',
                    order: 1,
                    type: 'date',
                    require: true,
                    value: 'birthday'
                },
                {
                    name: 'Сімейний стан',
                    order: 1,
                    type: 'selectFam',
                    require: true,
                    value: 'married'
                },

                //реєстраційні дані

                {
                    name: 'ІПН',
                    order: 2,
                    type: 'textN',
                    require: true,
                    value: 'ipn'
                },
                {
                    name: 'Паспорт серія',
                    order: 2,
                    type: 'textPas',
                    require: false,
                    value: 'pasNumber'
                },
                {
                    name: 'Паспорт номер/ID картка ',
                    order: 2,
                    type: 'textPasId',
                    require: true,
                    value: 'pasId'
                },
                {
                    name: 'Дата видачі',
                    order: 2,
                    type: 'date',
                    require: true,
                    value: 'pasDate'
                },
                {
                    name: 'Ким виданий',
                    order: 2,
                    type: 'text',
                    require: true,
                    value: 'pasIssued'
                },
                {
                    name: 'Контактний номер телефону',
                    order: 2,
                    type: 'textTel',
                    require: true,
                    value: 'phone'
                },
                {
                    name: 'Домашній номер телефону',
                    order: 2,
                    type: 'textTel',
                    require: false,
                    value: 'home_phone'
                },
                {
                    name: 'Скайп',
                    order: 2,
                    type: 'textL',
                    require: false,
                    value: 'pager'
                },
////////////////////////////////////////////////////////////////////////////////////
                {
                    name: 'Адреса прописки',
                    order: 3,
                    require: false,
                    type: 'title',

                },
                {
                    name: 'Індекс',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_residence_zip'
                }, {
                    name: 'Область',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_residence_region'
                }, {
                    name: 'Район',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_residence_district'
                }, {
                    name: 'Населений пункт',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_residence_city'
                }, {
                    name: 'Вулиця',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_residence_st'
                }, {
                    name: 'Будинок',
                    order: 3,
                    require: false,
                    type: 'textA',
                    value: 'address_residence_buil'
                }, {
                    name: 'Квартира',
                    order: 3,
                    require: false,
                    type: 'textA',
                    value: 'address_residence_flat'
                },
                {
                    name: 'Адреса проживання',
                    order: 3,
                    require: false,
                    type: 'title',
                },
                {
                    name: 'Індекс',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_zip'
                }, {
                    name: 'Область',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_region'
                }, {
                    name: 'Район',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_district'
                }, {
                    name: 'Населений пункт',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_city'
                }, {
                    name: 'Вулиця',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_st'
                }, {
                    name: 'Будинок',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_buil'
                }, {
                    name: 'Квартира',
                    order: 3,
                    require: false,
                    type: 'text',
                    value: 'address_registration_flat'
                },


                //company information
                {
                    name: 'Філіал',
                    order: 4,
                    type: 'branch',
                    require: true,
                    value: 'company'
                },
                {
                    name: 'Місто',
                    order: 4,
                    type: 'city',
                    require: true,
                    value: 'cityUa'
                },
                {
                    name: 'Відділ',
                    order: 4,
                    type: 'selectDept',
                    require: true,
                    value: 'departmentUa'
                },

                {
                    name: 'Посада ',
                    order: 4,
                    type: 'position',
                    require: true,
                    value: 'titleUa'
                },
                {
                    name: 'Лінійний керівник',
                    order: 4,
                    type: 'dropdownManager',
                    require: true,
                    value: 'manager'
                },
                {
                    name: 'Організаційний рівень',
                    order: 4,
                    type: 'selectLevel',
                    require: true,
                    value: 'confirmation_level'
                },


                {
                    name: 'Графік роботи',
                    order: 4,
                    type: 'selectSchedule',
                    require: true,
                    value: 'schedule',
                    obj: 'ctrl.schedule'
                },
                {
                    name: 'Дата прийому на роботу',
                    order: 4,
                    type: 'date',
                    require: true,
                    value: 'dateIn'
                },

                {
                    name: 'Тип нарахувань',
                    order: 4,
                    type: 'selectAcc',
                    require: true,
                    value: 'AccrualCode'
                }, {
                    name: 'Фактичний оклад',
                    order: 4,
                    type: 'textN',
                    require: true,
                    value: 'salary'
                },

                {
                    name: 'Додати до телефонної книги',
                    order: 4,
                    type: 'permission',
                    require: true,
                    value: 'phonebook'
                }, {
                    name: 'Створити корпоративний e-mail',
                    order: 4,
                    type: 'permission',
                    require: true,
                    value: 'wifi'
                },


                //education
                {
                    name: 'Освіта',
                    order: 5,
                    type: 'selectEduT',
                    require: false,

                    value: 'education_type'
                },
                {
                    name: 'Назва навчального закладу',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'institution_name'
                },
                {
                    name: 'Факультет',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'faculty'
                },
                {
                    name: 'Форма навчання',
                    order: 5,
                    type: 'eduSelectType',
                    require: false,
                    value: 'form_of_training'
                },
                {
                    name: 'Рік закінчення',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'date_of_graduation'
                },
                {
                    name: 'Спеціальність за дипломом',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'main_specialty'
                },
                {
                    name: 'Кваліфікація за дипломом',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'qualification'
                },
                {
                    name: 'Серія та номер диплому',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'diploma'
                },
                {
                    name: 'Досвід роботи за спеціальністю',
                    order: 5,
                    type: 'edu',
                    require: false,
                    value: 'years_of_experience',
                    type2: 'final'
                },


                //work experience
                {
                    name: 'Назва місця роботи',
                    order: 6,
                    type: 'wExp',
                    require: false,
                    value: 'workplace'
                },
                {
                    name: 'Роки роботи',
                    order: 6,
                    type: 'wExp',
                    require: false,
                    value: 'years'
                },
                {
                    name: 'Посада',
                    order: 6,
                    type: 'wExp',
                    require: false,
                    value: 'position'
                },
                {
                    name: 'Функціональні обов\'язки',
                    order: 6,
                    type: 'wExp',
                    require: false,
                    value: 'duties',
                },
                {
                    name: 'Зарплата',
                    order: 6,
                    type: 'wExp',
                    require: false,
                    value: 'salary'
                },
                {
                    name: 'Причина звільнення',
                    order: 6,
                    type: 'wExp',
                    require: false,
                    value: 'dismissal_reason',
                    type2: 'final'
                },
                //family

                {
                    name: 'Родинний звязок',
                    order: 7,
                    type: 'familySelect',
                    require: false,
                    value: 'type_'
                },
                {
                    name: 'Ім\'я',
                    order: 7,
                    type: 'family',
                    require: false,
                    value: 'name'
                },
                {
                    name: 'Прізвище',
                    order: 7,
                    type: 'family',
                    require: false,
                    value: 'surname'
                },
                {
                    name: 'Дата народження',
                    order: 7,
                    type: 'relDate',
                    require: false,
                    value: 'birthday'
                },
                {
                    name: 'Місце роботи/навчання',
                    order: 7,
                    type: 'family',
                    require: false,
                    value: 'workplace'
                },
                {
                    name: 'Посада',
                    order: 7,
                    type: 'family',
                    require: false,
                    value: 'position',
                    type2: 'final'
                },
                //military status
                {
                    name: 'Придатність до військової служби',
                    order: 8,
                    type: 'text',
                    require: false,
                    value: 'military'
                },
                {
                    name: 'Звання',
                    order: 8,
                    type: 'text',
                    require: false,
                    value: 'militaryRang'
                },
                {
                    name: 'Рід військ',
                    order: 8,
                    type: 'text',
                    require: false,
                    value: 'militaryType'
                },
                {
                    name: 'Роки служби',
                    order: 8,
                    type: 'text',
                    require: false,
                    value: 'militaryYears'
                },


            ];
            ctrl.file = {}
            ctrl.page = 1;
            ctrl.pages = 8;
            ctrl.perPage = 9;
            ctrl.getPositions = function (dept) {
                newUserService.getPositions(dept)
                    .then(
                        (d) => {
                            ctrl.positions = d;
                        }
                    );
            };
            ctrl.getEducation = function () {
                newUserService.getEduTypes().then(data => ctrl.eduType = data);

            };
            ctrl.getCompanyStructure = function () {
                newUserService.getBranches()
                    .then(
                        (d) => {
                            ctrl.branches = d;
                            newUserService.getCities()
                                .then(
                                    (d) => {
                                        ctrl.cities = d;
                                        newUserService.getDepartments()
                                            .then(
                                                (d) => {
                                                    ctrl.departments = d;
                                                    newUserService.getSchedule()
                                                        .then(
                                                            (d) => {
                                                                ctrl.schedule = d;
                                                                ctrl.spinner = false
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
                ctrl.newUser.departmentUa = ctrl.selectedDept;
                ctrl.getPositions(ctrl.selectedDept)
            };
            ctrl.thisFile = ''
            ctrl.getPhoto = (id) => {


            }
            ctrl.addPhoto = () => {

                modalWindowsService.uploadPhotoModalNew()
            }


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
                else if (file.size > 9000000) {

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

            }
            ctrl.checkIpn = (ipn) => {
                let l = ipn + ''
                if (l.length < 10) {
                    toastsService.customMessageEr('ІПН не коректний', "Перевірте дані")
                }
                else {
                    newUserService.checkIpn(ipn).then(resp => {
                        if (resp.data.fk_person) {
                            resp.data.ipn = ipn
                            modalWindowsService.newEmpAlert(resp.data)
                        } else {
                            ctrl.ChangePart(1)
                        }

                    })
                }
            }

            ctrl.translit = function (word) {
                if (word) {
                    return translitServiceMy.translit(word.replace(/['"]/g, ""))
                }
                else return ''
            };
            ctrl.setProgress = (part) => {
                ctrl.progres = part / ctrl.pages * 100 + '%'
                ctrl.spinner = false
            };
            ctrl.checkForSymbol = function (el) {
                // for (let key in el) {
                //     if (typeof el[key] !== 'object' && el[key] !== undefined && el[key] !== null) {
                //         let a = el[key].toString()
                //         if (a.indexOf('"') >= 0) {
                //             el[key] = a.replace(/["]/g, "'")
                //         }
                //     }
                // }
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
                ctrl.spinner = false

            };
            ctrl.setPageWithEmpty = function (numb) {
                ctrl.page = numb
                ctrl.setProgress(ctrl.page)
                ctrl.spinner = false

            };
            ctrl.progres = ctrl.page / ctrl.pages * 100 + '%';
            ctrl.emptyField = true;
            ctrl.workExp = [];
            ctrl.newEdu, ctrl.newWorkExp, ctrl.newRel = {};
            ctrl.getEmptyArrays = function () {
                ctrl.newEdu = {
                    education_type: '',
                    institution_name: '',
                    faculty: '',
                    form_of_training: '',
                    date_of_graduation: '',
                    main_specialty: '',
                    qualification: '',
                    diploma: '',
                    years_of_experience: ''
                };
                ctrl.newWorkExp = {
                    duties: '',
                    workplace: '',
                    years: '',
                    position: '',
                    salary: '',
                    dismissal_reason: '',
                };
                ctrl.newRel = {
                    // name: '',
                    type_: '',
                    name: '',
                    surname: '',
                    birthday: '',
                    workplace: '',
                    position: ''
                };
            };
            ctrl.getEmptyArrays();
            ctrl.getEducation();
            ctrl.addEducation = function () {
                ctrl.newUser.education.push(ctrl.newEdu);
                newUserService.addEdu(ctrl.newEdu.institution_name);
                ctrl.newEdu = {
                    education_type: '',
                    institution_name: '',
                    faculty: '',
                    form_of_training: '',
                    date_of_graduation: '',
                    main_specialty: '',
                    qualification: '',
                    diploma: '',
                    years_of_experience: ''

                };

            };
            ctrl.addWorkExp = function () {
                ctrl.newUser.workExp.push(ctrl.newWorkExp);
                newUserService.addEdu(ctrl.newWorkExp.workplace);
                ctrl.newWorkExp = {
                    duties: '',
                    workplace: '',
                    years: '',
                    position: '',
                    salary: '',
                    dismissal_reason: '',
                };
            };
            ctrl.addRel = function () {
                ctrl.newUser.family.push(ctrl.newRel);
                newUserService.addEdu(ctrl.newRel.type_);
                ctrl.newRel = {
                    // name: '',
                    type_: '',
                    name: '',
                    surname: '',
                    birthday: '',
                    workplace: '',
                    position: ''
                };
            }
            ctrl.checkForm = function () {
                for (let i in ctrl.userTempTitles) {
                    let key = ctrl.userTempTitles[i].value
                    if (!ctrl.newUser[key] && ctrl.userTempTitles[i].require === true) {
                        newUserService.emptyFieldError(ctrl.userTempTitles[i].name)
                        ctrl.emptyField = false;
                        ctrl.setPageWithEmpty(ctrl.userTempTitles[i].order)
                        ctrl.spinner = false
                        break
                    }
                    else {
                        ctrl.emptyField = true
                    }
                }
            };

            ctrl.checkEdu = function () {
                for (key in ctrl.newEdu) {
                    if (ctrl.newEdu[key] && ctrl.newEdu[key].length > 2) {
                        ctrl.newUser.education.push(ctrl.checkForSymbol(ctrl.newEdu))

                        break
                    }
                }
                for (key in ctrl.newWorkExp) {
                    if (ctrl.newWorkExp[key]) {
                        ctrl.newUser.workExp.push(ctrl.checkForSymbol(ctrl.newWorkExp));

                        break
                    }
                }
                for (key in ctrl.newRel) {
                    if (ctrl.newRel[key]) {
                        ctrl.newUser.family.push(ctrl.checkForSymbol(ctrl.newRel));

                        break
                    }
                }
                for (key in ctrl.newRecomendations) {
                    if (ctrl.newRecomendations[key]) {
                        ctrl.newUser.recomendations.push(ctrl.checkForSymbol(ctrl.newRecomendations));
                    }
                }
            };
            ctrl.checkPhone = function (str) {
                str ? str : str = ''
                if (str.match((/^(\+38)?[0-9]{10}$/g)) === null) {
                    newUserService.wrongFormat('Номер телефону')
                }

            };
            // ctrl.checkPass = function (str) {
            //     if (str.match((/^[а-яА-Я]{2}[0-9]{6}$/g)) === null) {
            //         newUserService.wrongFormat('Серія та номер паспорта')
            //     }
            //
            // };
            ctrl.checkImg = function (el) {
            };
            ctrl.createAddress = function () {
                ctrl.newUser.registration = '';
                ctrl.newUser.address_registration_zip ? ctrl.newUser.registration += ctrl.newUser.address_registration_zip + ', ' : null;
                ctrl.newUser.address_registration_region ? ctrl.newUser.registration += 'обл.' + ctrl.newUser.address_registration_region : null;
                ctrl.newUser.address_registration_district ? ctrl.newUser.registration += ', район ' + ctrl.newUser.address_registration_district : null;
                ctrl.newUser.address_registration_city ? ctrl.newUser.registration += ', ' + ctrl.newUser.address_registration_city : null;
                ctrl.newUser.address_registration_st ? ctrl.newUser.registration += ', вул.' + ctrl.newUser.address_registration_st : null;
                ctrl.newUser.address_registration_buil ? ctrl.newUser.registration += ', буд.' + ctrl.newUser.address_registration_buil : null;
                ctrl.newUser.address_registration_flat ? ctrl.newUser.registration += ', кв.' + ctrl.newUser.address_registration_flat : null;
                ctrl.newUser.address_residence = ''
                ctrl.newUser.address_residence_zip ? ctrl.newUser.address_residence += ctrl.newUser.address_residence_zip : null;
                ctrl.newUser.address_residence_region ? ctrl.newUser.address_residence += ', обл.' + ctrl.newUser.address_residence_region : null;
                ctrl.newUser.address_residence_district ? ctrl.newUser.address_residence += ', район ' + ctrl.newUser.address_residence_district : null;
                ctrl.newUser.address_residence_city ? ctrl.newUser.address_residence += ', ' + ctrl.newUser.address_residence_city : null;
                ctrl.newUser.address_residence_st ? ctrl.newUser.address_residence += ', вул.' + ctrl.newUser.address_residence_st : null;
                ctrl.newUser.address_residence_buil ? ctrl.newUser.address_residence += ', буд.' + ctrl.newUser.address_residence_buil : null;
                ctrl.newUser.address_residence_flat ? ctrl.newUser.address_residence += ', кв.' + ctrl.newUser.address_residence_flat : null;

            }
            //

            ctrl.listManagers = []
            ctrl.getListManagers = () => {

                newUserService.getListPeople().then(resp => {
                    ctrl.listManagers = resp
                })

            }


            ctrl.createNewWorker = (obj) => {

                let newObj = {
                    // file: ctrl.thisFile,
                    education: obj.education,
                    family: obj.family,
                    workExp: obj.workExp,
                    manager: parseInt(obj.manager),
                    military: {
                        military_suitability: obj.military,
                        rank: obj.militaryRang,
                        corps: obj.militaryType,
                        years: obj.militaryYears
                    },
                    // photo: obj.photo,
                    permissions: {

                        phonebook: obj.phonebook,
                        email: obj.wifi
                    },
                    salary: obj.salary,
                    person: {
                        name: obj.givenNameUa,
                        surname: obj.snUa,
                        middle_name: obj.middlename,
                        birthday: obj.birthday,
                        place_of_residence: obj.address_residence,
                        registration: obj.registration,
                        mobile_phone: obj.phone,
                        home_phone: obj.home_phone,
                        email: '',
                        skype: obj.pager,
                        ipn: obj.ipn,
                        marital_status: obj.married,
                        gender: obj.gender,
                        passport_id: obj.pasNumber + obj.pasId,
                        date_of_issue: obj.pasDate,
                        issued_by: obj.pasIssued,

                    },
                    worker: {
                        name_ua: obj.givenNameUa,
                        name_ru: obj.givenName,
                        name_en: obj['givenName-En'],
                        surname_ua: obj.snUa,
                        surname_ru: obj.sn,
                        surname_en: obj.snEn,
                        middle_name_ua: obj.middlename,
                        middle_name_ru: obj.middlenameRu,
                        skype: obj.pager,
                        ip_phone: '',
                        email: '',
                        sid: '',
                        confirmation_level: obj.confirmation_level,
                        // status :"active",
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
                        name: obj.givenNameUa,
                        AccrualCode: obj.AccrualCode,
                        surname: obj.snUa,
                        middlename: obj.middlename,
                        IPN: obj.ipn,
                        address_of_residence: obj.address_residence,
                        place_of_residence: obj.registration,
                        phone: obj.phone,
                        family: [],
                        education: [],
                        passport: [{
                            doc_series: obj.pasNumber,
                            doc_number: obj.pasId,
                            doc_date: obj.pasDate,
                            doc_issuedby: obj.pasIssued,
                        }],
                        startdate: obj.dateIn,


                    },
                    AD: {
                        sn: obj.sn,
                        givenName: obj.givenName,
                        l: obj.cityEn,
                        ipPhone: '',
                        mail: '',
                        mobile: obj.phone,
                        pager: obj.pager,
                        snUa: obj.snUa,
                        snEn: obj.snEn,
                        givenNameUa: obj.givenNameUa,
                        'givenName-En': obj['givenName-En'],
                        // work_schedule: obj.schedule,
                    }


                }
                return newObj
            }


            ctrl.pushPhoto = (id) => {
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

            ctrl.addNewEmployeeToCandidates = false

            ctrl.emplToCandidate = (obj) => {

                let newObj = {}
                newObj.other = {}
                newObj.photo = ''
                newObj.priority = {}
                newObj.family = obj.family;
                newObj.education = obj.education;
                newObj.workExp = obj.workExp;
                newObj.language = [
                    {language: 'Українська', knowledge_level: 'Погано'},
                    {language: 'Російська', knowledge_level: 'Погано'},
                    {language: 'Англійська', knowledge_level: 'Погано'},
                    {language: 'Польська', knowledge_level: 'Погано'}
                ];

                newObj.recomendations = []
                newObj.military = {
                    military_suitability: obj.military,
                    rank: obj.militaryRang,
                    corps: obj.militaryType,
                    years: obj.militaryYears,
                }
                newObj.person = {
                    name: obj.givenNameUa,
                    surname: obj.snUa,
                    middle_name: obj.middlename,
                    birthday: obj.birthday,
                    marital_status: obj.married,
                    place_of_residence: obj.address_residence,
                    registration: obj.registration,
                    ipn: obj.ipn,
                    mobile_phone: obj.phone,
                    home_phone: obj.home_phone,
                    email: obj.email,
                    skype: obj.pager,
                    gender: obj.gender,
                    passport_id: obj.pasNumber + obj.pasId,
                    date_of_issue: obj.pasDate,
                    issued_by: obj.pasIssued,
                    type_: 'ready',
                    department: obj.departmentUa,
                    city: obj.cityUa,
                    position: obj.titleUa,

                    fk_poll: 2

                }

                return newObj
            }
            ctrl.empToCandidateModal = modalWindowsService.empToCandidateModal

            ctrl.emergencySave = () => {
                // console.log(ctrl.emplToCandidate(ctrl.newUser))
                modalWindowsService.empToCandidateModal(ctrl.emplToCandidate(ctrl.newUser))
            }

            ctrl.submit = function () {
                ctrl.spinner = true
                ctrl.checkEdu()
                // ctrl.checkEmptyArr(ctrl.newUser)
                ctrl.createAddress()

                ctrl.newUser['givenName-En'] = ctrl.translit(ctrl.newUser.givenNameUa.replace(/['"]/g, ""));
                ctrl.newUser['snEn'] = ctrl.translit(ctrl.newUser.snUa.replace(/['"]/g, ""));
                ctrl.newUser['cityEn'] = ctrl.translit(ctrl.newUser.cityUa.replace(/['"]/g, ""));
                ctrl.checkForm();


                if (ctrl.emptyField !== false) {
                    ctrl.newUser.photo = ctrl.photo.base64;


                    // let workerToSave = ctrl.checkForSymbol(ctrl.newUser)

                    newUserService.addNewUser(ctrl.createNewWorker(ctrl.newUser)).then(response => {
                            ctrl.addNewEmployeeToCandidates = false
                            ctrl.newIndividualid = response.data

                            if (isFinite(response.data)) {


                                ctrl.pushPhoto(parseInt(response.data))
                                ctrl.spinner = false
                                toastsService.toastAddNewUserMsg();
                                ctrl.selectedDept = '';
                                ctrl.setPageWithEmpty(1)
                                ctrl.newUser = ctrl.templateUser
                                ctrl.getEmptyArrays()
                                $route.reload()

                            }
                            else {
                                toastsService.customMessageEr('Помилка, користувача не створено', response.data)
                                ctrl.spinner = false
                                ctrl.addNewEmployeeToCandidates = true
                                console.error(response.data)
                                ctrl.emergencySave()
                                // ctrl.setPageWithEmpty(1)
                            }

                        }, function () {
                            ctrl.spinner = false
                            ctrl.addNewEmployeeToCandidates = false

                            toastsService.customMessageEr('Ой лишенько,', 'Сталася невідома помилка')
                            ctrl.emergencySave()
                        }
                    );


                }
            }


        }
    ])
;