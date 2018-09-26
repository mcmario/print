app
  .service('listPeopleCompService', [function () {
    let serv = this;

    serv.togglePane = ($event) => {
      let element = angular.element($event.currentTarget).parent();
      if (element.hasClass('active')) {
        element.removeClass('active');
      } else {
        element.addClass('active');
      }
    };

  }])

;