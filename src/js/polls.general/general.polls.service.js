app
    .service('generalPollsService', ['$http', 'toastsService', '$route', '$location','$rootScope', function ($http, toastsService, $route, $location,$rootScope) {

        let serv = this;

        serv.formatText = function (obj) {

            for (let i in obj.question) {
                obj.question[i].text = 1+parseInt(i)+'.  '+ obj.question[i].text.replace(new RegExp('\r?\n', 'g'), '<br>')
                if (obj.question[i].type !== 'text') {
                    for (let j in obj.question[i].answers) {
                        obj.question[i].answers[j].variant?obj.question[i].answers[j].variant = obj.question[i].answers[j].variant.replace(new RegExp('\r?\n', 'g'), '<br>'):null
                    }
                }
            }
            return obj

        }


        serv.getIdForUpdate = function () {


            return $route.current.params.identify
        }

        serv.getStatistics = function () {
            serv.id = $route.current.params.identify;

            return $http.get('/statistics/' + serv.id)
                .then(response => {
                    if (response.data === "False") {

                        location.href = '/#!/error/'
                    }

                    else {
                        let statistics=serv.formatText(response.data);
                        statistics.description = statistics.description.replace(new RegExp('\r?\n', 'g'), '<br>')
                        statistics.name = statistics.name.replace(new RegExp('\r?\n', 'g'), '<br>')
                        return statistics
                    }
                })

        }

        serv.getStatisticsDepOrCity = function (type,data) {
            serv.id = $route.current.params.identify;

            return $http.get('/statistics/'+type+'/'+data+'/' + serv.id)
                .then(response => {
                    if (response.data === "False") {

                        location.href = '/#!/error/'
                    }

                    else {
                        let statistics=serv.formatText(response.data);
                        statistics.description = statistics.description.replace(new RegExp('\r?\n', 'g'), '<br>')
                        statistics.name = statistics.name.replace(new RegExp('\r?\n', 'g'), '<br>')
                        return statistics
                    }
                })

        }
        serv.getStatisticsDepAndCity = function (dept,city) {
            serv.id = $route.current.params.identify;
            return $http.get('/statistics/dep/city/'+dept+'/'+city+'/' + serv.id)
                .then(response => {
                    if (response.data === "False") {

                        location.href = '/#!/error/'
                    }

                    else {
                        let statistics=serv.formatText(response.data);
                        statistics.description = statistics.description.replace(new RegExp('\r?\n', 'g'), '<br>')
                        statistics.name = statistics.name.replace(new RegExp('\r?\n', 'g'), '<br>')
                        return statistics
                    }
                })

        }
        serv.getStatisticsFilters = function () {
            serv.id = $route.current.params.identify;
            return $http.get('/statistics/filter/' + serv.id).then((response)=>{
                return response.data})


        }
        serv.getDevelopPollsAnk = function () {
            return $http.get(`/anketa/list`)
                .then(resp => {

                    return resp.data
                })

        }
        serv.copyPoll = function (id, name) {

            return $http.get(`/copy_poll/` + id)
                .then(resp => {
                    toastsService.copyPoll(name);
                })

        };
        // serv.data1ToDel=''
        // serv.data2toDel=''
        // serv.dataToDel=function (data,data2) {
        //     serv.data1ToDel=data
        //     serv.data2toDel=data2
        // };

        serv.deletePoll = function (data1,data2) {

            return $http.delete(`/delete_poll/` + data1)
                .then(response => {
                    toastsService.deletePoll(data2);
                    $route.reload()

                })

        };
        serv.saveNewPoll = function (data) {
            return $http.post(`/save_poll`, data)
                .then(response => {
                    toastsService.savePoll(name);

                    serv.id=response.data
                    let obj={
                        id:serv.id,
                        confirm:true
                    }
                    return obj


                })
        }
        serv.pollUpdate = function (id) {

            return $http.get(`/update_poll/` + id)
                .then(response => {
                    if (response.data === "False") {
                        location.href = '/#!/error/'
                    }

                    else {
                        return serv.formatText(response.data)
                    }
                })


        }
        serv.closePoll = function (id) {
            return $http.get(`/update_status_close/` + id)
                .then(response => {
                    toastsService.finishPoll();

                })
        };
        serv.id = ''
        serv.saveId = function (x) {
            serv.id = x
        };

        serv.publicatePolls = function ( data) {
            $rootScope.spinner2=true;

            if(!serv.id){
                serv.id=serv.getIdForUpdate()

            }
            toastsService.customMessageSucW('Дані відправлено на опрацювання',"це може зайняти деякий час");
            return $http.post(`/update_status_active/` + serv.id, data)
                .then(response => {
                    $rootScope.spinner2=false

                    toastsService.publicatePoll(data.poll_name);
                })
        }



        serv.tooMuch =function(){

            toastsService.customMessageEr('Перевищено ліміт копій!',  'максимум 99 копій');

        }

        serv.validatePollLength = toastsService.pollValidateLength;
        serv.pollValidateLengthText = toastsService.pollValidateLengthText;
        serv.contactWrong=toastsService.wrongContact;
    }

    ])
;