app
    .service('employeesCollisionService', ['$http', '$location','toastsService','$route', function ($http, $location,toastsService,$route) {
        let serv = this;
        serv.getData = function () {
           let url= $location.path().split('/')[3]
            return $http.get('/api/collisions/user/'+url)
                .then(
                    (response) => {
                        return response.data;
                    },
                    response => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                );
        };
        serv.saveDataUpdated=function(url,data){

            $http.post('/api/collisions/'+url, data)
                .then(
                    resp => {
                        // form.$setPristine();
                        toastsService.toastEditSucMsg();
                        $route.reload()
                        return resp;
                    },
                    resp => {
                        toastsService.toastEditErrorMsg();
                        return resp;
                    }
                )
        };


    }
    ])
;