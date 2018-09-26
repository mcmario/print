app
    .service('developPollsService', ['$http', '$location', function ($http, $location) {

        let serv = this;

        serv.getDevelopPolls = function () {
            return $http.get(`/poll/develop`)
                .then(resp => {


                    return resp.data
                })

        }




    }

    ])
;