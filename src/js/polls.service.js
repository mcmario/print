app
  .service('pollsService', ['$builder', '$validator', '$http', function ($builder, $validator, $http) {
    let serv = this;
    /*
        serv.genetateEmptyForm = function (formTemplate, formName = 'default') {
          for (let i in formTemplate) {
            if (formTemplate[i].id) {
              formTemplate[i].id = i;
              $builder.addFormObject(formName, formTemplate[i]);
            }
          }
        };

        serv.fillingForm = (answers) => {
        let temp = [];
          for (let i in answers) {
            if (answers[i].hasOwnProperty('value'))
              temp[`${i}`] = answers[i].value;
          }
          return temp;
        };
    */

    //завантаження темплейту форми в сервіс плагіна для подальшого його додання в темплейт
    serv.genetateEmptyForm = (questionsArray, formName = 'default') => {
      //formName - значення (ключ) темплейту форми в сервісі плагіна
      questionsArray.forEach(item => $builder.addFormObject(formName, item));
    };

    // формування масиву відповідей для подальшого його заповнення в темплейт
    serv.fillingForm = answersArray => answersArray.map(item => item.value);
/*    serv.fillingForm = answersArray => {
      let temp = [];
      for (let i in answersArray) {
        if (answersArray[i].hasOwnProperty('value')) {
          temp[`${i}`] = answersArray[i].value;
        }
      }
      return temp;
    };*/

// Видалення темплейту форми з сервісу плагіна для побудови форм
    serv.deleteFormTemplate = (formName = 'default') => $builder.forms[`${formName}`] = undefined;
  }])
;