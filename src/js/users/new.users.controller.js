app
    .controller('newUserCtrl', ['$scope', 'RootFactory', function ($scope, RootFactory) {
        console.log('hello ctrl')
        let ctrl = this
        ctrl.newUser = {
            name: '',
            sname: '',
            email: [],
            middle_name: '',
            phone: [],
            password:'',
            birthday: new Date(),
            status:'',
        }
        ctrl.tempMail = ''
        ctrl.tempPhone = ''
        ctrl.addPhone = (tel) => {
            ctrl.newUser.phone.push(tel)

            ctrl.tempPhone = ''
        }
        ctrl.addMail = (mail) => {
            console.log(ctrl.tempMail)
            ctrl.newUser.email.push(mail)

            ctrl.tempMail = ''
        }
        ctrl.saveNewUser = () => {


            console.log('new user', ctrl.newUser)
        }


    }])
;