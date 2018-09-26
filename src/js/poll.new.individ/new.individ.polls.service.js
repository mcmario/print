app
    .service('newIndividPollsService', ['$http', '$location', 'toastsService', 'modalWindowsService', function ($http, $location, toastsService, modalWindowsService) {

        let serv = this;


        serv.eduType = ['середня', 'незакінчена середня', 'середня спеціальна', 'вища', 'неповна вища', 'післядипломна освіта'];

        serv.addEdu = function (name) {
            toastsService.toastAddEducation(name)
        };
        serv.getCities=function(){
            return $http.get(`/api/admin/city_list`)
          .then(resp => resp.data);
        }
        serv.getDepartments=function(){
            return $http.get(`/api/admin/department`)
          .then(resp => resp.data);
        }
        serv.getNewIndividPoll = function (id) {


            return $http.get("/anketa/"+id)
                .then(resp => {

                    return resp.data

                })

        };


        serv.emptyFieldError = function (name) {
            toastsService.emptyFieldError(name)
        };
        serv.addNewCandidate = function (data) {
            console.log(data);
            return $http.post('/anketa/save', data)

                .then(function (resp) {
                    toastsService.toastAddNewCandidateMsg();
                    return resp
                });
        }
    }
    ])
;