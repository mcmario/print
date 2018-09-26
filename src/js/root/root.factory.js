app

    .factory('RootFactory', ['$sce', '$http', function ($sce, $http) {
        let fact = this;
        fact.pending=0;
        // https://phonebook.busmarket.ua/user/dmytro.buschuk@busmarket.ua
        fact.getUser = function () {
        //     $http.get('/api/get_phone')
        //         .then(
        //             (response) => {
        //                 this.user.ipPhone = parseInt(response.data);
        //                 if (!this.user.ipPhone) {
        //                     this.user.ipPhone = parseInt('6601')
        //                 }
        //             }, function () {
        //
        //                 this.user.ipPhone = parseInt('6601')
        //             }
        //         )
        };


        fact.getPending=()=>{

            // return $http.get('/api/vacation/count') .then(
            //         (response) => {
            //             this.routingMap[4].elements[4].count = parseInt(response.data);
            //
            //         }, function () {
            //
            //             this.routingMap[4].elements[4].count = parseInt(0);
            //         }
            //     )
        }
        fact.tempUser = '';


        this.user = {
            ManagedBy: [],
            canonicalName: [
                "busmarket.ua/BMGROUP/DepartmentOfInformationTechnologies/WebDevelopmentSector/Lutsk/\u0414\u043c\u0438\u0442\u0440\u0438\u0439 \u0411\u0443\u0449\u0443\u043a"
            ],
            cityUa: "\u041b\u0443\u0446\u044c\u043a",
            cn: "\u0414\u043c\u0438\u0442\u0440\u0438\u0439 \u0411\u0443\u0449\u0443\u043a",
            co: "\u0423\u043a\u0440\u0430\u0438\u043d\u0430",
            company: "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u043e\u0444\u0438\u0441 (\u041e\u041f\u0422)",
            companyEn: "BusMarket Group",
            department: "\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0435 \u0422\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438",
            departmentEn: "IT Department",
            departmentUa: "\u0406\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u0439\u043d\u0456 \u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0456\u0457",
            displayName: "\u0414\u043c\u0438\u0442\u0440\u0438\u0439 \u0411\u0443\u0449\u0443\u043a",
            givenName: "\u0414\u043c\u0438\u0442\u0440\u0438\u0439",
            "givenName-En": "Dmytro",
            givenNameUa: "\u0414\u043c\u0438\u0442\u0440\u043e",
            ipPhone: 6601,
            isDeleted: [],
            l: "Lutsk",
            mail: "dmytro.buschuk@busmarket.ua",
            mobile: "+38 (066) 600-40-00",
            mobileCompanyFirst: "+38 (099) 333-45-00",
            mobileCompanySecond: "+38 (097) 333-45-00",
            name: "\u0414\u043c\u0438\u0442\u0440\u0438\u0439 \u0411\u0443\u0449\u0443\u043a",
            pager: [],
            sn: "\u0411\u0443\u0449\u0443\u043a",
            snEn: "Bushchuk",
            snUa: "\u0411\u0443\u0449\u0443\u043a",
            st: "Volynska",
            streetAddress: "\u0421\u043e\u0431\u043e\u0440\u043d\u043e\u0441\u0442\u0438, 38\u0411",
            streetAddressCompany: "43026, Ukraine, Lutsk, pr-t. Sobornosti, 38b",
            streetAddressCompanyRu: "43026, \u0423\u043a\u0440\u0430\u0438\u043d\u0430, \u041b\u0443\u0446\u043a, \u043f\u0440-\u0442. \u0421\u043e\u0431\u043e\u0440\u043d\u043e\u0441\u0442\u0438, 38\u0411",
            streetAddressCompanyUa: "43026, \u0423\u043a\u0440\u0430\u0457\u043d\u0430, \u041b\u0443\u0446\u044c\u043a, \u043f\u0440-\u0442. \u0421\u043e\u0431\u043e\u0440\u043d\u043e\u0441\u0442\u0456, 38\u0411",
            streetAddressUa: "\u0421\u043e\u0431\u043e\u0440\u043d\u043e\u0441\u0442\u0456, 38\u0411",
            telephoneNumber: "5071",
            title: "\u0418\u043d\u0436\u0435\u043d\u0435\u0440-\u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0441\u0442 \u0441 \u0432\u0435\u0431 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043e\u043a",
            titleEn: "Web Developer",
            titleUa: "\u0406\u043d\u0436\u0435\u043d\u0435\u0440-\u043f\u0440\u043e\u0433\u0440\u0430\u043c\u0456\u0441\u0442 \u0437 Web \u0440\u043e\u0437\u0440\u043e\u0431\u043e\u043a",
            userAccountControl: 512
        };

        // fact.getUser();
        // fact.getPending()

        this.routingMap = [
            {
                title: 'Замовлення',

                svg: $sce.trustAsHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><defs><style>.a{fill:#fff;}.b{fill:none;}</style></defs><g transform="translate(-30 -400)"><g transform="translate(0 -1)"><path class="a" d="M12,0A2.914,2.914,0,0,0,9.2,2H5A2.007,2.007,0,0,0,3,4V20a2.006,2.006,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V4a2.006,2.006,0,0,0-2-2H14.8A2.914,2.914,0,0,0,12,0Zm0,2a.945.945,0,0,1,1,1,1,1,0,0,1-2,0A.945.945,0,0,1,12,2ZM5,4H7V6H17V4h2V20H5Zm9.621,5a.434.434,0,0,0-.3.148l-.7.7,1.606,1.59.7-.7a.621.621,0,0,0,0-.6l-1-.994A.434.434,0,0,0,14.621,9Zm-1.4,1.242L8,15.41V17H9.605l5.215-5.168Z" transform="translate(33 405)"/><path class="a" d="M.044-.8,6.568,0H9.844l6.031-1.1L16,17H0Z" transform="translate(37 409)"/></g><rect class="b" width="30" height="30" transform="translate(30 400)"/></g></svg>`),
                name: 'orders',
                elements: [
                    {
                        title: 'Нові',
                        url: 'pending'
                    },
                    {
                        title: 'В друці',
                        url: 'active'
                    },
                    {
                        title: 'Завершені',
                        url: 'finished'
                    },
                    {
                        title: 'Створити',
                        url: 'create'
                    },
                ]
            },
            {
                title: 'Клієнти',
                svg: $sce.trustAsHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><defs><style>.a{fill:#fff;}.b{fill:none;}</style></defs><g transform="translate(-30 -180)"><g transform="translate(0 2)"><path class="a" d="M17.628,13.187a4.44,4.44,0,1,0,4.44,4.44A4.44,4.44,0,0,0,17.628,13.187Zm-.615,1.978h1.231V16.99h1.824v1.275H18.243V20.09H17.012V18.265H15.166V16.99h1.846Z" transform="translate(27.812 184.585)"/><path class="a" d="M12,5a4,4,0,1,0,4,4A4,4,0,0,0,12,5ZM4.5,6A2.5,2.5,0,1,0,7,8.5,2.5,2.5,0,0,0,4.5,6Zm15,0A2.5,2.5,0,1,0,22,8.5,2.5,2.5,0,0,0,19.5,6ZM12,7a2,2,0,1,1-2,2A2,2,0,0,1,12,7ZM4.5,13A4.759,4.759,0,0,0,0,15.656V17H4.063l.031-.062a6.917,6.917,0,0,1,3.25-3.156A5.145,5.145,0,0,0,4.5,13Zm15,0a5.144,5.144,0,0,0-2.844.781,6.918,6.918,0,0,1,3.25,3.156l.031.063H24V15.656A4.759,4.759,0,0,0,19.5,13ZM12,14a7.4,7.4,0,0,0-7,4v2H19V18A7.4,7.4,0,0,0,12,14Zm0,2c3.434,0,4.531,2,4.531,2H7.469S8.609,16,12,16Z" transform="translate(33 175)"/><circle class="a" cx="3" cy="3" r="3" transform="translate(42 181)"/><rect class="a" width="10" height="3" transform="translate(40 191)"/></g><rect class="b" width="30" height="30" transform="translate(30 180)"/></g></svg>`),

                name: 'clients',
                elements: [
                    {
                        title: 'Всі',
                        url: 'all'
                    },
                    {
                        title: 'Боржники',
                        url: 'debt'
                    },

                    {
                        title: 'Створити',
                        url: 'create'
                    },
                ]
            },

            {
                title: 'Працівники',
                // svg: $sce.trustAsHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><defs><style>.a{fill:#fff;}.b{fill:none;}</style></defs><g transform="translate(-30 -330)"><path class="a" d="M20,2H4A2,2,0,0,0,2,4V22l4-4H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM9,15H7V11H9Zm4,0H11V5h2Zm4,0H15V8h2Z" transform="translate(33 333)"/><rect class="b" width="30" height="30" transform="translate(30 330)"/></g></svg>`),
svg: $sce.trustAsHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><defs><style>.a{fill:#fff;}.b{fill:none;}</style></defs><g transform="translate(-30 -110)"><g transform="translate(0 5)"><circle class="a" cx="3" cy="3" r="3" transform="translate(42 114)"/><path class="a" d="M12,5a4,4,0,1,0,4,4A4,4,0,0,0,12,5ZM4.5,6A2.5,2.5,0,1,0,7,8.5,2.5,2.5,0,0,0,4.5,6Zm15,0A2.5,2.5,0,1,0,22,8.5,2.5,2.5,0,0,0,19.5,6ZM12,7a2,2,0,1,1-2,2A2,2,0,0,1,12,7ZM4.5,13A4.759,4.759,0,0,0,0,15.656V17H4.063l.031-.062a6.917,6.917,0,0,1,3.25-3.156A5.145,5.145,0,0,0,4.5,13Zm15,0a5.144,5.144,0,0,0-2.844.781,6.918,6.918,0,0,1,3.25,3.156l.031.063H24V15.656A4.759,4.759,0,0,0,19.5,13ZM12,14a7.4,7.4,0,0,0-7,4v2H19V18A7.4,7.4,0,0,0,12,14Zm0,2c3.434,0,4.531,2,4.531,2H7.469S8.609,16,12,16Z" transform="translate(33 108)"/><rect class="a" width="10" height="3" transform="translate(40 124)"/></g><rect class="b" width="30" height="30" transform="translate(30 110)"/></g></svg>
`),
                name: 'users',
                elements: [
                    {
                        title: 'Усі',
                        url: 'all'
                    },

                    {
                        title: 'Створити',
                        url: 'new'
                    },

                ]
            },

            {
                title: 'Звітність',
                svg: $sce.trustAsHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="29px" height="23px" viewBox="0 0 19.45 20"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(-2.26 -2)"><path class="a" d="M19.4,13c0-.3.1-.7.1-1a3.351,3.351,0,0,0-.1-1l2.1-1.5a.467.467,0,0,0,.1-.7l-2-3.5A.447.447,0,0,0,19,5L16.6,6.1a6.329,6.329,0,0,0-1.8-1l-.3-2.6A.472.472,0,0,0,14,2H10a.472.472,0,0,0-.5.5L9.2,5A7.784,7.784,0,0,0,7.4,6L5,5a.483.483,0,0,0-.6.2l-2,3.5c-.2.3-.2.6.1.7L4.6,11c0,.3-.1.7-.1,1a3.352,3.352,0,0,0,.1,1L2.5,14.5a.467.467,0,0,0-.1.7l2,3.5A.447.447,0,0,0,5,19l2.4-1.1a6.326,6.326,0,0,0,1.8,1l.3,2.6a.472.472,0,0,0,.5.5h4a.472.472,0,0,0,.5-.5l.3-2.6a7.5,7.5,0,0,0,1.8-1L19,19a.483.483,0,0,0,.6-.2l2-3.5a.621.621,0,0,0-.1-.7ZM12,16a4,4,0,1,1,4-4A4.013,4.013,0,0,1,12,16Z"/></g></svg>`),

                 name: 'administrating',
                elements: [
                    {
                        title: 'Оплати',
                        url: '#1'
                    },
                    {
                        title: 'Замовлення',
                        url: '#2'
                    },
//


                ]
            },
            {
                title: 'Вихід',
                svg: $sce.trustAsHtml('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><defs><style>.a{fill:#fff;}.b{fill:none;}</style></defs><g transform="translate(-30 -560)"><path class="a" d="M8,3A2,2,0,0,0,6,5v9h8.586l-2.293-2.293a1,1,0,0,1,1.414-1.414l4,4a1,1,0,0,1,0,1.414l-4,4a1,1,0,1,1-1.414-1.414L14.586,16H6v9a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V5a2,2,0,0,0-2-2ZM6,16V14H1a1,1,0,0,0,0,2Z" transform="translate(33 560)"/><rect class="b" width="30" height="30" transform="translate(30 560)"/></g></svg>'),

                url: 'sign_out'
            }
        ];

        this.storage = {
            visibleSidebar: true,
            notesStatus: false
        };

        this.Set = (key, val) => {
            fact.storage[key] = val;
        };
        this.Get = (key) => fact.storage[key];
        return {
            set: fact.Set,
            get: fact.Get,
            user: fact.user,
            routingMap: fact.routingMap
        };
    }])

;