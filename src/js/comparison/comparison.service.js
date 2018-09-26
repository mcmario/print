app
  .service('employeesCompareService', ['$http', '$location','toastsService', function ($http, $location,toastsService) {

    let serv = this;

      serv.getCompareList = function () {

          return $http.get(`/api/synchronize/get`)
              .then(resp => resp);
      };
      serv.getData = function (url) {
          return $http.get(url)
              .then(
                  response => response.data,
                  response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
              );
      };


        serv.startSync=function(){

            return $http.get(`/api/synchronize`)
                .then((resp) => {
                    toastsService.syncEnd()
return  resp

                })
                .then(
                    // location.reload()
                )
        };

      serv.toggleNotes = function () {
          RootFactory.set('notesStatus', !RootFactory.get('notesStatus'));
      };


  }
  ])
;