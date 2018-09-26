app
    .controller('currEmployeeDocumentsModalCtrl', ['$scope', 'currEmployeeDocumentsModalService',
        'fileType', 'person', '$route', '$location', 'toastsService', function ($scope, currEmployeeDocumentsModalService, fileType, person, $route, $location, toastsService) {
            let ctrl = this;
            $scope.data = {
                person: person

            };
            $scope.isPdf=false
            $scope.ImgName = ''
            $scope.stopImgSave = false

            $scope.imgSRC = ''

            ctrl.getBase = () => {
                let files = document.getElementById('fileName').files
                $scope.ImgName = files[0].name
                 if($scope.ImgName.search(/(\.pdf)$/) >= 0){
                    $scope.isPdf=true
                }else{
                    $scope.isPdf=false
                ctrl.getBase64(files[0])

                 }
            }
            ctrl.getBase64 = (file) => {
                document.getElementById('docSource').style.display = 'none'
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    $scope.imgSRC = reader.result
                    setTimeout(function () {
                        document.getElementById('docSource').style.display = 'block'
                        ctrl.compressImg()
                    }, 300)

                }
            }
            ctrl.compressImg = () => {
                let width = document.getElementById('docSource').offsetWidth;
                let height = document.getElementById('docSource').offsetHeight;
                let imgW = document.getElementById('docSource').naturalWidth;
                let imgH = document.getElementById('docSource').naturalHeight;

                let ctx = document.getElementById('canvasDoc').getContext('2d');
                document.getElementById('canvasDoc').setAttribute('width', width * 3)
                document.getElementById('canvasDoc').setAttribute('height', height * 3)
                let img = document.getElementById('docSource')
                ctx.fillStyle = '#ffffff'
                ctx.fillRect(0, 0, width * 3, height * 3)
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, imgW, imgH, 0, 0, width * 3, height * 3);
            }
            $scope.saveDocCompr = () => {
                let canvas = document.getElementById('canvasDoc')

                let obj = {
                    name: $scope.data.fileName,
                    type: $scope.data.doctype,
                    base:  canvas.toDataURL('image/jpeg', 0.4).replace('data:image/jpeg;base64,', ''),
                    mimetype: 'image/jpeg',
                    img:$scope.ImgName

                }
                currEmployeeDocumentsModalService.saveEditedPhoto(obj).then(
                    resp => {
                        toastsService.customMessageSuc('Успіх','документ успішно завантажено')
                    },
                    resp => {
                        toastsService.customMessageEr('Ой лишенько', "сталася невідома помилка")
                        console.error(response)
                    })

            }


            $scope.checkFileSize = (id) => {

                ctrl.getBase()
                $scope.stopImgSave = false
                let file = document.getElementById(id).files[0];


                let name = file.name.toLowerCase()

                if (name.search(/(\.jpg|\.jpeg|\.png|\.pdf)$/) < 0) {

                    toastsService.alertFileFormat()
                    ctrl.fileSize = false
                    ctrl.photoLoaded = false
                    ctrl.photo = {
                        base64: '',
                        filename: ''
                    };
                    $scope.stopImgSave = true

                    return false
                }
                else if (file.size > 9900000) {

                    $scope.stopImgSave = true

                    toastsService.customMessageEr('Розмір файлу перевищує 9mb', 'стисніть файл перед завантаженням')
                    ctrl.fileSize = false
                    ctrl.photoLoaded = false
                    ctrl.photo = {
                        base64: '',
                        filename: ''
                    };
                    ctrl.spinner = false
                    $scope.stopImgSave = true
                    return false
                }

                else {
                    toastsService.alertFileSizeOk()
                    ctrl.fileSize = true
                    ctrl.spinner = false

                    return true
                }

            }


            $scope.getRedirect = function () {
                document.getElementById('docFormRedirect').value = $location.path()
            }

            $scope.id = $route.current.params.identify;
            $scope.part = ''
            $scope.photoChange = function () {

                $scope.data.doctype == 'photo' ? $scope.data.fileName = 'фотографія' : null

            }
            if (window.location.href.indexOf('#3') > 0) {
                $scope.part = 3
            }
            else {
                $scope.part = 1
            }

            ctrl.fileType = fileType;
            let serv = currEmployeeDocumentsModalService;
            $scope.fileName = '';

            ctrl.updateData = function (data) {

                serv.updateData(data)
                    .then(
                        () => {
                            serv.showSuccess();
                            $scope.$parent.$broadcast('reloadDocumentsData', true);
                            $scope.closeThisDialog(0);
                        },
                        () => console.log(`..damn!...`)
                    );
            };
        }
    ])
;