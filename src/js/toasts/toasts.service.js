app
  .service('toastsService', ['toastr', function (toastr) {
    let serv = this;
    serv.editErrorMsg = () => {
      toastr.error('Помилка', 'Змін не застосовано');
    };

    serv.confirmDeleteNoteMsg = (note, emit, cancelling, form) => {
      toastr.warning(`<h5>Підтвердити видалення</h5>`, {
        allowHtml: true,
        progressBar: true,
        onHidden: null,
        onShown: null,
        onTap: () => {
          emit(note.id);
          if (cancelling) {
            cancelling(note, form);
          }
        },
      });
    };
serv.alertPeriod=function(text){
          toastr.error(text,'Некоректні дані');

      }

    serv.toastEditErrorMsg = function () {
      toastr.error('Помилка', 'Змін не застосовано');
    };
      serv.toastEditSucMsg = function () {
          toastr.success('успішно оновлені', 'Персональні дані');
      };
      serv.toastHireEmpl=function(sname){
          toastr.success('прийнято на роботу', 'Кандидата '+sname);
      }
      serv.toastHireDism=function(sname){
          toastr.success('прийнято на роботу', 'Працівника '+sname);
      }

      serv.toastChangeCandStatusSucMsg = function (status) {
          toastr.success(status, 'Кандидата переведено');
      };
    serv.toastUploadDocumentMsg = function () {
      toastr.success('Успіх!', 'Дані надіслано.');
    };
      serv.toastAddNewUserMsg = function () {
          toastr.success('Успіх!', 'Нового працівника створено.');
      };
      serv.toastAddNewCandidateMsg = function () {
          toastr.success( "і переміщено в 'активні'",'Нового кандидата створено' );
      };



      serv.toastAddEducation = function (name) {
          toastr.success('успішно додано', name);
      };
      serv.copyPoll=function () {
          toastr.success('успішно скопійовано', 'Опитування ');
      };
      serv.savePoll=function () {
          toastr.success('успішно збережено', 'Опитування ');
      };
      serv.deletePoll=function () {
          toastr.success('успішно видалено', 'Опитування ');
      };
      serv.finishPoll=function () {
          toastr.success('завершене', 'Опитування ');
      };
      serv.finishPoll=function () {
          toastr.success('Завершене', 'Опитування ');
      };
      serv.publicatePoll=function () {
          toastr.success('успішно опубліковано', 'Опитування ');
      };
      serv.pollValidateLength=function(n){
          toastr.error('недостатньо варіантів',' В запитанні '+n)
      }
      serv.pollValidateNoQ=function(){
          toastr.error('відсутні запитання','В опитуванні')

      }
      serv.pollValidateLengthText=function(n){
          toastr.error('занадто коротке',' Запитання '+n)
      }
      serv.wrongContact=function(){
          toastr.error('введені некоректно','Контактні дані ')

      }
      serv.alertFileSize=function(){
          toastr.error('виберіть менший файл','Розмір файлу більший 3mb')

      }
      serv.alertFileFormat=function(){
          toastr.error('Допустимі формати JPEG, JPG,PNG, PDF','Неправильний формат файлу.')

      }
      serv.wrongFormat = function (name) {
          toastr.warning(name,'Не коректний формат поля');
      };
      serv.alertVacDates=function(){
          toastr.error('Введіть інші дати','Відпустки накладаються.')

      }

      serv.alertFileSizeOk=function(){
          toastr.success('вибрано','Файл')

      }
      serv.deleteData=function () {
          toastr.success('Успішно видалено', 'Дані');
      };
      serv.customMessageEr=function(text1,text2){
          toastr.error(text2,text1)
      }
      serv.customMessageWarn=function(text1,text2){
          toastr.warning(text2,text1)
      }
      serv.customMessageSucW=function(text1,text2){
          toastr.warning(text2,text1)
      }
      serv.vacationsChange =function(text1,text2){
          toastr.success(text2,text1)
      }
      serv.customMessageSuc=function(text1,text2){
          toastr.success(text2,text1)
      }
      serv.c=function (text,text2) {
          toastr.success(text2, text);
      };

      serv.toastEmptyField = function (name) {
          toastr.error( name, ' Поле не заповнене');
      };
      serv.emptyFieldError = function (name) {
          toastr.error( name, 'Порожнє поле:');
      };
      serv.syncEnd=function(){
          toastr.success('успішно завершена', 'Синхронізація');
      };
      serv.newNoteAdd=function(){
          toastr.success('успішно додано', 'Нотатку');
      };
      serv.newNoteSave=function(){
          toastr.success('успішно збережено', 'Нотатку');
      };
      serv.newNoteAddError=function(){
          toastr.error('нотатку не додано', 'Помилка');
      };
      serv.dataSaved=function(){
          toastr.success('успішно збережено','Дані')
      };
      serv.dataUpdate=function(){
          toastr.success('успішно оновлено','Дані')
      };
      serv.vacancyAdd=function(){
          toastr.success('успішно додана','Нова вакансія')
      };
      serv.vacancyAddError=function(){
          toastr.error('не додана','Нова вакансія')
      };

    serv.toastErrorUploadDocumentMsg = function () {
      toastr.error('Помилка!', 'Невірний формат документу');
    };


    serv.callMobile = (to) => {
      toastr.success(`${to}`, 'Телефоную');
    };

    serv.callIp = (to) => {
      toastr.info(`${to}`, 'Телефоную');
    };

    serv.callError = () => {
      toastr.error('Помилка', 'Номер  не вказано');
    };

  }])
;