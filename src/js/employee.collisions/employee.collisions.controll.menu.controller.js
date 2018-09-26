app
    .controller('currEmployeeCollisionsMenu', ['$scope', 'employeesCollisionService', '$location', 'toastsService', 'ngDialog',
        function ($scope, employeesCollisionService, $location, toastsService,ngDialog) {
            let ctrl = this;
            ctrl.myDepartment='';
            ctrl.myPerson=''

            ctrl.init = (data) => {

                $scope.data = data;
                ctrl.comparison = $scope.data[1][0];
                $scope.data = ctrl.refactColisionsArr($scope.data)
                ctrl.sortAndRenameDataArray($scope.data);
                $scope.spinner = false
            };

            ctrl.refactColisionsArr = function (arr) {
                const newKeys = {
                    IPN: 'ipn',
                    SID: 'sid',
                    address_of_residence: 'address_residence',
                    birthday: 'birthday',
                    department: 'departmentUa',
                    dismissed: 'status',
                    name: 'givenNameUa',
                    personnel_number: 'card_number',
                    phone: 'mobile',
                    place_of_residence: 'registration',
                    position: 'titleUa',
                    surname: 'snUa'
                };
                ctrl.renameKeys = function (obj, newKeys) {
                    const keyValues = Object.keys(obj).map(key => {
                        const newKey = newKeys[key] || key;
                        return {[newKey]: obj[key]};
                    });
                    return Object.assign({}, ...keyValues);
                };
                ctrl.newArr = [];
                ctrl.new1C = ctrl.renameKeys(arr[0][0], newKeys);

                for (let key in arr[0][0]) {
                    if (!ctrl.new1C[key]) {
                        ctrl.new1C[key] = ''
                    }
                }
                arr[2][0]['givenNameEn'] = arr[2][0]['givenName-En'];
                delete arr[2][0]['givenName-En'];
                ctrl.newArr[0] = ctrl.new1C;

                ctrl.newArr[1] = arr[1][0];
                ctrl.newArr[2] = arr[2][0];
                return ctrl.newArr


            }
            ctrl.sortAndRenameDataArray = function (data) {
                let number = 0
                ctrl.titleRename = function (val) {
                    let names = [
                        'Прізвище',
                        'Ім\'я',
                        'По батькові',
                        'Прізвище (російською)',
                        'Ім\'я (російською)',
                        'Прізвище (англійською)',
                        'Ім\'я (англійською)',
                        'Посада',
                        'Відділ',
                        'Філіал',
                        'Область',
                        'Місто',
                        'Вулиця',
                        'Поштовий індекс',
                        'Мобільний телефон',
                        'Внутрішній телефон',
                        'E-Mail',
                        'Skype',
                        'ІПН',
                        'Оклад',
                        'Адреса проживання',
                        'Адреса прописки',


                        'Сімейний стан'
                    ]
                    let values = [
                        'snUa',
                        'givenNameUa',
                        'middlename',
                        'sn',
                        'givenName',
                        'snEn',
                        'givenNameEn',
                        'titleUa',
                        'departmentUa',
                        'company',
                        'stUa',
                        'cityUa',
                        "streetAddressUa",
                        'postalCode',
                        'mobile',
                        'ipPhone',
                        'mail',
                        'pager',
                        'ipn',
                        'salary',
                        'address_residence',
                        'registration',

                        'married'
                    ];
                    for (x in values) {
                        if (val === values[x]) {
                            number = x;
                            return names[x]
                        } else {
                            number = names.length
                        }
                    }
                };
                let newArray = [[], [], []];
                for (let i in data) {
                    for (key in data[i]) {
                        let tempObj = {
                            title: key,
                            value: data[i][key],
                            name: ctrl.titleRename(key)

                        };
                        newArray[i][number] = tempObj
                    }

                    delete newArray[i].pop()
                }
                for (x in newArray[1]) {
                    if (newArray[0][x] && newArray[0][x].value !== newArray[1][x].value) {
                        newArray[1][x].conflict = true
                    }
                    else if (newArray[2][x] && newArray[2][x].value !== newArray[1][x].value) {
                        newArray[1][x].conflict = true

                    }
                }
                $scope.data = newArray;
            };
            ctrl.comparison = {};
            ctrl.$onInit = function () {
                $scope.spinner = true
                employeesCollisionService.getData()
                    .then(data => {
                        ctrl.init(data);
                    });
            };
            ctrl.submit = function () {
                ctrl.comparison['givenName-En'] = ctrl.comparison.givenNameEn
                delete ctrl.comparison.givenNameEn
                let url = ctrl.comparison.sid;
                employeesCollisionService.saveDataUpdated(url, ctrl.comparison)
                location.replace('/#!/sync/');
            };
            ctrl.$onInit()
        }
    ])
;