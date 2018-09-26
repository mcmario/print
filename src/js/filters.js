app
  .filter('lineBreak', ['$sce', '$sanitize', function ($sce, $sanitize) {
    return function (input) {
      return !input ? '' : (() => {
        let output = input.split('');
        for (let i in output) {
          if (output[i] === '\n') {
            output[i] = '<br>';
          }
        }
        return $sanitize(output.join(''));
      })();
    };
  }])

  .filter('searchByNameSurname', function () {
    return function (contacts, personName) {
      if (!personName) {
        return contacts;
      }
      let searchRegex = new RegExp(personName, 'i');
      return contacts.filter(function (item) {
        return (searchRegex.test(item.name) || searchRegex.test(item.sname)) && item.l;
      });
    };
  })
    // .filter('nameFilter', function () {
    //   return function (item) {
    //     if(person)
    //     ctrl.people=[]
    //       for(i=0; i<item.length;i++){
    //       for (key in item[i]){
    //       if(item[i][key]==person){
    //           ctrl.people.push(item[i])
    //       }
    //       }
    //       }
    //       return ctrl.people;
    //
    //   }
    //
    // })


;