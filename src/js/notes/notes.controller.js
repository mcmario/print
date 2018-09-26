app
    .controller('notesController', ['notesService', 'employeesService', 'searchCompService', 'modalWindowsService', 'controlMenuService', '$http', '$scope', '$rootScope', '$route', '$location', 'ngDialog', function (notesService, employeesService, searchCompService, modalWindowsService, controlMenuService, $http, $scope, $rootScope, $route, $location, ngDialog) {
        let ctrl = this;
        $scope.loader = '$scope';
        ctrl.loader = 'ctrl';
        ctrl.noteButton = function () {
            let a = notesService.getTypeButton()
            return a
        }
        let emptyNote = {
            author_name: "",
            author_sname: "",
            date: "",
            emptyNote: true,
            email: null,
            id: 16,
            id_search: 1,
            name: "",
            'notes.name': "порожня нотатка",
            sname: "",
            text: "По даному працівнику у Вас відсутні нотатки. Для створення нової нотатки натисніть кнопку 'Створити нотатку' у верхній частині екрану ",
            empty: "empty"
        }


        ctrl.getNotes = function () {
            notesService.getNotes()
                .then(
                    (d) => {
                        $scope.notes = notesService.sortArray(d);
                        if ($scope.notes.length < 1) {
                            $scope.notes.push(emptyNote)
                            // controlMenuService.hideEmptyNotes()

                        }

                    },
                    (errResponse) => console.error('Error while getting notes')
                );
        };
        // ctrl.newNote = {type: ' ', text: '', id: '', name: ''};
        ctrl.getNotes();

        ctrl.updateNote = () => {
        }

        ctrl.addNote = function () {
            modalWindowsService.createNote()
        };


        $scope.$on('deletingNoteIndex', function () {
            ctrl.getNotes()
        });


    }])
;