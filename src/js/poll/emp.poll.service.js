app
    .service('empPollsService', ['$http', '$location', function ($http, $location) {

        let serv = this;
        // serv.poll = {
        //     "count": 1,
        //     "description": "Звичайне опитування з метою покращення умов",
        //     "id": 29,
        //     "number_question": 3,
        //     "question": {
        //         "answer": ['yes','no','sometimes'],
        //         "text": "Ви снідаєте?",
        //         "type": "radio"
        //     },
        //     "title": "Планове покращення якості сніданків"
        //
        // };
        serv.sendAnswer = function (data) {
            return $http.post(`/next_poll/7`, data)
                .then(response => {



                    return response.data

                })

        }
        serv.sendLastAnswer = function (data) {
            return $http.post(`/next_poll/7`, data)
                .then(response => {



                    return response.data

                })

        }

        serv.getPoll = function () {
            return $http.get(`/next_poll/7`)
                .then(resp => {
                    return resp.data
                })

        }

    }
    ])
;