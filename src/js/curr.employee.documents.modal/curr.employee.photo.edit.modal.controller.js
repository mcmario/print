app
    .controller('currEmployeePhotoEditModalCtrl', ['$scope', '$http', 'currEmployeeDocumentsModalService', 'toastsService', '$route',
        function ($scope, $http, currEmployeeDocumentsModalService, toastsService, $route) {
            let ctrl = this;
//         let prop = false;
//         let stopMove = false;
//         let L = 0,
//             T = 0,
//             W = 80,
//             H = 80;
//         $scope.srcImg=''
//         let width = 100,
//             height = 100;
//         let ImgW = 0
//         let ImgH = 0
//
//
//
//
//         let getProp = (img) => {
//             ImgW = img.target.offsetWidth
//             ImgH = img.target.offsetHeight
//             return prop = img.naturalWidth / img.offsetWidth
//
//         }
// $scope.test=()=>{
// }
//         // $scope.getURl = () => {
//         //     let files = angular.element('newFile').files;
//         //     if (files.length > 0) {
//         //         getBase64(files[0])
//         //     }
//         // }
//
//         $scope.getBase64 = (file) => {
//             let reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = function () {
//                 $scope.srcImg = reader.result
//                 prop = ''
//
//
//
//             };
//             reader.onerror = function (error) {
//             };
//         }
//
//         $scope.fixPosition = (event) => {
//
//
//             let xpos = event.clientX
// ;
//             let ypos = event.clientX
//
//             stopMove = !stopMove
//         }
//
//         $scope.fit = () => {
//             if (parseInt(angular.element("source").offsetWidth) > parseInt(angular.element("source").offsetHeight)) {
//                 width = parseInt(angular.element("source").offsetHeight)
//             } else width = parseInt(angular.element("source").offsetWidth)
//             // angular.element('frame').style.width = width + 'px'
//             // angular.element('frame').style.height = width + 'px'
//             // stopMove = false
//         }
//
//         $scope.zoom = (x) => {
//             if (x == 2) {
//                 if (parseInt(width) + 20 < parseInt(angular.element("source").offsetWidth) &&
//                     parseInt(width) + 20 < parseInt(angular.element("source").offsetHeight)) {
//                     width += 20
//                 }
//             } else {
//                 width > 30 ? width -= 20 : null;
//             }
//             angular.element('frame').style.width = width + 'px'
//             angular.element('frame').style.height = width + 'px'
//             stopMove = false
//         }
//
//
//         $scope.getMousePosition = (event) => {
//             !prop ? prop = getProp(event.target) : null
//             if (1) {
//
//                 let xpos = event.clientX;
//                 let ypos = event.clientY;
//                 let top = parseInt(angular.element('source').pageX);
//                 let left = parseInt(angular.element('source').pageY);
//                 let frW = parseInt(angular.element('frame').offsetWidth) * 0.5;
//                 let mTop = ypos - top;
//                 let mLeft = xpos - left;
//
//                 mTop > ImgH - frW ? angular.element('frame').style.top = ImgH : null;
//                 mTop > frW ? angular.element('frame').style.top = mTop - frW + 'px' : angular.element('frame').style.top = 0;
//                 mLeft > frW ? angular.element('frame').style.left = mLeft - frW + 'px' : angular.element('frame').style.left = 0;
//                 mTop > ImgH - frW ? angular.element('frame').style.top = ImgH - frW * 2 + 'px' : null;
//                 mLeft > ImgW - frW ? angular.element('frame').style.left = ImgW - frW * 2 + 'px' : null;
//
//                 //        let fT = mTop - frH
//                 //        fT > 0 ? fT=fT : fT = 0;
//                 //        let fL = mLeft - frW
//                 //        fL >= 0 ? fL=fL : fL = 0;
//                 let fL = parseInt(angular.element('frame').style.left);
//                 let fT = parseInt(angular.element('frame').style.top);
//                 //angular.element('frame').style.top=ypos-top-frH+'px'
//                 draw(fL * prop, fT * prop, frW * 2 * prop, frW * 2 * prop)
//                 //        draw(mLeft-frW,mTop-frH,frW*2,frH*2)
//
//             }
//         }
//         $scope.save = () => {
//             let canvas = angular.element('canvas')
//             let dataURL = canvas.toDataURL('image/jpeg', 0.5)
//             angular.element('new').src = dataURL
//             angular.element('new').style.display = 'block'
//         }
//
//         let draw=(x, y, w, h)=>
//         {
//
//             let ctx = canvas.getContext('2d');
//             let img = angular.element('source');
//             // Рисуем фрагмент
//             ctx.mozImageSmoothingEnabled = false;
//             ctx.webkitImageSmoothingEnabled = false;
//             ctx.msImageSmoothingEnabled = false;
//             ctx.imageSmoothingEnabled = false;
//             ctx.drawImage(img, x, y, w, h, 0, 0, 768, 768);
//
//             //  /
//
//         }
//
            $scope.save = () => {
                let canvas = document.getElementById('canvas')
                let obj={
                    name:'фотографія',
                    type:'photo',
                    base:canvas.toDataURL('image/jpeg', 0.5).replace('data:image/jpeg;base64,', ''),
                    mimetype:'image/jpeg'
                }
                currEmployeeDocumentsModalService.saveEditedPhoto(obj).then(
                    resp => {
                        toastsService.customMessageSuc('фото профілю','успішно змінено')
                        ;$route.reload()
                    },
                    resp => {
                        toastsService.customMessageEr('Ой лишенько', "сталася невідома помилка")
                    })

            }
        }])
;