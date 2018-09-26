app.controller('notesNewController', ['notesService', 'employeesService', 'searchCompService', 'modalWindowsService', 'controlMenuService', '$http', '$scope', '$rootScope', '$location', '$route', 'ngDialog', function (notesService, employeesService, searchCompService, modalWindowsService, controlMenuService, $http, $scope, $rootScope, $location, $route, ngDialog) {
    let ctrl = this;

  

        $scope.notesType = [
            {
                title: 'Працівники',
                value: 'active'
            },
            {
                title: 'Звільнені',
                value: 'dismissed'
            },
            {
                title: 'Кандидити',
                value: 'candidate'
            },
            {
                title: 'Звичайна нотатка',
                value: 'else'
            },
        ];


    $scope.newNote = {type_: ' ', text: '', id_person: '', name: ''};

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    // $scope.notesType=[]
    $scope.getNotesType=()=>{
    //     $scope.notesType = [
    //     {
    //         title: 'Працівники',
    //         value: 'active'
    //     },
    //     {
    //         title: 'Звільнені',
    //         value: 'dismissed'
    //     },
    //     {
    //         title: 'Кандидити',
    //         value: 'candidate'
    //     },
    //     {
    //         title: 'Звичайна нотатка',
    //         value: 'else'
    //     },
    // ];

    }

    $scope.chooseType = function (type) {
        if(type!='else') {
            let url = 'workers/' + type;
            employeesService.getListForNotes(url).then(
                (d) => {
                    $scope.peopleForNotes = d;
                    sortByKey($scope.peopleForNotes, 'surname')
                    let personId = parseInt($route.current.params.identify)
                    if (personId) {
                        $scope.newNote.id_person = personId

                    }
                },
                (errResponse) => console.error('Error while getting people')
            );
        }
    };
    $scope.getDefType = function () {
        let url = $location.path()
        if (url.search('active') > 0) {
            $scope.newNote.type_ = 'active'
            $scope.chooseType('active')
        } else if (url.search('dismissed') > 0) {
            $scope.newNote.type_ = 'dismissed'
            $scope.chooseType('dismissed')
        } else if (url.search('candidate') > 0) {
            $scope.newNote.type_ = 'candidate'
            $scope.chooseType('candidate')
        } else {
            $scope.newNote.type_ = 'else'

            // $scope.chooseType('else')
        }

    }
    $scope.getDefType()

    $scope.addNewNote = function () {
        $scope.newNote.type_==='else'?delete $scope.newNote.id_person:null
        notesService.sendNewNote($scope.newNote)
            .then((response) => {
                 $rootScope.$emit('deletingNoteIndex');
                 $rootScope.$broadcast('deletingNoteIndex');
                    $scope.newNote = {}
                }, (err) => {
                }
            );
    };


}]);