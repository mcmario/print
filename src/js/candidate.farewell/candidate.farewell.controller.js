app
  .controller('candidateFarewellController', [function () {
    let ctrl = this;
    ctrl.button = false;
    ctrl.farewell = true;
    ctrl.message = {
      title: 'Дякуємо!',
      description: 'З Вами зв\'яжуться найближчим часом'
    };
  }])
;