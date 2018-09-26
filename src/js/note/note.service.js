app
    .service('noteService', ['$http', '$q', '$route', 'toastsService', 'modalWindowsService', 'notesService', function ($http, $q, $route, toastsService, modalWindowsService, notesService) {
        let serv = this;
        serv.note = {}

        serv.noteToEdit = (note) => {
            serv.note = note
        }


        serv.checkPerson = (note, listByType) => {
            if (note.type.value === 'else') {
                return true;
            }
            if (!listByType && !note.person) {
                return false;
            } else {
                for (let i of listByType) {
                    if (note.person === i.displayName) {
                        return true;
                    }
                }
            }
            return false;
        };

        serv.getNoteTextHeight = () => {
            let noteTextHeight = document.getElementsByClassName('note_wrapper active')[0].getElementsByClassName('note_text')[0].offsetHeight;
            return noteTextHeight;
        };

        serv.setNoteTextHeight = (textAreaHeight) => {
            if (textAreaHeight) {
                document.getElementsByClassName('note_wrapper active')[0].getElementsByTagName('textarea')[0].style.height = `${textAreaHeight + 5}px`;
            }
        };

        serv.updateNote = function (note) {
            $http.put(`/api/update/notes`, note)
                .then(function () {
                    toastsService.dataUpdate()
                }, function () {
                    toastsService.editErrorMsg();
                });
        };

        // serv.deletingNote = modalWindowsService.deleteNote;

        serv.deleteNoteConfirm = (id) => {

            return $http.delete('/api/notes/delete/' + id).then(resp => {
                toastsService.vacationsChange("Нотатку", 'успішно видалено')
                return resp

                // $route.reload()

            })
        }
    }])
;
