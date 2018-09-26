app
  .controller('currEmployeePollsViewCtrl', ['$scope', '$builder', 'pollsService', 'currentEmployeeService',
    function ($scope, $builder, pollsService, currentEmployeeService) {
      let ctrl = this;
//       $scope.$on('$destroy', function () {
//         // При руйнуванні контроллеру, видалення темплейту форми з сервісу плагіна для побудови форм
//         pollsService.deleteFormTemplate();
//       });
//
//       ctrl.init = (formTemplate) => {
//         $scope.formTemplate = formTemplate;
//         //завантаження темплейту форми в сервіс плагіна для подальшого його додання в темплейт
//         pollsService.genetateEmptyForm(formTemplate);
//         // $builder.forms.default = formTemplate;
//         //TODO зганеруванти урл для отримання відповідей за конкретним темплейтом форми
//         ctrl.urlToGetFormAnswers = 'http://localhost:3000/answers_on_baseForm';
//         currentEmployeeService.getData(ctrl.urlToGetFormAnswers)
//           .then(
//             formAnswers => {
//               // answersInsert підставляється в темплейт
//               // $scope.answersInsert = pollsService.fillingForm(formAnswers);
//               $scope.answersInsert = formAnswers;
//             }
//           );
//       };
//
//       ctrl.$onInit = function () {
//         //TODO зганеруванти урл для отримання темплейту форми
//         ctrl.urlToGetFormTemplate = 'http://localhost:3000/baseForm';
//         currentEmployeeService.getData(ctrl.urlToGetFormTemplate)
//           .then(formTemplate => {
//             ctrl.init(formTemplate);
//           });
//       };
//
//       // Подія для завершення перегляду опитування та переходу до списку опитувань
//       ctrl.backToPolls = () => {
//         $scope.$parent.$emit('hidePoll', false);
//       };
//     }])
//
// /*.controller('currEmployeePollsViewCtrl', ['$scope', 'pollsService', 'currentEmployeeService',
//   function ($scope, pollsService, currentEmployeeService) {
//     let ctrl = this;
//     $scope.$on('$destroy', function () {
//       // При руйнуванні контроллеру, видалення темплейту форми з сервісу плагіна для побудови форм
//       pollsService.deleteFormTemplate();
//     });
//
//     ctrl.init = (formTemplate) => {
//       $scope.formTemplate = formTemplate;
//       //TODO зганеруванти урл для отримання відповідей за конкретним темплейтом форми
//       ctrl.urlToGetFormAnswers = 'http://localhost:3000/answers_on_baseForm';
//       currentEmployeeService.getData(ctrl.urlToGetFormAnswers)
//         .then(
//           formAnswers => {
//             $scope.answersInsert = formAnswers;
//           }
//         );
//     };
//
//     ctrl.$onInit = function () {
//       //TODO зганеруванти урл для отримання темплейту форми
//       ctrl.urlToGetFormTemplate = 'http://localhost:3000/baseForm';
//       currentEmployeeService.getData(ctrl.urlToGetFormTemplate)
//         .then(formTemplate => {
//           ctrl.init(formTemplate);
//         });
//     };
//
//     // Подія для завершення перегляду опитування та переходу до списку опитувань
//     ctrl.backToPolls = () => {
//       $scope.$parent.$emit('hidePoll', false);
//     };





  }])
;