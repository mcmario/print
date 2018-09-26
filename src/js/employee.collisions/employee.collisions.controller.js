app
    .controller('currEmployeeCollisions', ['$scope', 'employeesCollisionService', '$location', 'toastsService', 'ngDialog',
        function ($scope, employeesCollisionService, $location, toastsService, ngDialog) {
            let ctrl = this;
            $scope.spinner = true
            ctrl.myDepartment = '';
            ctrl.myPerson = ''
            ctrl.dataEdited = false
            ctrl.syncSave = {}
ctrl.sid = ''
            ctrl.ID=''
            ctrl.init = (data) => {
                $scope.data = ctrl.createCollisionObj(data);
                ctrl.sid = data[1][0].sid
                ctrl.ID=data[1][0].person.id
                $scope.spinner = false
            };
            ctrl.createCollisionObj = (arr) => {
                let sync = [
                    {
                        title: 'Прізвище',
                        c: arr[0][0]['surname'],
                        sql: arr[1][0]['surname_ua'],
                        ad: arr[2][0]['snUa'],
                        model: 'surname_ua',
                        collision: false
                    },
                    {
                        title: 'Ім\'я',
                        c: arr[0][0]['name'],
                        sql: arr[1][0]['name_ua'],
                        ad: arr[2][0]['givenNameUa'],
                        model: 'name_ua',
                        collision: false
                    },
                    {
                        title: 'По батькові ',
                        c: arr[0][0]['middlename'],
                        sql: arr[1][0]['middle_name_ua'],
                        ad: arr[2][0][''],
                        model: 'middle_name_ua',
                        collision: false
                    },
                    {
                        title: 'Прізвище російською',
                        c: arr[0][0][''],
                        sql: arr[1][0]['surname_ru'],
                        ad: arr[2][0]['sn'],
                        model: 'surname_ru',
                        collision: false
                    },
                    {
                        title: 'Ім\'я російською',
                        c: arr[0][0][''],
                        sql: arr[1][0]['name_ru'],
                        ad: arr[2][0]['givenName'],
                        model: 'name_ru',
                        collision: false
                    },

                    {
                        title: 'Прізвище англійською',
                        c: arr[0][0][''],
                        sql: arr[1][0]['surname_en'],
                        ad: arr[2][0]['snEn'],
                        model: 'surname_en',
                        collision: false
                    },
                    {
                        title: 'Ім\'я англійською',
                        c: arr[0][0][''],
                        sql: arr[1][0]['name_en'],
                        ad: arr[2][0]['givenName-En'],
                        model: 'name_en',
                        collision: false
                    },
                    {
                        title: 'ІПН',
                        c: arr[0][0]['IPN'],
                        sql: arr[1][0].person.ipn,
                        ad: arr[2][0][''],
                        model: 'ipn',
                        collision: false
                    },
                    {
                        title: 'День народження',
                        type: 'date',
                        c: new Date(arr[0][0]['birthday']),
                        sql: new Date(arr[1][0].person.birthday),
                        ad: arr[2][0][''],
                        model: 'birthday',
                        collision: false
                    },
                    {
                        title: 'Адреса проживання',
                        c: arr[0][0]['address_of_residence'],
                        sql: arr[1][0].person.place_of_residence,
                        ad: arr[2][0][''],
                        type: 'text',
                        model: 'place_of_residence',
                        collision: false
                    },
                    {
                        title: 'Адреса прописки',
                        c: arr[0][0]['place_of_residence'],
                        sql: arr[1][0].person.registration,
                        ad: arr[2][0][''],
                        type: 'text',
                        model: 'registration',
                        collision: false
                    },
                    {
                        title: 'Мобільний телефон',
                        c: arr[0][0]['phone'],
                        sql: arr[1][0].person.mobile_phone,
                        ad: arr[2][0]['mobile'],
                        model: 'mobile_phone',
                        collision: false
                    },
                    {
                        title: 'Домашній телефон',
                        c: arr[0][0][''],
                        sql: arr[1][0].person.home_phone,
                        ad: arr[2][0][''],
                        model: 'home_phone',
                        collision: false
                    },
                    {
                        title: 'Робочий телефон',
                        c: arr[0][0][''],
                        sql: arr[1][0]['ip_phone'],
                        ad: arr[2][0][''],
                        model: 'ip_phone',
                        collision: false
                    },
                    {
                        title: 'e-mail',
                        c: arr[0][0][''],
                        sql: arr[1][0]['email'],
                        ad: arr[2][0]['mail'],
                        model: 'email',
                        collision: false
                    },
                    {
                        title: 'Skype',
                        c: arr[0][0][''],
                        sql: arr[1][0]['skype'],
                        ad: arr[2][0]['pager'],
                        model: 'skype',
                        collision: false
                    },

                ]
                for (let i in sync) {
                    if (sync[i].type === 'date') {
                        if (sync[i].c.getTime() != sync[i].sql.getTime()) {
                            sync[i].collision = true
                        }
                    }
                    else if (sync[i].c !== undefined && sync[i].c !== sync[i].sql) {
                        sync[i].collision = true;
                    } else if (sync[i].ad !== undefined && sync[i].ad !== sync[i].sql) {
                        sync[i].collision = true;
                    }
                    else if (sync[i].sql == '' && sync[i].c == '' && !sync[i].ad) {
                        sync[i].empty = true;
                    }
                }
                ctrl.createSyncSave(sync)
                return sync
            };
            ctrl.createSyncSave = (sync) => {
                for (let i in sync) {
                    ctrl.syncSave[sync[i].model] = sync[i].sql
                }
            }
            ctrl.syncWorker = {}
            ctrl.getObjToSave = () => {
                ctrl.syncWorker = {
                    person: {
                        name: ctrl.syncSave.name_ua,
                        surname: ctrl.syncSave.surname_ua,
                        middle_name: ctrl.syncSave.middle_name_ua,
                        birthday: ctrl.syncSave.birthday,
                        place_of_residence: ctrl.syncSave.place_of_residence,
                        registration: ctrl.syncSave.registration,
                        mobile_phone: ctrl.syncSave.mobile_phone,
                        home_phone: ctrl.syncSave.home_phone,
                        email: ctrl.syncSave.email,
                        skype: ctrl.syncSave.skype,
                        ipn: ctrl.syncSave.ipn
                        // passport_id: '',
                        // date_of_issue: '',
                        // issued_by: ''
                    },
                    worker: {
                        name_ua: ctrl.syncSave.name_ua,
                        name_ru: ctrl.syncSave.name_ru,
                        name_en: ctrl.syncSave.name_en,
                        surname_ua: ctrl.syncSave.surname_ua,
                        surname_ru: ctrl.syncSave.surname_ru,
                        surname_en: ctrl.syncSave.surname_en,
                        middle_name_ua: ctrl.syncSave.middle_name_ua,
                        skype: ctrl.syncSave.skype,
                        ip_phone: ctrl.syncSave.ip_phone,
                        email: ctrl.syncSave.email,
                    },
                    c: {
                        name: ctrl.syncSave.name_ua,
                        surname: ctrl.syncSave.surname_ua,
                        middlename: ctrl.syncSave.middle_name_ua,
                        IPN: ctrl.syncSave.ipn,
                        SID: ctrl.sid,
                        // id:ctrl.ID,
                        address_of_residence: ctrl.syncSave.place_of_residence,
                        place_of_residence: ctrl.syncSave.registration,
                        phone: ctrl.syncSave.mobile_phone,
                        family: [],
                        education: [],
                        passport:[]

                    },
                    AD: {
                        sn: ctrl.syncSave.surname_ru,
                        givenName: ctrl.syncSave.name_ru,
                        ipPhone: ctrl.syncSave.ip_phone,
                        mail: ctrl.syncSave.email,
                        mobile: ctrl.syncSave.mobile_phone,
                        pager: ctrl.syncSave.skype,
                        snUa: ctrl.syncSave.surname_ua,
                        snEN: ctrl.syncSave.surname_en,
                        givenNameUa: ctrl.syncSave.name_ua,
                        'givenName-En': ctrl.syncSave.name_en
                    }
                }

                if (ctrl.syncWorker.AD.pager.length < 2) ctrl.syncWorker.AD.pager = []
            }
            ctrl.setValue = (n, val, model, r) => {
                ctrl.syncSave[model] = val
                ctrl.dataEdited = true
            }
            ctrl.comparison = {};
            ctrl.$onInit = function () {
                $scope.spinner = true
                employeesCollisionService.getData()
                    .then(data => {
                        ctrl.init(data);
                    });
            };
            ctrl.changeEmpty=(obj)=>{
                for(let i in obj) {
                    for (let subKey in obj[i]) {
                        if (!obj[i][subKey] || obj[i][subKey] === '' || obj[i][subKey] === 'None') {
                            i==='AD'?obj[i][subKey]=[]:obj[i][subKey]=''
                        }
                    }
                }
            }
            ctrl.submit = function () {
                ctrl.getObjToSave()
                ctrl.changeEmpty(ctrl.syncWorker)
                let url = ctrl.sid;
                employeesCollisionService.saveDataUpdated(url, ctrl.syncWorker)
                location.replace('/#!/sync/');
            };
            ctrl.$onInit()
        }
    ])
;