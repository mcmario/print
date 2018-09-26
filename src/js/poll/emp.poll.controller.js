app
    .controller('empPollsController', ['empPollsService', 'generalPollsService', '$scope', function (empPollsService, generalPollsService, $scope) {
        let ctrl = this
        ctrl.finish = false;


        ctrl.answer = {
            id: '',
            number_question: '',
            answer: []
        }



        ctrl.getPoll = () => {
            empPollsService.getPoll().then(response => ctrl.poll = response)
        }
        ctrl.sendAnswer = function () {

            ctrl.answer.id = ctrl.poll.id;
            ctrl.answer.number_question = ctrl.poll.number_question

            empPollsService.sendAnswer(ctrl.answer).then(response => ctrl.poll = response)
            ctrl.answer = {
                id: '',
                number_question: '',
                answer: []
            }

        }
        ctrl.sendLastAnswer = function () {

            ctrl.answer.id = ctrl.poll.id;
            ctrl.answer.number_question = ctrl.poll.number_question

            empPollsService.sendAnswer(ctrl.answer).then(response => {
                    ctrl.finish = true
                ctrl.answer = {
                    id: '',
                    number_question: '',
                    answer: []
                }
                ctrl.poll=[]
                }
            )


        }
        ctrl.getPoll();


        // ctrl.poll = {
        //     "count": 3,
        //     "description": "Звичайне опитування з метою покращення умов",
        //     "id": 29,
        //     "number_question": 1,
        //     "question": {
        //         "answer": [],
        //         "text": "Ви снідаєте?",
        //         "type": "text"
        //     },
        //     "title": "Планове покращення якості сніданків"
        //
        // }
        // ctrl.copyPoll = function (data, name) {
        //     generalPollsService.copyPoll(data, name)
        //
        // }
        // ctrl.closePoll = function (data, name) {
        //     generalPollsService.closePoll(data, name)
        //         .then(
        //             response => ctrl.$onInit()
        //         )
        //
        // }
        //
        //
        // ctrl.init = (data) => {
        //     $scope.polls = data;
        //
        // };
        //
        // ctrl.$onInit = function () {
        //     activePollsService.getActivePolls()
        //         .then(data => {
        //             ctrl.init(data);
        //
        //         });
        // };
        // ctrl.$onInit()


    }])
;