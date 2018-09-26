app
    .controller('newIndividPollsController', ['newIndividPollsService', '$location', 'modalWindowsService', '$scope', 'toastsService', 'translitServiceMy', 'currEmployeeDocumentsModalService',
        function (newIndividPollsService, $location, modalWindowsService, $scope, toastsService, translitServiceMy, currEmployeeDocumentsModalService) {
            let ctrl = this
            ctrl.pollAnk = {}
            ctrl.newIndivid = {};
            ctrl.newIndividPoll = {};
            ctrl.newIndividTEmplate = {};
            ctrl.photo = {};
            ctrl.page = 1;
            ctrl.pages = 14;

            ctrl.perPage = 8;
            ctrl.eduType = ['середня', 'незакінчена середня', 'середня спеціальна', 'вища', 'неповна вища', 'післядипломна освіта'];
            ctrl.languages = [{language: 'Українська', knowledge_level: 'Погано'}, {
                language: 'Російська',
                knowledge_level: 'Погано'
            }, {language: 'Англійська', knowledge_level: 'Погано'}, {language: 'Польська', knowledge_level: 'Погано'}];
            ctrl.workExp = [];
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
            ctrl.newLang = {
                language: '',
                knowledge_level: ''
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
            ctrl.newRecomendations = {
                name: '',
                position: '',
                organization: '',
                phone_number: '',

            };
            ctrl.emptyField = true;

            ctrl.pollAnk = {};
            ctrl.PhotoLoaded = false
            ctrl.checkFileSize = (id) => {
                let file = document.getElementById(id).files[0];

                if (file.name.search(/(\.jpg|\.jpeg|\.png|\.pdf)$/) < 0) {

                    toastsService.alertFileFormat()
                    ctrl.fileSize = false
                    ctrl.PhotoLoaded = false
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
                    ctrl.PhotoLoaded = false
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
                    ctrl.PhotoLoaded = true
                    return true
                }

            }

            ctrl.getListQuestions = function (type) {
                newIndividPollsService.getNewIndividPoll(type)
                    .then((response) => {

                            ctrl.pollAnk = response;

                            // if(ctrl.pollAnk.id==2){
                            if (ctrl.pollAnk.id == 2) {

                                ctrl.pollAnk.question.splice(14, 0, {
                                    answers: [],
                                    block: 4,
                                    final: 0,
                                    required: 1,
                                    question: "Виберіть департамент",
                                    type_: "selectDep",
                                    value: "dep"
                                }, {
                                    answers: [],
                                    block: 4,
                                    final: 0,
                                    required: 1,
                                    question: "Виберіть місто",
                                    type_: "selectCity",
                                    value: "city"
                                })
                                ctrl.pollAnk.question[90].type_ = 'pasId'

                                ctrl.pollAnk.question.splice(11, 0, ctrl.pollAnk.question[90])
                                // ctrl.pollAnk.question.splice(91, 1)
                            }
                            else if (ctrl.pollAnk.id == 1) {
                                ctrl.pollAnk.question.splice(14, 0, {
                                        answers: [],
                                        block: 3,
                                        final: 0,
                                        required: 1,
                                        question: "Виберіть місто",
                                        type_: "selectCity",
                                        value: "city"
                                    }
                                );
                                ctrl.pollAnk.question[89].type_ = 'pasId'
                                ctrl.pollAnk.question.splice(11, 0, ctrl.pollAnk.question[89])
                                // ctrl.pollAnk.question.splice(90, 1)
                            }
                            ctrl.showCandidateTypes = true;
                            ctrl.newIndTemplate(response)


                        }
                    )
                ctrl.getCompany()
            };
            ctrl.cities = []
            ctrl.departments = []
            ctrl.getCompany = function () {
                newIndividPollsService.getCities().then(resp => {
                    ctrl.cities = resp
                    newIndividPollsService.getDepartments().then(response => {
                        ctrl.departments = response
                    })

                })

            }
            ctrl.cities = newIndividPollsService.getCities()
            ctrl.departments = newIndividPollsService.getDepartments();


            ctrl.newIndTemplate = function (data) {
                ctrl.newIndividPoll = data.question;
                ctrl.newIndivid = {};
                for (i in ctrl.newIndividPoll) {
                    ctrl.newIndivid[ctrl.newIndividPoll[i].value] = ""
                }
                ctrl.newIndivid.education = [];
                ctrl.newIndivid.family = [];
                ctrl.newIndivid.workExp = [];
                ctrl.newIndivid.language = ctrl.languages;
                ctrl.newIndivid.recomendations = [];
                // ctrl.resetArrays()
                ctrl.newIndivid.dep = '';
                if (ctrl.pollAnk.id == 1) {
                    ctrl.newIndivid.dep = 'Інформаційні технології'
                }

                ctrl.newIndivid.city = '';
            };

            ctrl.setPageWithEmpty = function (numb) {
                ctrl.page = numb;
                ctrl.setProgress(ctrl.page)

            };
            ctrl.setProgress = (part) => {
                ctrl.progres = part / ctrl.pages * 100 + '%'
            };

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
            ctrl.progres = ctrl.page / 14 * 100 + '%';
            ctrl.checkForSymbol = function (element) {
                // for (let i in element) {
                //     if (element[i] && typeof element[i] !== 'object') {
                //         // element[i] = element[i].replace(/"/g, "'");
                //     }
                //
                // }


                // for (let i in element) {
                //     if (typeof element[i] !== 'object') {
                //         element[i] = element[i].replace(/["]+/g, "'");
                //     }
                //
                // }

                // if (element.birthday) {
                //     element.birthday = new Date(element.birthday)
                //     // element.birthday.setHours(12)
                //     // element.birthday = element.birthday.toISOString()
                // }
                // if (element.pasDate) {
                //     element.pasDate = new Date(element.pasDate)
                //     // element.pasDate.setHours(12)
                //     // element.pasDate = element.pasDate.toISOString()
                // }

                return element
            }
            ctrl.addLanguage = function () {


                ctrl.newIndivid.language.push(ctrl.checkForSymbol(ctrl.newLang));

                ctrl.newLang = {
                    language: '',
                    knowledge_level: ''
                };

            };
            ctrl.addEducation = function () {

                ctrl.newIndivid.education.push(ctrl.checkForSymbol(ctrl.newEdu));
                ctrl.newEdu.main_specialty = ctrl.newEdu.specialty
                delete ctrl.newEdu.specialty
                newIndividPollsService.addEdu(ctrl.newEdu.eduName);
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

            ctrl.addRecomendations = function () {

                ctrl.newIndivid.recomendations.push(ctrl.checkForSymbol(ctrl.newRecomendations));
                newIndividPollsService.addEdu(ctrl.newRecomendations.recName);
                ctrl.newRecomendations = {
                    name: '',
                    position: '',
                    organization: '',
                    phone_number: '',

                }


            };
            ctrl.addWorkExp = function () {

                ctrl.newIndivid.workExp.push(ctrl.checkForSymbol(ctrl.newWorkExp));
                newIndividPollsService.addEdu(ctrl.newWorkExp.expName);
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

                ctrl.newRel.birthday = new Date(ctrl.newRel.birthday)
                // ctrl.newRel.relBda.setHours(12)
                ctrl.newIndivid.family.push(ctrl.newRel);
                newIndividPollsService.addEdu(ctrl.newRel.type_);
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


            ctrl.checkForm = function (obj) {
                ctrl.emptyField = false;

                for (let i in ctrl.pollAnk.question) {

                    let key = ctrl.pollAnk.question[i].value;
                    // if(!angular.isObject(obj[key]){


                    if (!obj[key] && ctrl.pollAnk.question[i].required === true) {
                        newIndividPollsService.emptyFieldError(ctrl.pollAnk.question[i].question);
                        ctrl.emptyField = false;
                        ctrl.setPageWithEmpty(ctrl.pollAnk.question[i].block)
                        break
                    }




                    //
                    // ctrl.emptyField = false;
                    // ctrl.setPageWithEmpty(ctrl.pollAnk.question[i].block)
                    // break
                    // }
                    else {
                        ctrl.emptyField = true;


                    }


                }
                // ctrl.checkPriority(ctrl.newIndivid)


            };

            ctrl.checkEdu = function () {
                for (key in ctrl.newEdu) {


                    if (ctrl.newEdu[key]) {
                        ctrl.newIndivid.education.push(ctrl.checkForSymbol(ctrl.newEdu))
                        break
                    }

                }
                for (key in ctrl.newWorkExp) {

                    if (ctrl.newWorkExp[key]) {
                        ctrl.newIndivid.workExp.push(ctrl.checkForSymbol(ctrl.newWorkExp));
                        break
                    }
                }
                for (key in ctrl.newRel) {

                    if (ctrl.newRel[key]) {
                        ctrl.newIndivid.family.push(ctrl.checkForSymbol(ctrl.newRel));

                        break
                    }
                }
                for (key in ctrl.newRecomendations) {
                    if (ctrl.newRecomendations[key]) {
                        ctrl.newIndivid.recomendations.push(ctrl.checkForSymbol(ctrl.newRecomendations));

                        break
                    }
                }


            };


            ctrl.translit = function (word) {


                return translitServiceMy.translit(word)
            };
            ctrl.candidateType = function () {
                ctrl.getListQuestions()
            };
            ctrl.checkPhone = function () {
                let str = ctrl.newIndivid.phone
                if (str.match(/^(\+38)?[0-9]{10}$/g) === null) {
                    toastsService.wrongFormat('Номер телефону')
                }

            }
            ctrl.createNewCandidate = (obj) => {
                let newObj = {}
                newObj.photo = ''
                newObj.other = {}
                newObj.priority = {}
                for (let key in obj) {
                    if (isFinite(key[0])) {
                        obj[key] ? newObj.other[key + ''] = obj[key] : newObj.other[key + ''] = ''

                    }
                    else if (key[0] === 'p' && key[1] === 'r' && isFinite(key[2])) {
                        obj[key] ? newObj.priority['priority' + key.slice(2)] = parseInt(obj[key]) : newObj.priority['priority' + key.slice(2)] = 0
                    }
                }


                newObj.family = obj.family;
                newObj.education = obj.education;
                newObj.workExp = obj.workExp;
                newObj.language = obj.language;
                newObj.recomendations = obj.recomendations
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
                    department: obj.dep,
                    city: obj.city,
                    position: obj.position,

                    fk_poll: ctrl.pollAnk.id

                }
                newObj.photo = ctrl.photo.base64 ? ctrl.photo.base64 : '';

                return newObj

            };

            ctrl.addNewCandidatePhoto = () => {
                modalWindowsService.uploadPhotoModalNew()
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

            ctrl.addNewCandidate = function () {

                ctrl.checkEdu();
                ctrl.newIndivid['givenName-En'] = ctrl.translit(ctrl.newIndivid.givenNameUa);
                ctrl.newIndivid['snEn'] = ctrl.translit(ctrl.newIndivid.snUa);

                ctrl.checkForm(ctrl.newIndivid);
                if (ctrl.emptyField === true) {
                    ctrl.pollAnk.photo = '';


                    //
                    newIndividPollsService.addNewCandidate(ctrl.createNewCandidate(ctrl.newIndivid)).then(resp => {

                        if (isFinite(resp.data)) {


                            ctrl.pushPhoto(parseInt(resp.data))
                            ctrl.spinner = false
                            toastsService.customMessageSuc("Нового кандидата створено", "і переміщено в активні ");
                            // ctrl.selectedDept = '';
                            // ctrl.setPageWithEmpty(1)
                            // ctrl.newUser = ctrl.templateUser
                            // ctrl.getEmptyArrays()
                            // $route.reload()
                        }
                        else {
                            toastsService.customMessageEr('Помилка, кандидата не створено', resp.data)
                            ctrl.spinner = false
                            console.error(resp.data)
                            // ctrl.setPageWithEmpty(1)
                        }

                    }, function () {
                        ctrl.spinner = false
                        toastsService.customMessageEr('Ой лишенько,', 'Сталася невідома помилка')


                    });
                    ctrl.setPageWithEmpty(1)
                    ctrl.getListQuestions(ctrl.pollAnk.id)
                    //

                }


                // ctrl.newIndivid.photo = ctrl.photo.base64;
                // if (!ctrl.newIndivid.photo) {
                //     ctrl.newIndivid.photo = ''
                // }


                // newIndividPollsService.addNewCandidate(ctrl.newIndivid);


                // ctrl.pollAnk.question = ctrl.checkForSymbol(ctrl.newIndivid);
                //
                // newIndividPollsService.addNewCandidate(ctrl.pollAnk)


            }
        }])
;