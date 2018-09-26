app
    .component('componentListVacancies', {
        templateUrl: 'static/templates/component.list.vacancies.tenporary_off.temporery_off.html',
        controller: 'listVacanciesCompCtrl',
        bindings: {
            person: '=',
            city: '=',
            department: '=',
            people: '=',
        }
    })
    .controller('listVacanciesCompCtrl', ['listVacanciesCompService', 'vacanciesService', 'translitService', '$routeParams', '$location', '$scope', 'callsService', function (listVacanciesCompService, vacanciesService, translitService, $routeParams, $location, $scope, callsService) {
        let ctrl = this;

        ctrl.getVacancyDetail = function (id, index) {



            vacanciesService.getVacancyDetails(id).then(response => {

                $scope.vacanciesList[index]=Object.assign($scope.vacanciesList[index],response)



            })


        }
        ctrl.deleteVacancy=function (id) {
            vacanciesService.deleteVacancy(id).then(function (response) {
                    ctrl.getVacansiesList()



                },

            );
        }
        ctrl.changeVacancyStatus=function(id){
            vacanciesService.changeVacancyStatus(id).then(function (response) {
                    ctrl.getVacansiesList()



                },

            );
        }
        ctrl.getVacansiesList = function () {
            let type = $location.path()
            vacanciesService.getListByType()
                .then(function (response) {

                        for (let i in response.data) {
                            response.data[i].date_created = new Date().toISOString().slice(0, 10)
                        }
                        $scope.vacanciesList = response.data
                        $scope.vacanciesList = response.data


                    },
                    function (response) {
                        window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                    }
                );


        };

        ctrl.addVacancyBut = function () {
            ctrl.newVacancy = {}
            ctrl.addNewVacancy = true

        };


        ctrl.addVacancy = function () {
            listVacanciesCompService.addNewVacancy(ctrl.newVacancy).then(resp => {
                ctrl.getVacansiesList()

            })
        };


        ctrl.getVacansiesList()
        ctrl.vacanciesType = $routeParams.vacanciesType;
        ctrl.togglePane = listVacanciesCompService.togglePane;
        ctrl.call = callsService.call;

    }])
;
