app
  .service('testingService', ['$builder', '$validator', '$localStorage', '$http', '$window', '$route', '$location', function ($builder, $validator, $localStorage, $http, $window, $route, $location) {
    let serv = this;

    serv.localStorage = $localStorage.$default({});
    serv.pollInfo = {};
    serv.arrayOfPolls = {};
    serv.scrollToTop = function (reloadPage = true, scrollDuration = 1000) {
      let element = document.getElementsByClassName('content')[0];
      let scrollInterval =
        setInterval(function () {
          if (element.scrollTop > 0) {
            element.scrollTop = element.scrollTop - 50;
          }
          else {
            clearInterval(scrollInterval);
            // if (reloadPage) {
            //   setTimeout(() => $route.reload(), 200);
            // }
          }
        }, element.scrollTop / scrollDuration);

    };

    // Повертає перше опитування в масиві опитувань, відповіді якого не записані в localStorage
    serv.getCurrPoll = (objects, localStorage = serv.localStorage) => {
      let keys = Object.keys(objects);
      for (let i of keys) {
        if (localStorage[i] === undefined)
          return {
            key: i,
            questions: objects[i]
          };
      }
      serv.sendAnswers(objects);
    };

    serv.getRouteParams = () => $route.current.params.testName;

    serv.getPolls = function () {
      let testRequest = serv.getRouteParams();
      return serv.arrayOfPolls[testRequest] || $http.get(`/${testRequest}`)
        .then(
          (response) => {
            serv.pollInfo[testRequest] = {
              greeting: response.data.greeting,
              farewell: response.data.farewell,
            };
            serv.arrayOfPolls[testRequest] = {
              polls: response.data.questions,
              pollsType: testRequest
            };
          },
          (response) => window.confirm('Помилка завантаження сторінки. Спробувати ще раз?') ? $route.reload() : $location.path('error')
        );
    };

    serv.buildEmptyFormTemplate = function (poll) {
      let questions = poll ? poll.questions ? poll.questions : false : false;
      if (questions) {
        let formName = poll.key || 'default';
        for (let i in questions) {
          questions[i].id = i;
          $builder.addFormObject(formName, questions[i]);
        }
      }
    };


    serv.sendAnswers = (objects, localStorage = serv.localStorage) => {
      let answers = {};
      let keys = Object.keys(objects);
      for (let i of keys) {
        answers[i] = localStorage[i];
      }
      let testRequest = serv.getRouteParams();
      $http.post(`/answers/`, answers)
        .then(
          function (response) {
            $localStorage.$reset();
            $location.path('/farewell/' + testRequest);
          },
          function (response) {
          }
        );
    };


    serv.submitAnswers = (scope, pollKey, answers) => {


      return $validator.validate(scope, pollKey)

        .success(function () {
          serv.localStorage[pollKey] = answers;
          serv.scrollToTop();
          return console.log('success');
        })

        .error(function () {
          return false;
        });
    };
  }])
;