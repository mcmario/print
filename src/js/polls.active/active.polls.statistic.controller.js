app
    .controller('activePollsStatisticController', ['activePollsService', 'generalPollsService', 'modalWindowsService', '$scope', function (activePollsService, generalPollsService, modalWindowsService, $scope) {
        let ctrl = this
        ctrl.spinner = false
        ctrl.statisticCity = 'Усі міста'
        ctrl.statisticDepartment = 'Усі відділи'
        $scope.statFilters = {}


        ctrl.clearFilters = () => {
            ctrl.statisticCity = 'Усі міста'
            ctrl.statisticDepartment = 'Усі відділи'
            ctrl.filterBy()
        }
        ctrl.filterBy = () => {
            ctrl.spinner = true
            if (ctrl.statisticCity === 'Усі міста' && ctrl.statisticDepartment === 'Усі відділи') {
                ctrl.$onInit()
                ctrl.spinner = false
            }
            else if (ctrl.statisticCity == 'Усі міста' && ctrl.statisticDepartment !== 'Усі відділи') {
                generalPollsService.getStatisticsDepOrCity('dep', ctrl.statisticDepartment).then(response => {
                    $scope.statistics = ctrl.statisticsRefactor(response);

                    ctrl.spinner = false
                })

            }
            else if (ctrl.statisticCity !== 'Усі міста' && ctrl.statisticDepartment === 'Усі відділи') {
                generalPollsService.getStatisticsDepOrCity('city', ctrl.statisticCity).then(response => {
                    $scope.statistics = ctrl.statisticsRefactor(response);

                    ctrl.spinner = false
                })
            }
            else if (ctrl.statisticCity !== 'Усі міста' && ctrl.statisticDepartment !== 'Усі відділи') {
                generalPollsService.getStatisticsDepAndCity(ctrl.statisticDepartment, ctrl.statisticCity).then(response => {
                    $scope.statistics = ctrl.statisticsRefactor(response);
                    ctrl.spinner = false
                })


            }


        }


        ctrl.getCityStatistics = function (city) {
            generalPollsService.getStatistics(city).then(response => {
                $scope.statistics = ctrl.statisticsRefactor(response)
            })

        }

        ctrl.printStatistics = (data) => {
// let dataS= document.getElementById('statistics').innerHTML
            let dataT = '' +
                '<h2>' + data.name + '   </h2> ' +
                '<h3>' + data.description + '</h3>' +
                '<h4>кількість респондентів ' + data.people + ' , ' + 'з них ' + data.people_finish + ' закінчили опитування </h4>'
                + '<h3>Запитання та відповіді:</h3><table>'
            for (i in data.question) {
                let quest = ''
                let q = data.question[i]
                let type = ''
                q.type === 'text' ? type = 'Текстове запитання' : q.type === 'radio' ?  type ='Запитання з одним варіантом' : q.type === 'check' ? type = 'Запитання з декількома варіантами' : null
                quest = '<tr><td colspan="5"><strong>' + q.text + ' </strong> </td></tr><tr><td colspan="5">(' + type + ')</td></tr>';
                for (j in q.answers) {
                    if (q.type === 'text') {
                        quest += '<tr><td colspan="5">' + q.answers[j] + '</td>  </tr>   '
                    }
                    else {
                        quest += '<tr><td colspan="3">' + q.answers[j].variant + ' </td><td>' + q.answers[j].count + '/' + data.people_finish + '</td><td>' + q.answers[j].progres + '  </td></tr> '
                    }
                }
                dataT += quest
            }
            dataT += '</table>'
            let wnd = window.open('')
                wnd.document.write(dataT)
            wnd.print()
            wnd.close()


        }
        ctrl.$onInit = function () {
            ctrl.statisticCity = 'Усі міста'
            ctrl.statisticDepartment = 'Усі відділи'
            generalPollsService.getStatistics().then(response => {

                $scope.statistics = ctrl.statisticsRefactor(response);
                generalPollsService.getStatisticsFilters().then((resp) => {

                    $scope.statFilters = resp


                })
            })

        };
        ctrl.statisticsRefactor = function (obj) {
            for (let i in obj.question) {
                if (obj.question[i].type !== 'text') {
                    for (let j in obj.question[i].answers) {
                        if (isNaN(obj.question[i].answers[j].count / obj.people_finish) || obj.question[i].answers[j].count / obj.people_finish == 'Infinity') {
                            obj.question[i].answers[j].progres = '0%'
                        } else {
                            obj.question[i].answers[j].progres = (obj.question[i].answers[j].count / obj.people_finish * 100).toFixed(1) + '%';
                        }
                        if (parseFloat(obj.question[i].answers[j].progres) <= 30) {
                            obj.question[i].answers[j].color = '#b23b38'
                        } else if (parseFloat(obj.question[i].answers[j].progres) > 30 && parseFloat(obj.question[i].answers[j].progres) < 60) {
                            obj.question[i].answers[j].color = '#447cc0'
                        } else if (parseFloat(obj.question[i].answers[j].progres) >= 60) {
                            obj.question[i].answers[j].color = '#48ba95'
                        }


                    }

                }

            }

            return obj
        };
        ctrl.$onInit()


    }])
;