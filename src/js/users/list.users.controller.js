app
    .controller('listUsersController', ['$scope', function ($scope) {
        let ctrl = this
        console.log('hello')


        ctrl.listPeople = [
            {
                name: "Ярослав",
                surname: 'Кривуля',
                email: ["yaroslav@gmail.com","2yaroslav@gmail.com"],
                middlename: 'Юрієвич',
                phone: ['0937115206', '380997775522'],
                birthday: '2000-05-25',
                type: 'admin'
                ,
            },{
                name: "Наталія",
                surname: 'Кривуля',
                email: ["222yaroslav@gmail.com","21212yaroslav@gmail.com"],
                middlename: 'Романівна',
                phone: ['0889999999', '382227775522'],
                birthday: '2000-01-26',
                status: 'admin'
                ,
            },
        ]


    }])