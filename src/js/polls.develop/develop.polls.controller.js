app
    .controller('developPollsController', ['developPollsService', 'modalWindowsService', 'generalPollsService', '$scope', '$rootScope', 'ngDialog', function (developPollsService, modalWindowsService, generalPollsService, $scope, $rootScope, ngDialog) {
        let ctrl = this
        ctrl.spinner = true
        ctrl.spinner2 = true
        $rootScope.spinner2 = false
        ctrl.copyPoll = function (data, name) {
            ctrl.spinner = true

            generalPollsService.copyPoll(data, name).then(
                response => ctrl.$onInit()
            )
        };
        ctrl.dataToDel = ''
        ctrl.nameToDel = ''
        ctrl.typeConfirmation = '123'

        ctrl.deletePoll = function (data, name) {
            $scope.a = data;
            $scope.name = name;
            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class="text-center">Ви дісно хочете видалити опитування \"{{name}}\"?</h3>\n' +
                '<button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deletePollConfirmed(a,name); closeThisDialog(0)">так</button>\n' +
                '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '</div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,


            });
        }

        $scope.deletePollConfirmed = function (data1, data2) {
            generalPollsService.deletePoll(data1, data2).then(
                response => ctrl.$onInit()
            )
        }


        // ctrl.deletePoll = function (data, name) {
        //     generalPollsService.dataToDel(data, name)
        //     $scope.dataToDel=data
        //     $scope.nameToDel=name
        //
        //     $scope.typeConfirmation='pollDelete';
        //     ngDialog.open({
        //         template: 'static/templates/polls.confirm.modal.html',
        //         appendClassName: 'material-modal delete_confirmation',
        //         controller: 'developPollsController',
        //
        //         controllerAs: 'ctrl',
        //
        //
        //     });
        //
        //
        //
        // };


        $scope.refactorPhones = function (arr) {
            let arr2 = []
            for (i in arr) {
                arr2[i] = arr[i].slice(0, 2) + ' (' + arr[i].slice(2, 5) + ') ' + arr[i].slice(5, 8) + ' ' + arr[i].slice(8,10)+' ' + arr[i].slice(10)
            }
            return arr2

        }
// ctrl.deletePollConfirmed=function () {
//     generalPollsService.deletePoll().then(
//         response => ctrl.$onInit()
//     )
// }


        $scope.pollContacts = {
            mobArr: [],
            mobile: [],
            email: [],
            mailArr: [],
            trash: [],

        };


        $scope.addContacts = function (str) {
            str = $scope.string.replace(/[,+-]/g, " ").trim();
            if (str.indexOf(' ') > 1) {
                let newStr = str.split(' ');
                for (let i in newStr) {
                    if (newStr[i].match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
                        $scope.pollContacts.mailArr.indexOf(newStr[i]) === -1 ? $scope.pollContacts.mailArr.push(newStr[i]) : false
                        let mailObj = {copy: 1, email: newStr[i]}
                        $scope.pollContacts.email.push(mailObj)
                        $scope.string = ''
                    }
                    else if (newStr[i].match(/^(380)\d{9}$/g)) {
                        $scope.pollContacts.mobile.indexOf(newStr[i]) === -1 ? $scope.pollContacts.mobile.push(newStr[i]) : false;

                        $scope.string = ''

                    }

                    else {
                        $scope.pollContacts.trash.indexOf(newStr[i]) === -1 ? $scope.pollContacts.trash.push(newStr[i]) : false;
                        $scope.string = ''
                    }

                }
            }
            else {
                if (str.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) {
                    $scope.pollContacts.mailArr.indexOf(str) === -1 ? $scope.pollContacts.mailArr.push(str) : false
                    let mailObj = {copy: 1, email: str}
                    $scope.pollContacts.email.push(mailObj)
                    $scope.string = ''
                }
                else if (str.match(/^(380)\d{9}$/g)) {
                    $scope.pollContacts.mobile.indexOf(str) === -1 ? $scope.pollContacts.mobile.push(str) : false;
                    $scope.string = ''
                }
                else if (str.match(/^(0)\d{9}$/g)) {
                    $scope.pollContacts.mobile.indexOf('38' + str) === -1 ? $scope.pollContacts.mobile.push('38' + str) : false;
                    $scope.string = ''
                }
                else {
                    generalPollsService.contactWrong()
                }
            }

        };
        $scope.activeClassButton = (n) => {
            ctrl.activeClassB = []
            ctrl.activeClassB[n] = true
        }
        $scope.changeCopyNumber = function (copy, index) {
            if (!copy || copy <= 0) {
                copy = 1
            } else if (copy > 99) {
                copy = 99;
                generalPollsService.tooMuch(99)
            } else {
                copy = copy
            }

            $scope.pollContacts.email[index].copy = copy
        }

        $scope.checkKey = function ($event, arr) {
            let keyCode = $event.which || $event.keyCode;
            if (keyCode === 13 || keyCode === 32) {
                $scope.addContacts()
            }
        };
       $scope.deleteFromContacts = function (numb, arr) {
            if (arr === 'email') {
                $scope.pollContacts[arr].splice(numb, 1)
                $scope.pollContacts.mailArr.splice(numb, 1)

            } else {

                $scope.pollContacts[arr].splice(numb, 1)
            }
        }

        ctrl.publicatePoll = function (id) {
            generalPollsService.saveId(id);
            modalWindowsService.publicatePoll()

        };
        $scope.publicateThisPoll = function () {


            delete $scope.pollContacts.mailArr
            delete $scope.pollContacts.mobArr
            delete $scope.pollContacts.trash

            for (let i in $scope.pollContacts.email) {
                if ($scope.pollContacts.email[i].copy <= 0) {
                    $scope.pollContacts.email[i].copy = 1
                }
            }


            generalPollsService.publicatePolls($scope.pollContacts)
                .then(response => ctrl.$onInit())
        };
        ctrl.pollForUbdate = function (id) {
            generalPollsService.pollForUpdate(id)


        }

        ctrl.init = (data, data2) => {
            $scope.polls = data;
            $scope.pollAnk = data2

            ctrl.spinner = false
            ctrl.spinner2 = false
            $rootScope.spinner = false
            $rootScope.spinner2 = false

        };


        ctrl.$onInit = function () {
            developPollsService.getDevelopPolls()
                .then(data => {
                    ctrl.init(data);

                });
        };
        ctrl.$onInit()


    }
    ])
;