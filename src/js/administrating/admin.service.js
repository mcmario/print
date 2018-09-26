app
    .service('administratingService', ['$location', '$http', '$q', 'RootFactory', 'modalWindowsService', 'toastsService',
        function ($location, $http, $q, RootFactory, modalWindowsService, toastsService) {
            let serv = this;
            serv.FullList = {}

            serv.getBranches = function () {
                return $http.get(`/api/admin/branch`)
                    .then(resp => resp.data);

            }
            serv.getByPeriod = function (x) {
                return $http.post(`/api/admin/vacation/by_period`, x)
                    .then(resp => resp.data);

            }
            serv.changeDepStatus = function (id, status, type) {
                let newStatus = ''
                let newType = ''
                status === 'active' ? newStatus = 'not active' : newStatus = 'active';
                type === 'філіал' ? newType = 'branch' : type === 'департамент' ? newType = 'deparatment_list' : null
                return $http.post('/api/admin/' + newType + '/' + id + '/' + newStatus)

                    .then(resp => {

                        if (resp.data == 'ok') {
                            toastsService.customMessageSuc('Статус ' + type + 'у', 'успішно змінено')
                            return resp.data
                        } else {
                            toastsService.customMessageEr('Статус ' + type + 'у змінити неможливо', 'є активні працівники')
                            return resp.data
                        }


                    });

            }


            serv.getCities = function () {
                return $http.get(`/api/admin/city_list`)
                    .then(resp => resp.data);

            }
            serv.getConfirmedVacation=(id)=>{
                return $http.get('/api/vacation/confirmed/'+id).then(resp=>resp.data)
            }
            serv.getDepartments = function () {
                return $http.get(`/api/admin/departments`)
                    .then(resp => resp.data);

            }
            serv.getDepartments_list = function () {
                return $http.get(`/api/admin/deparatment_list`)
                    .then(resp => resp.data);

            }
            serv.getRegions = function () {
                return $http.get(`/api/admin/region_list`)
                    .then(resp => resp.data);

            }
            serv.getStatistics = function (url) {
                return $http.get(url)
                    .then(resp => {
                        return resp.data
                    });

            }

            serv.addNewCity = function (data) {

                return $http.post(`/api/admin/city/new`, data)
                    .then(resp => {
                        toastsService.customMessageSuc('Нове місто', "успішно додано")

                        return $http.get(`/api/admin/city_list`)
                            .then(resp => resp.data);

                    });

            }
            serv.updateCity = function (data) {
                return $http.post('/api/admin/city/update/' + data.id, data)
                    .then(resp => {
                        toastsService.customMessageSuc('Дані міста', "успішно оновлені")

                        return resp.data

                    });

            }

            serv.deleteData = function (id, type) {
                return $http.delete('/api/admin/' + type + '/delete/' + id)
                    .then(resp => {
                        toastsService.customMessageSuc('Дані', "успішно видалено")

                        return resp.data

                    });

            }

            serv.updateBranch = function (data) {

                return $http.post('/api/admin/branch/update/' + data.id, data)
                    .then(resp => {

                        toastsService.customMessageSuc('Дані філіалу', "успішно оновлені")

                        return resp.data
                    });

            }
            serv.getYears = function () {
                return $http.get(`/api/admin/vacation/period`)
                    .then(resp => resp.data);
            }
            serv.getRests = function (period) {
                return $http.get(`/api/admin/vacation/` + period)
                    .then(resp => resp.data);
            }
            serv.getRestsFull = function (url) {
                return $http.get('/api/admin/vacation' + url)
                    .then(resp => resp.data);
            }

            serv.getPendingNumber = () => {
                return $http.get('/api/vacation/count').then(resp => resp)
            }
            serv.getPEndingVacations=()=>{
                return  $http.get('/vacation/for_approval').then(resp=>resp.data)


            }

            serv.addNewBranch = function (data) {

                return $http.post(`/api/admin/branch/new`, data)
                    .then(resp => {
                        toastsService.customMessageSuc('Новий філіал', "успішно додано")
                        return resp.data

                    });

            }


            serv.getChildren=(obj)=>{
                return $http.post('/api/children',obj).then(resp=>
                {
                    return resp.data
                })
            }
            // serv.createJson = function (data) {
            //
            //     return $http.get(`/api/create_xls`, data)
            //         // .then(resp => {
            //         //     toastsService.customMessageSuc('Звіт', "успішно сформовано")
            //         //     return resp.data
            //         //
            //         // });
            //
            // }

            serv.rejectPendingVacation = () => {

            }


            //Вкладки  у списку працівників
            serv.togglePanes = (state) => {
                let panes = angular.element(document).find('.component_list_people_person');
                state ? panes.addClass('active') : panes.removeClass('active');
            };

        }])
;