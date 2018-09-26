let app = angular.module('app',
    [
        'ngRoute', 'duScroll', 'ngTouch', 'vAccordion', 'ngSanitize', 'ngAnimate', 'builder', 'builder.components',
        'validator.rules', 'ngMask', 'ngStorage', 'moment-picker', 'xeditable', 'toastr', 'wu.masonry',
        'angularMoment', 'angularLazyImg', 'naif.base64', 'ngDialog', 'monospaced.elastic'
    ])
    .config(function (toastrConfig) {
        angular.extend(toastrConfig, {
            extendedTimeOut: 5000,
            timeOut: 5000,
            positionClass: 'toast-top-right'
        });
    })
    .value('duScrollDuration', 2000)
    .value('duScrollOffset', 30)
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider

            .when('/users/new/',{

                templateUrl:'static/templates/new.user.html',
                controller:'newUserCtrl',
                controllerAs:'ctrl'
                }
            )
            .when('/employees',{

                templateUrl:'static/list.users.html',
                controller:'usersController',
                controllerAs:'ctrl'
                }
            )





            .when('/notes/', {
                templateUrl: 'static/templates/notes.html',
                controller: 'notesController',
                controllerAs: 'ctrl',
            })
            .when('/administrating/', {
                templateUrl: 'static/templates/administrating.html',
                controller: 'administratingGeneralCtrl',
                controllerAs: 'ctrl',
            })
            .when('/sync/', {
                templateUrl: 'static/templates/component.list.people.collisions.html',
                controller: 'employeesCompareController',
                controllerAs: 'ctrl',
            //     resolve: {
            //
            //     collisionList: ['employeesCompareService', function (employeesCompareService) {
            //
            //
            //
            //
            //         return employeesCompareService.getCompareList().then(
            //             function (response) {
            //
            //
            //
            //                 return response.data
            //             }
            //         )
            //
            //     }]
            //
            // }
    })
    // .when('/sync/person/:identify', {
    //         templateUrl: 'static/templates/component.curr.employee.comparison2.html',
    //         controller: 'currEmployeeCollisions',
    //         controllerAs: 'ctrl',
    //
    //
    //     })


            // .when('/polls/develop', {
            //     templateUrl: 'static/templates/polls.develop.html',
            //     controller: 'developPollsController',
            //     controllerAs: 'ctrl',
            //     // resolve: {
            //     //     employee: ['developPollsService', function (developPollsService) {
            //     //
            //     //
            //     //         return developPollsService.getDevelopPolls();
            //     //     }]
            //     // }
            //
            // })
            .when('/polls/active', {
                templateUrl: 'static/templates/polls.active.html',
                controller: 'activePollsController',
                controllerAs: 'ctrl',
                // resolve: {
                //     employee: ['activePollsService', function (activePollsService) {
                //
                //
                //         return activePollsService.getActivePolls();
                //     }]
                // }
            })
            .when('/polls/closed', {
                templateUrl: 'static/templates/polls.closed.html',
                controller: 'closedPollsController',
                controllerAs: 'ctrl',
                // resolve: {
                //     employee: ['closedPollsService', function (closedPollsService) {
                //
                //
                //         return closedPollsService.getClosedPolls();
                //     }]
                // }
            })
            .when('/polls/new', {
                templateUrl: 'static/templates/polls.new.html',
                controller: 'newPollsController',
                controllerAs: 'ctrl',
                resolve: {}
            })
            .when('/polls/statistics/:identify', {
                templateUrl: 'static/templates/polls.statistics.html',
                controller: 'activePollsStatisticController',
                controllerAs: 'ctrl',
                resolve: {}
            })
            .when('/polls/new_individ', {
                templateUrl: 'static/templates/polls.new.individ.html',
                controller: 'newIndividPollsController',
                controllerAs: 'ctrl',
                resolve: {}
            })
            .when('/candidate/new_individ', {
                templateUrl: 'static/templates/polls.new.individ.html',
                controller: 'newIndividPollsController',
                controllerAs: 'ctrl',
                resolve: {}
            })


            .when('/update_poll/:identify', {
                templateUrl: 'static/templates/polls.new.html',
                controller: 'newPollsController',
                controllerAs: 'ctrl',
            })
            .when('/polls/poll', {
                templateUrl: 'static/templates/poll.html',
                controller: 'empPollsController',
                controllerAs: 'ctrl',
            })

            .when('/candidate/new/', {
                templateUrl: 'static/templates/employee.new.html',
                controller: 'newUserController',
                controllerAs: 'ctrl',
            })

            .when('/candidate/:employeesType', {
                templateUrl: 'static/templates/employees.html',
                controller: 'employeesController',
                controllerAs: 'ctrl',
                // resolve: {
                //     employeesList: ['employeesService', function (employeesService) {
                //
                //         return employeesService.getListByType()
                //             .then(function (response) {
                //                     return response.data
                //
                //
                //                 },
                //                 function (response) {
                //                     window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                //                 }
                //             );
                //     }]
                // }
            })
            .when('/candidate/:employeesType/:identify', {
                templateUrl: 'static/templates/curr.employee.html',
                controller: 'currentEmployeeController',
                controllerAs: 'ctrl',
                reloadOnSearch: false,
                // resolve: {
                //     employee: ['currentEmployeeService', function (currentEmployeeService) {
                //
                //
                //         return currentEmployeeService.getEmployee()
                //     }]
                // }
            })
            // .when('/employees/new/', {
            //     templateUrl: 'static/templates/employee.new.html',
            //     controller: 'newUserController',
            //     controllerAs: 'ctrl',
            // })

            .when('/employees/:employeesType', {
                templateUrl: 'static/templates/employees.html',
                controller: 'employeesController',
                controllerAs: 'ctrl',
                // resolve: {
                //     employeesList: ['employeesService', function (employeesService) {
                //
                //         return employeesService.getListByType().then(function (response) {
                //
                //
                //
                //                 return response.data
                //
                //
                //             },
                //             function (response) {
                //
                //                 window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
                //             }
                //         );
                //
                //
                //     }]
                // }
            })
            .when('/employees/:employeesType/:identify', {
                templateUrl: 'static/templates/curr.employee.html',
                controller: 'currentEmployeeController',
                controllerAs: 'ctrl',
                reloadOnSearch: false,
                // resolve: {
                //     employee: ['currentEmployeeService', function (currentEmployeeService) {
                //
                //
                //         return currentEmployeeService.getEmployee().then(
                //             function (response) {
                //                 if (response === 'False') {
                //                     $location.path('error')
                //                 }
                //                 else return response
                //             })
                //
                //     }]
                // }
            })

            .when('/error/', {
                templateUrl: 'static/templates/message.html',
                controller: 'errorController',
                controllerAs: 'ctrl',
            })


            .when('/', {
                redirectTo: '/employees/active'
            })
            .otherwise({
                redirectTo: '/error/'
            });
    }])
;