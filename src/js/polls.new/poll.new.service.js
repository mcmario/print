app
    .service('newPollsService', ['$http', '$location', function ($http, $location) {

        let serv = this;

        serv.newPoll = {
            id:'',
            name: '',
            description:'',
            questions: [
                {
                    n:1,
                    text: '',
                    type: 'text',
                    answers: []
                },

            ]
        };


        serv.getPoll = function () {
            return serv.newPoll

        }

    }

    ])
;