app
  .run(['$rootScope', '$location','$anchorScroll', 'RootFactory', ($rootScope, $location,$anchorScroll, RootFactory) => {
    function disableOnRoutes() {
      let pages = ['testing', 'farewell', 'greeting', 'error'];
      let route = $location.path();
      let array = pages.filter((path) => {
        return route.search(path) > 0
      });
      return array.length;
    }
// $anchorScroll.yOffset = 50;
    $rootScope.$on('$routeChangeStart', () => {
      $rootScope.testingMode = disableOnRoutes();
      // RootFactory.set('visibleSidebar', !$rootScope.testingMode);
    });
  }])

  .run(function (amMoment) {
    amMoment.changeLocale('uk');
    // amMoment.add(2, 'h')

  })

  .run(function (editableOptions, editableThemes) {
    editableOptions.theme = 'default';
    editableThemes['default'].submitTpl = '<button type="submit">ok</button>';
    editableThemes['default'].inputTpl = '<button type="submit">ok</button>';
  })
;