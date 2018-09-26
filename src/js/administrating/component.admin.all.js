app
    .component('componentAdminGeneral', {
        templateUrl: 'static/templates/component.administrating.general.html',
        controller: 'administratingGeneralCtrl',
        controllerAs: 'ctrl',
        bindings: {
            person: '=',
            city: '=',
            department: '=',
            people: '=',
        }
    })
    .component('componentControlMenuAdministrating', {
        templateUrl: 'static/templates/component.list.control.menu.administrating.html',
        controller: 'administratingGeneralCtrl',
        controllerAs: 'ctrl',
        bindings: {
            displayNotes: '=',
            formInfo: '='
        }
    })


    .component('componentAdminWorkers', {
        templateUrl: 'static/templates/component.admin.workers.html',
        controller: 'administratingWorkersCtrl',
        controllerAs: 'ctrl'


    }).component('componentAdminChildren', {
        templateUrl: 'static/templates/component.admin.children.html',
        controller: 'administratingWorkersCtrl',
        controllerAs: 'ctrl'


    })
    .component('componentAdminCityBranch', {
        templateUrl: 'static/templates/component.administrating.general.html',
        controller: 'administratingCityBranchCtrl',
        controllerAs: 'ctrl'


    })

    .component('componentAdminVacations', {
        templateUrl: 'static/templates/component.admin.vacations.html',
        controller: 'administratingVacationsCtrl',
        controllerAs: 'ctrl'

    })
    .component('componentAdminVacationsPending', {
        templateUrl: 'static/templates/component.admin.vacations.pending.html',
        controller: 'administratingVacationsPendingCtrl',
        controllerAs: 'ctrl'

    })
    .component('componentAdminVacationsRests', {
        templateUrl: 'static/templates/component.admin.vacations.rests.html',
        controller: 'administratingVacationsRestsCtrl',
        controllerAs: 'ctrl'

    })
    .component('componentAdminExp', {
        templateUrl: 'static/templates/component.admin.workers.exp.html',
        controller: 'administratingExpCtrl',
        controllerAs: 'ctrl'


    })

// .component('componentAdminBranch', {
//     templateUrl: 'static/templates/component.admin.branch.html',
//     controller: 'administratingCtrl',
//     controllerAs: 'ctrl',
//
//
// })
// .component('componentAdminCities', {
//     templateUrl: 'static/templates/component.admin.cities.html',
//     controller: 'administratingCtrl',
//     controllerAs: 'ctrl'
//
//
// })

;
