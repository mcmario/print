app
    .service('notesService', ['$http', '$q', 'toastsService', '$location', 'RootFactory', function ($http, $q, toastsService, $location, RootFactory) {

        let serv = this;


        serv.refactorNotes = function (notes) {
            for (i in notes) {
                if (notes[i].type === 'active') {
                    notes[i].typeUa = 'Працівник'
                } else if (notes[i].type === 'dismissed') {
                    notes[i].typeUa = 'Звільнений'
                } else if (notes[i].type === 'candidate') {
                    notes[i].typeUa = 'Кандидат'
                } else if (notes[i].type === 'else') {
                    notes[i].typeUa = 'Звичайна нотатка';


                }
            }
            return notes
        };
        serv.getTypeButton=function(){
            if($location.path().indexOf('notes') >= 0){
                return true
            } else return false
        }
        serv.getAllNotes = function () {
            return $http.get('/notes')
                .then(
                    function (response) {
                        return serv.refactorNotes(response.data);
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
        }
        serv.getPersonalNotes = function (id) {
            return $http.get('/api/notes/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse);
                    }
                );
        }
        serv.getNotes = function () {


            if ($location.path().indexOf('candidate') >= 0 || $location.path().indexOf('employee') >= 0) {
                serv.id = $location.path().substring(11).split('/')[1]

                if (serv.id) {
                    return serv.getPersonalNotes(serv.id)
                }
                else {
                     return serv.getAllNotes()
                }
            }
            else {
                return serv.getAllNotes()

            }
        };

        serv.deleteNote = function (noteId) {
            return $http.delete(`/api/notes/delete/${noteId}`)
                .then(resp => {
                        return resp.status;
                    }, resp => {
                        toastsService.toastEditErrorMsg();
                        return resp.status;
                    }
                );
        };

        serv.sendNewNote = function (newNote) {
            if (newNote.type === 'else') {
                newNote.id = 1
            }
            return $http.post('/api/' + newNote.id + '/notes/add', newNote)
                .then(
                    function (response) {
                        toastsService.newNoteAdd()
                        return response;
                    },
                    function (errResponse) {

                        toastsService.newNoteAddError()
                        return $q.reject(errResponse);
                    }
                );
        };

        serv.sortArray = function (array) {

            array.sort(function (a, b) {
                let c = new Date(a.date);
                let d = new Date(b.date);
                return d - c;
            });


            return array;
        };
    }])
;