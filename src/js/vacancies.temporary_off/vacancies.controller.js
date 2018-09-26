app
  .controller('vacanciesController', ['vacanciesService', '$scope', 'vacanciesList', function (vacanciesService, $scope, vacanciesList) {
      let ctrl=this
    $scope.vacanciesList = vacanciesList;



  }])
;