app
  .service('activePollsService', ['$http', '$location', function ($http, $location) {

    let serv = this;

      serv.getActivePolls=function(){
          return $http.get(`/poll/active`)
              .then(resp=>{
                  return resp.data
              })

      }
      serv.getActivePollsAnk=function(){
          return $http.get(`/anketa/list`)
              .then(resp=>{
                  return resp.data
              })

      }

  }

  ])
;