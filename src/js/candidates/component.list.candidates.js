// app
//   .component('componentListCandidates', {
//     templateUrl: 'static/templates/component.list.candidates.html',
//     controller: 'listCandidatesCompCtrl',
//     bindings: {
//       person: '=',
//       city: '=',
//       department: '=',
//       people: '=',
//     }
//   })
//   .controller('listCandidatesCompCtrl', ['listPeopleCompService', 'translitService', '$routeParams', '$scope', 'callsService', function (listPeopleCompService, translitService, $routeParams, $scope, callsService) {
//     let ctrl = this;
//     //
//     // ctrl.TranslitWord = (word) => new translitService.Translit(word.replace(/\s/g, '')).translit();
//     ctrl.candidateType = $routeParams.candidateType;
//     ctrl.togglePane = listPeopleCompService.togglePane;
//     ctrl.call = callsService.call;
//
//   }])
// ;
