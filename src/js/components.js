app
  .component('componentCopyToClipboard', {
    template: `<button onclick="copyToClipboard(this)" ng-click="$ctrl.message()">copy</button>`,

    controller: [function () {
      let ctrl = this;
      ctrl.message = function () {
        alert('Copied!');
      };
    }]
  })

  .component('currentEmployeePerson', {
    template:
      `
        <p class="note_author current_employee_person">
        <img class="note_author_thumbnail" src='https://phonebook.busmarket.ua/user/thumbnail/{{::$ctrl.data.email}}'
             alt="">
        <span class="note_author_name">
        {{::$ctrl.data.sname}} {{::$ctrl.data.name}} {{::$ctrl.data.midlename}}
        </span>
        <br>
        <span class="note_author_updated" ng-if="::$ctrl.data.type=='ready'||::$ctrl.data.type=='reserve'||::$ctrl.data.type=='rejected' ">{{::$ctrl.data.department}}, {{::$ctrl.data.position}}</span>
      </p>
      `,
    bindings: {
      data: '='
    }
  })
;