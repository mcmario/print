// app
//     .controller('currEmployeeDocumentsEditModalCtrl', ['$scope', '$http', function ($scope, $http) {
//         let ctrl = this;
//         let cropper;
//         ctrl.GetFile = () => {
//
//
//
//             const image = document.getElementById('myImg');
//             cropper = new Cropper(image, {
//                 aspectRatio: 1 / 1,
//                 crop(event) {
//
//                 },
//             });
//
//
//         }
//
//         ctrl.saveFile = () => {
//             cropper.getCroppedCanvas().toBlob((blob) => {
//                 const formData = new FormData();
//
//                 formData.append('croppedImage', blob);
//
//                 // Use `jQuery.ajax` method
//                 $http( {
//                     method: "POST",
//                     url:'/files',
//                     data:{
//                       formData
//                     } ,
//                     processData: false,
//                     contentType: false,
//                     success() {
//                     },
//                     error() {
//                     },
//                 });
//             });
//
//         }
//     }
//     ])
// ;