app
    .service('controlMenuService', ['$location', '$http', '$q', 'RootFactory', 'modalWindowsService', 'toastsService',
        function ($location, $http, $q, RootFactory, modalWindowsService, toastsService) {
            let serv = this;
            serv.checkSavingModal = modalWindowsService.checkSavingModal;
            serv.statusWorker = function () {
                if ($location.path().indexOf('candidate') >= 0) {
                    return true
                }
                else {
                    return false
                }
            }

            serv.checkHash = pane => {
                return parseInt($location.hash() || 1) !== pane;
            };
            serv.saveList = (url) => {
                $http.get(url).then(resp => {
                    toastsService.customMessageSuc("Звіт по працівниках", "успішно свормовано")
                    return resp
                })
            }
            serv.changePane = function (activatePane) {
                $location.hash(activatePane);
            };

            serv.checkFormInfo = formInfo => formInfo && typeof formInfo === 'object' ? formInfo.$dirty : false;

            // serv.scrollOnHover = function () {
            //   let element = document.getElementsByClassName('tabs_container')[0];
            //   element.addEventListener('mousemove', function (e) {
            //     let l = element.clientWidth;
            //     let percent = e.clientX / l;
            //     element.scrollLeft = l * percent - l + e.clientX;
            //   });
            // };

            serv.hideEmptyNotes = function () {
                if (RootFactory.get('notesStatus') == true) {
                    RootFactory.set('notesStatus', false)
                }

            }
            serv.toggleNotes = function () {

                RootFactory.set('notesStatus', !RootFactory.get('notesStatus'));

            };


            serv.displayNotes = function () {

                return RootFactory.get('notesStatus');
            };

            serv.sidebarVisible = function () {
                return RootFactory.get('visibleSidebar');
            };

            serv.getCities = () => {
                let x = new Date().getTime()
                return $http.get(`/api/city_list`)
                    .then(resp => {
                        let y = new Date().getTime()
                        return resp.data
                    });
            };
            serv.getDepartments = function () {
                if (serv.statusWorker()) {
                    return $http.get('/api/admin/department')
                        .then(
                            function (response) {
                                return response.data;
                            }
                        );
                }
                else {
                    let status = ''
                    if ($location.path().indexOf('active') >= 0) {
                        status = '/active'
                    }
                    else if ($location.path().indexOf('dismissed') >= 0) {
                        status = '/dismissed'
                    }
                    return $http.get('/api/department' + status)
                        .then(
                            function (response) {
                                return response.data;
                            }
                        );
                }
            };
            serv.getUsersAll = function (status) {
                if (serv.statusWorker()) {
                    return $http.get(`/api/candidate/` + status + ``)
                        .then(function (response) {
                            return response;
                        })
                } else {
                    // let testRequest = serv.getRouteParams();
                    return $http.get(`/api/employees/` + status + ``)
                        .then(function (response) {
                            return response;
                        });
                }


            };
            serv.getUsersCity = function (city, status) {
                return $http.get('/users/city=' + city + '&status=' + status)
                    .then(function (response) {
                        return response;
                    });
            };
            serv.getUsersDep = function (dep, status) {
                return $http.get('/users/dep=' + dep + '&status=' + status)
                    .then(function (response) {
                        return response;
                    });
            };

            serv.getUsersByDepCity = function (dep, city, status) {
                return $http.get('/users/dep=' + dep + '&city=' + city + '&status=' + status)
                    .then(function (response) {
                        return response;
                    });
            };


            //Вкладки  у списку працівників
            serv.togglePanes = (state) => {
                let panes = angular.element(document).find('.component_list_people_person');
                state ? panes.addClass('active') : panes.removeClass('active');
            };
        }])
;