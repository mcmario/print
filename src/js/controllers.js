app
  .controller('DemoController', ['$scope', '$builder', '$validator', '$http', 'rendering',
    function ($scope, $builder, $validator, $http, rendering) {
      let ctrl = this;

      $scope.rendering = rendering;

      //Масив з відповідями
      $scope.answers = [];


      let dateUTCString = '2017-10-31T16:35:00Z';

      ctrl.genetateEmptyForm = function (questionsArray, formName = 'default') {
        for (let i in questionsArray) {
          if (questionsArray[i].id) {
            questionsArray[i].id = i;
            $builder.addFormObject(formName, questionsArray[i]);
          }
        }
      };

      ctrl.fillingForm = function (answersArray) {
        for (let i in answersArray) {
          if (answersArray[i].hasOwnProperty('value'))
            $scope.defaultValue[`${i}`] = answersArray[i].value;
        }
      };

      ctrl.genetateEmptyForm($scope.rendering, 'default');
      // ctrl.fillingForm($scope.answers, 'default');

      // $scope.form - для відображення темплейту форми
      $scope.form = $builder.forms['default'];

      setTimeout(function () {
        $builder.forms.default = undefined;
        console.table($builder.forms.default);
      },1);

      $scope.submit = function () {


        return $validator.validate($scope, 'default')

          .success(function () {

            $http.post('/itForm', $builder.forms['default']);

            return console.log('success');
          })
          .error(function () {
            return console.log('error');
          });
      };
    }])
;