app
  .controller('candidateGreetingController', ['testingService', function (testingService) {
    let ctrl = this;
    ctrl.button = {
      title: 'Розпочати',
      url: '#!/candidate/testing/'
    };

    ctrl.routeParams = testingService.getRouteParams();
    ctrl.message = {
      title: 'Анкета претендента на вакантну посаду',
      description: `Шановний учасник опитування, просимо вас відповісти на представлені нижче питання. Ваші відповіді
      допоможуть в організації міжнародної конференції "Психологія моральності і релігія: XXI століття". Опитування має
      анонімний характер, і отримані дані будуть використані тільки в узагальненому вигляді. Відповідаючи на кожне
      питання, вибирайте один варіант відповіді (якщо в формулюванні питання не вказано інше).`
    };
  }])
;