app
    .controller('newPollsController', ['newPollsService', 'modalWindowsService', 'controlMenuService', 'generalPollsService', '$scope', 'ngDialog', '$location', '$route', '$anchorScroll', '$document',
        function (newPollsService, modalWindowsService, controlMenuService, generalPollsService, $scope, ngDialog, $location, $route, $anchorScroll, $document) {
            let ctrl = this;
            ctrl.spinner = true
            ctrl.showVariants = false;
            ctrl.addNote = modalWindowsService.createNote
            ctrl.toggleNotes = controlMenuService.toggleNotes;
            const temp = {
                id: '',
                name: '',
                description: '',
                questions: [
                    {
                        n: 1,
                        question: '',
                        type_: 'text',
                        answers: []
                    },

                ]
            };
            ctrl.newPoll = {
                id: '',
                name: '',
                description: '',
                questions: [
                    {
                        n: 1,
                        question: '',
                        type_: 'text',
                        answers: []
                    },

                ]
            };
            //
            if ($location.path().indexOf('new') >= 0) {
                ctrl.newPoll = {}
                ctrl.newPoll = {
                    id: '',
                    name: '',
                    description: '',
                    questions: [
                        {
                            n: 1,
                            question: '',
                            type_: 'text',
                            answers: []
                        },

                    ]
                };
            }


            // ctrl.newPollStart()
            ctrl.stop = false;
            ctrl.status = false;
            ctrl.autoExpand = function ($event) {
                if ($event.keyCode) {
                    ctrl.status = false
                }
                $event.target.style.height = $event.target.scrollHeight + "px";
            };

            ctrl.textAreaAutoResize = function () {
                let t = document.getElementsByClassName('resizableTextArea')
                for (let i in t) {
                    if (t[i].scrollHeight > 0) {
                        t[i].style.height = t[i].scrollHeight + "px"
                    }
                }
            }

            ctrl.validateNewPoll = function (poll) {
                if (poll.questions.length < 1) {
                    generalPollsService.pollValidateNoQ();

                    return false
                }
                else {
                    for (let i in poll.questions) {
                        if (poll.questions[i].question.length < 1) {
                            generalPollsService.pollValidateLengthText(i + 1);
                            return false

                        }
                        else if (poll.questions[i].type_ === 'radio' && poll.questions[i].answers.length < 2) {
                            generalPollsService.validatePollLength(i + 1)
                            return false
                        }
                        else if (poll.questions[i].type_ === 'check' && poll.questions[i].answers.length < 2) {
                            generalPollsService.validatePollLength(i + 1)

                            return false

                        }
                        else return true
                    }
                }
            };
            ctrl.getPolls = function () {
                let id = generalPollsService.getIdForUpdate();

                if (id > 2) {

                    generalPollsService.pollUpdate(id).then(response => {
                            ctrl.status = true
                            ctrl.update = true
                            ctrl.newPoll = response;
                            for (let i in ctrl.newPoll.questions) {
                                ctrl.newPoll.questions[i].n = 1 + parseInt(i)
                            }
                            delete ctrl.newPoll.question

                        }
                    )

                }
                else {
                    ctrl.update = false
                    ctrl.newPoll = temp
                }
                ctrl.spinner = false
            };


            ctrl.showVariants = false;
            ctrl.editable = false;

            ctrl.deleteVariant = function (qn, vn) {
                $scope.qn = qn
                $scope.vn = vn
                ngDialog.open({
                    template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                    '        <h3 class="text-center">{{typeConfirmation}}Ви дісно хочете видалити варіант відповіді?</h3>\n' +
                    '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="ctrl.deleteVariantConf(qn,vn); closeThisDialog(0)">так</button>\n' +
                    '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                    '    </div></div>',
                    appendClassName: 'material-modal delete_confirmation',
                    // controller: 'developPollsController',
                    plain: true,
                    scope: $scope,
                    // controllerAs: 'ctrl',


                });


                // ctrl.newPoll.questions[qn].answers.splice(vn, 1)
            };
            ctrl.deleteVariantConf = function (qn, vn) {
                ctrl.newPoll.questions[qn].answers.splice(vn, 1)
            }


            ctrl.deleteQuestion = function (qn, vn) {
                $scope.qn = qn
                $scope.vn = vn

                ngDialog.open({
                    template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                    '        <h3 class="text-center">Ви дісно хочете видалити запитання?</h3>\n' +
                    '        <button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="ctrl.deleteQuestionConfirmed(qn,vn); closeThisDialog(0)">так</button>\n' +
                    '        <button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                    '    </div></div>',
                    appendClassName: 'material-modal',
                    // controller: 'developPollsController',
                    plain: true,
                    scope: $scope,
                    // controllerAs: 'ctrl',


                });


                // ctrl.newPoll.questions.splice(qn, 1);
            };
            ctrl.deleteQuestionConfirmed = function (qn, vn) {
                ctrl.newPoll.questions.splice(qn, 1);
            }

            ctrl.copyVariant = function (qn, vn) {
                ctrl.newPoll.questions[qn].answers.push('(копія) ' + ctrl.newPoll.questions[qn].answers[vn])
                // $location.hash('bottom');


            };
            ctrl.addNewQuestion = function () {

                ctrl.newQuestion = {
                    type_: 'text',
                    answers: []
                };

                ctrl.newQuestion.n = ctrl.newPoll.questions.length + 1;
                ctrl.newPoll.questions.push(ctrl.newQuestion);


                // $location.hash('bottom');

            };

            ctrl.addVariant = function (n, t) {
                if (t === 'text' && ctrl.newPoll.questions[n].answers.length > 0) {
                    ctrl.newPoll.questions[n].answers = []
                    ctrl.stop = false
                } else {
                    ctrl.variant = n;
                    ctrl.stop = true
                }

            }
            ctrl.addQuestionVariant = function (x) {
                for (let i in ctrl.newPoll.questions)
                    if (ctrl.newPoll.questions[i].n === x) {
                        ctrl.newPoll.questions[i].answers.push(ctrl.newQuestionVariant)
                    }
                document.getElementsByClassName('resizableTextAreaNew')[0].style.height = '40px';


                ctrl.newQuestionVariant = '';
                ctrl.stop = false;
                // $location.hash('bottom');

            };

            ctrl.saveNewPoll = function () {
                ctrl.spinner = true
                if (ctrl.validateNewPoll(ctrl.newPoll)) {
                    delete ctrl.newPoll.n
                    for (let i in ctrl.newPoll.questions) {
                        delete ctrl.newPoll.questions[i].n
                        delete ctrl.newPoll.questions[i].text
                        delete ctrl.newPoll.questions[i].type

                    }


                    generalPollsService.saveNewPoll(ctrl.newPoll).then(
                        response => {
                            ctrl.status = true

                            generalPollsService.idToPublicate = response.confirm
                            ctrl.spinner = false

                            $location.path('/update_poll/' + response.id)

                            // ctrl.newPoll = newPollsService.getPoll()

                            // location.reload();
                            // location.href = '/#!/polls/develop'
                        }
                    )

                }

            }
            ;
            ctrl.publicateNewPoll = function () {
                modalWindowsService.publicatePoll()
            }
            ctrl.changeType = function () {
                ctrl.stop = false
            }
            ctrl.getPolls()

            ctrl.spinner = false


            let container = angular.element(document.getElementById('poll_questions_container'));
            ctrl.gotoAnchor = function (x) {
                //
                !x ? x = '' : x = x
                let top = 100;
                let duration = 2000; //milliseconds
                let id = 'bottom' + x
                let section = angular.element(document.getElementById(id));
                container.scrollToElementAnimated(section, 30, 500).then(function () {
                });
            }
            ctrl.toTheTop = function () {
                container.scrollTopAnimated(0, 500)
            }

        }])
    .value('duScrollOffset', 30);
;