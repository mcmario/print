app
    .controller('sidebarCompCtrl', ['$scope', '$location', 'RootFactory', '$routeParams' , function ($scope, $location, RootFactory, $routeParams) {

        let ctrl = this;
        ctrl.showLogo = true
        $scope.toggleSidebar = function () {
            ctrl.showLogo = !ctrl.showLogo
            RootFactory.set('visibleSidebar', !RootFactory.get('visibleSidebar'));
        };
        ctrl.getParentPath = () => {
            let pathArray = ($location.path()).split('/');
            return pathArray[1];
        };
        ctrl.showSideBar = function () {
            RootFactory.set('visibleSidebar', true);
        }
        ctrl.changeUrl = (x) => {
            $location.path(x)
        }
        ctrl.openSidebarPane = () => {
            for (let i of ctrl.accordionList) {
                if (i.name === $scope.activeLinks.parent) {
                    return i.name;
                } else if (i.url === $scope.activeLinks.parent) {
                    return i.url;
                }
            }
        };

        ctrl.$onInit = function () {


            $scope.activeLinks = {
                parent: ctrl.getParentPath(),
                child: $routeParams.employeesType,
            };

            ctrl.accordionList = RootFactory.routingMap;

            //
            // $scope.$on('sidebarAccordion:onReady', function () {
            //     // setTimeout(() => {
            //     //   // $scope.sidebarControl.expand(ctrl.openSidebarPane());
            //     //   // $scope.sidebarControl.toggle(ctrl.openSidebarPane());
            //     //   $scope.$apply();
            //     // }, 1000);
            // });
        };
    }])
;