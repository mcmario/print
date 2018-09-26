app
  .service('listVacanciesCompService', ['RootFactory', 'toastsService', '$route', '$rootScope', '$http', '$location',function (RootFactory, toastsService, $route, $rootScope, $http, $location,) {
    let serv = this;

    serv.togglePane = ($event) => {
      let element = angular.element($event.currentTarget).parent();
      if (element.hasClass('active')) {
        element.removeClass('active');
      } else {
        element.addClass('active');
      }
    };
    serv.addNewVacancy=function(data){

        return $http.post('api/vacancy/add',data).then(
            response => {

                toastsService.vacancyAdd();
                return response;
            },
            resp => {
                toastsService.vacancyAddError();
                return resp;
            }
        )


    }

  }])

;