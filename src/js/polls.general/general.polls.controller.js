app
    .controller('generalPollsController', ['developPollsService', 'modalWindowsService', 'generalPollsService', '$scope','$rootScope', function (developPollsService, modalWindowsService, generalPollsService, $scope,$rootScope) {
        let ctrl = this
        ctrl.spinner=true
        ctrl.spinner2=true
$rootScope.spinner2=false
        ctrl.copyPoll = function (data, name) {
            ctrl.spinner=true
            //
            // generalPollsService.copyPoll(data, name).then(
            //     response => ctrl.$onInit()
            // )
        };

        ctrl.deletePoll = function (data, name) {
            generalPollsService.deletePoll(data, name).then(
                response => ctrl.$onInit()
            )


        };
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
        $scope.activeClassButton=(n)=>{
            ctrl.activeClassB=[]
            ctrl.activeClassB[n]=true
        }
        $scope.changeCopyNumber = function (copy, index) {
            (!copy||copy <= 0 ) ? copy = 1 : copy>99 ? copy=99: copy = copy;

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
            generalPollsService.poolForUpdate(id)


        }

        ctrl.init = (data, data2) => {
            $scope.polls = data;
            $scope.pollAnk = data2
            ctrl.spinner=false
            ctrl.spinner2=false
            $rootScope.spinner=false
            $rootScope.spinner2=false

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