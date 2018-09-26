app
    .component('noteComponent', {
        bindings: {
            data: '='
        },
        templateUrl: 'static/templates/component.note.html',
        controller: 'noteCompCtrl',
    })

    .controller('noteCompCtrl', ['$scope', 'RootFactory', 'noteService', '$http', '$route', '$sanitize', 'ngDialog', function ($scope, RootFactory, noteService, $http, $route, $sanitize, ngDialog) {
        let ctrl = this;
        $scope.active = undefined;

        ctrl.setNoteStatus = function (status, form, apply) {
            RootFactory.set('noteStatus', status);
            $scope.active = status;
            if (apply === true) {
                $scope.$apply();
            }
            setTimeout(() => {
                if (status) {
                    let textHeight = noteService.getNoteTextHeight();
                    form.$show();
                    noteService.setNoteTextHeight(textHeight);
                }
            }, 30);
        };

        $scope.getNoteStatus = function () {
            return RootFactory.get('noteStatus');
        };

        ctrl.editNote = (note) => {
            noteService.noteToEdit(note)

        }
        ctrl.updateNote = (note) => {
            note.date = new Date();
            ctrl.setNoteStatus(false);
            note.content = $sanitize(note.content);
            noteService.updateNote(note);
            ctrl.editionNote = false


        };

        ctrl.cancelNoteChanges = function (i) {
            // ctrl.setNoteStatus(false);
            // ctrl.data = Object.assign({}, noteService.oldNote);
            ctrl.editionNote = false
            $scope.$emit('deletingNoteIndex');


        };

        // ctrl.deletingNoteEmit = function (noteId) {
        //     $scope.$emit('deletingNoteIndex', noteId);
        // };

        ctrl.editNote = function (oldNote, status, noteForm) {
            ctrl.editionNote = true
            ctrl.setNoteStatus(status, noteForm);
            noteService.oldNote = Object.assign({}, oldNote);
        };


        ctrl.deletingNote = function (data) {

            $scope.id = data;

            ngDialog.open({
                template: '  <div class="doc_preview_modal" style="width: auto;"><div class="col-xs-12" >\n' +
                '<h3 class="text-center">Ви дісно хочете видалити нотатку?</h3>\n' +
                '<button class="btn btn-success col-xs-5 col-xs-offset-1" ng-click="deleteNoteConfirmed(id); closeThisDialog(0)">так</button>\n' +
                '<button class="btn btn-danger col-xs-5 col-xs-offset-1" ng-click="closeThisDialog(0)">ні</button>\n' +
                '</div></div>',
                appendClassName: 'material-modal delete_confirmation',

                plain: true,
                scope: $scope,


            });
        }

        $scope.deleteNoteConfirmed = function (id) {

            noteService.deleteNoteConfirm(id).then(resp => {
                        $scope.$emit('deletingNoteIndex');
                    return resp
                }
            )
        }


        $scope.$on('listByType', (evt, data) => {
            ctrl.listByType = data;
        });
    }])
;