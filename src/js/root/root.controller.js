app.controller('RootController', RootController);

RootController.$inject = ['$scope', 'RootFactory'];

function RootController($scope, RootFactory) {
  $scope.sidebarVisible = function () {
    return RootFactory.get('visibleSidebar')};

  $scope.getNoteStatus = function () {
    return RootFactory.get('noteStatus');
  };

  $scope.displayNotes = function () {
    return RootFactory.get('notesStatus');
  };


}