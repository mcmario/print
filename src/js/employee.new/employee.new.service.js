app
    .service('newUserService', ['$http', '$location', '$route', 'toastsService', function ($http, $location, $route, toastsService) {
        let serv = this;

        serv.addNewUser = function (data) {

            return $http.post('/api/employees/new', data)
                .then(resp => {
                    return resp
                    // $route.reload()
                });

        };
        serv.getAccrualCode=()=>{
            return $http.get('/api/accruals').then(resp=>resp.data)
        }
        serv.getListPeople = function () {
            return $http.get(`/workers/active`)
                .then(resp => {
                    return resp.data
                });
        }
        serv.getEduTypes = function () {

            return $http.get('/api/edu/type')
                .then(
                    response => {

                        return response.data
                    },
                    response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                );

        };
        serv.getEduInstitutions = function () {
            return $http.get('/api/edu/institution').then(
                response => {

                    return response.data
                },
                response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
            );
        };
        serv.getEduSpecialty = function () {
            return $http.get('/api/edu/specialty').then(
                response => {

                    return response.data
                },
                response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
            );
        };
        serv.emptyFieldError = function (name) {
            toastsService.toastEmptyField(name)
        };


        serv.wrongFormat = function (name) {
            toastsService.wrongFormat(name)
        }

        serv.addEdu = function (name) {
            toastsService.toastAddEducation(name)
        };
        serv.getDepartments = function () {
            return $http.get('/api/worker/department')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
                );
        };
        serv.getSchedule = function () {

            return $http.get('/api/schedule')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
                );
        };
        serv.getPositions = function (dept) {
            return $http.get('/api/position')
                .then(
                    (response) => {
                        return response.data;
                    },
                    (errResponse) => {
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
                );
        };


        serv.getCities = function () {
            return $http.get('/api/city_list')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
                );
        }
        serv.getBranches = function () {
            return $http.get('/api/branch')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
                );

        }

        serv.checkIpn=(ipn)=>{
           return $http.get('/api/check_ipn/'+ipn).then(resp=>{
                return resp
            })
        }
        // serv.getStructure = function () {
        //
        //     // return structure;
        //     // $http.get('/api/collisions/user/'+url)
        //     //         .then(
        //     //             (response) => {
        //     //                 return response.data;
        //     //             },
        //     //             response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
        //     //         );
        //     // };
        // };


    }]);