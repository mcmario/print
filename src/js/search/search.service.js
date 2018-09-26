app
  .service('searchCompService', ['$http', function ($http) {

    let serv = this;
    serv.getSelectedList = (list) => {
      return $http.get(`/${list.value}`)
        .then((response) => {
          return response.data;
        }, () => {
          return false;
        });
    };


    serv.peopleLists = {
      employees: {
        name: 'Працівники',
        value: 'employeesAll'
      },
      released: {
        name: 'Звільнені',
        value: 'releasedAll'
      },
      candidates: {
        name: 'Кандидати',
        value: 'candidatesAll'
      },
      common: {
        name: 'Звичайна нотатка',
        value: 'else'
      }
    };
  }])
;