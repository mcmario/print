app
    .service('vacanciesService', ['$http', '$location', function ($http, $location) {

        let serv = this;


        serv.getListType = () => $location.path();

        serv.getListForNotes = function (url) {

            return $http.get(`/` + url)
                .then(resp => resp.data);
        }
        serv.getListByType = function () {
            let listType = (serv.getListType());


            return $http.get(`/api${listType}`)
                .then(resp => resp);
        };

        serv.getVacancyDetails = function (id) {
            return $http.get(`/api/vacancy/` + id)
                .then(resp => resp.data)
        }
        serv.deleteVacancy = function (id) {
            return $http.delete(`/api/vacancy/delete/` + id)
                .then(resp => resp.data)
        }
        serv.changeVacancyStatus = function (id) {
            if ($location.path().indexOf('active') >= 0) {
                return $http.get(`/api/vacancy/update/deactivated/` + id)
                    .then(resp => resp)
            }else{
                return $http.get(`/api/vacancy/update/active/` + id)
                    .then(resp => resp)
            }


        }


    }
    ])
;