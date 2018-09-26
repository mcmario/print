app
    .service('currEmployeeDocumentsModalService', ['toastsService', '$http', '$route', function (toastsService, $http, $route) {

        let serv = this;

        serv.updateData = function (data) {
            return $http.post('/upload/' + 32, data)
                .then(
                    resp => {
                        return resp;
                    },
                    resp => {
                        return resp;
                    }
                );
        };

        serv.showError = toastsService.toastErrorUploadDocumentMsg;

        serv.showSuccess = toastsService.toastUploadDocumentMsg;

        serv.checkFileType = function (fileName) {
            let allowedFileTypes = ['pdf', 'jpg', 'jpeg', 'png', 'svg', 'gif', 'bmp', 'djvu'];

            let extn = fileName.split('.').pop();

            let filtered = allowedFileTypes.filter(function (word) {
                return word === extn;
            });

            return filtered.length > 0;
        };

        serv.saveEditedPhoto = (data, id) => {
            id ? id = id : id = $route.current.params.identify

            return $http.post('/files_compress/' + id, data)
                .then(
                    resp => {
                        return resp;
                    },
                    resp => {
                        return resp;
                    }
                );
        }
    }])
;