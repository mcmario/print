app
    .service('candidateToEmpService', ['$http', '$location', 'toastsService', '$route', function ($http, $location, toastsService, $route) {
        let serv = this;


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

        serv.dismissedToEmployee = function (data) {
            let testRequest = $route.current.params.identify;


            return $http.post('/api/dismissed/towork/' + testRequest, data).then(
                response => {


                    return response;
                },
                resp => {
                    console.error(resp)
                    toastsService.customMessageEr('Ой лишенько', "Сталася невідома помилка")
                    // return resp;
                }
            )
        }
        serv.getListPeople = function () {
            return $http.get(`/workers/active`)
                .then(resp => {
                    return resp.data
                });
        }




        serv.candidateToEmployee = function (data) {
            let testRequest = $route.current.params.identify;


            return $http.post('/api/candidate/towork/' + testRequest, data).then(
                 response => {


                    return response;
                },
                resp => {
                    console.error(resp)
                    toastsService.customMessageEr('Ой лишенько', "Сталася невідома помилка")
                    // return resp;
                }
            )
        }


    }]);