app
  .service('manualService', ['$http', '$location', function ($http, $location) {

    let serv = this;
    serv.newIndividManual={
        text:'some text for a manual',


    }



  }
  ])
;