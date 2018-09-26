app
  .service('employeesService', ['$http', '$location', function ($http, $location) {

    let serv = this;


    serv.getListType = () => $location.path();
    serv.getListForNotes=function(url){
        return $http.get(`/`+url)
            .then(resp => resp.data);
    }
    serv.getListByType = function () {
      let listType = (serv.getListType());


      return $http.get(`/api${listType}`)
        .then(resp =>{
            return resp
        });
    };



  }
  ])
;