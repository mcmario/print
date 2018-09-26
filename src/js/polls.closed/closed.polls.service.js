app
  .service('closedPollsService', ['$http', '$location', function ($http, $location) {

    let serv = this;

serv.getClosedPolls=function(){
return $http.get(`/poll/close`)
    .then(resp=>{


        return resp.data
    })

}
      // serv.copyPoll=function(id){
      //     return $http.get(`/copy_poll/`+id)
      //         .then(resp=>{
      //         })
      //
      // }
  }

  ])
;