/**
 * Created by reolee on 19/04/15.
 */
angular.module('fieldAgent.controllers', [])


.controller("LoginCtrl", function($scope, $http, $state, $ionicPopup, userIdService, propertyListService) {


        $scope.user = {};
        $scope.url = 'https://fieldagent.js-dev.co/login.php';



        $scope.login = function() {

             $http.post($scope.url, {"username" : $scope.user.username, "password" : $scope.user.password})
                .success(function(data, status) {
                    $scope.status = status;
                    $scope.data = data;

                    if(data.msg == "Success"){
                        userIdService.userid = data.userid;

                            //console.log(userIdService.userid);
                        $state.go('home');

                     } else {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Login failed!',
                            template: data.msg
                        })

                    }


                })

                .error(function(data, status) {
                    $scope.status = status;
                    $scope.data = data ||  "Request Fail";

                })
        }

        $scope.signup = function() {
            $state.go('signup');
        }








    })

.controller("SignupCtrl", function($scope, $http, $state, $ionicPopup) {

        $scope.userSignup = {};
        $scope.url = 'https://fieldagent.js-dev.co/register.php';


        $scope.register = function() {

            $http.post($scope.url, {"username" : $scope.userSignup.username, "password" : $scope.userSignup.password,
                "re-password" : $scope.userSignup.repw, "email" : $scope.userSignup.useremail,
                "firstname" : $scope.userSignup.firstname, "lastname" : $scope.userSignup.lastname})
                .success(function(data, status) {

                    $scope.status = status;
                    $scope.data = data;
                    console.log(data.msg);
                    console.log(data.user_details);

                    if(data.msg == "User created"){

                        $state.go('login');

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Sign up Failed!',
                            template: data.msg
                        })

                    }


                })

                .error(function() {
                    console.log("connection fail");

                })
        }

    })


.controller("HomeCtrl", function($scope, $http, $state, propertyListService, propertyIdService) {

        var vm = this;
        vm.property = [];
        vm.getProperty = function() {
            propertyListService.getProperty()
                .then(function(property) {
                    vm.property = property;
                    $scope.pro = property;

                },
            function(data) {
                console.log('getProperty method is failed.')
            });
        };

        vm.getProperty();


        $scope.goAdd = function(){
            $state.go('addhouse');
        }


        $scope.goDetail = function(x){
            propertyIdService.propertyid = x.propertyid;
            $state.go('propertydetail');
            console.log(propertyIdService.propertyid);

        }

    })

.controller('ProDetailCtrl', function($scope, $state, propertyDetailService, $http, $ionicPopup, inspectionService, propertyIdService, caseIdService ,$filter) {

        var vm = this;
        vm.propertyDetail = [];
        vm.getPropertyDetail = function() {
            propertyDetailService.getPropertyDetail()
                .then(function(propertyDetail) {
                    vm.propertyDetail = propertyDetail;
                    $scope.proDetail = propertyDetail;
                },
                function(data) {
                    console.log('getPropertyDetail method is Failed')
                });
        };

        vm.getPropertyDetail();

        vm.inspectionList = [];
        vm.getInspectionList = function() {
            inspectionService.getInspectionList()
                .then(function(inspectionList) {
                    vm.inspectionList = inspectionList;
                    $scope.insList = inspectionList;
                },
                function(data) {
                    console.log('getInspectionList method is Failed')
                });
        };

        vm.getInspectionList();



        $scope.addInspection = function() {

            var today = new Date();
            var todayFilter = $filter('date')(today, "yyyy-MM-dd");

            console.log(today);
            $scope.url = 'https://fieldagent.js-dev.co/addInspectCase.php';

            console.log(propertyIdService.propertyid);

            $http.post($scope.url, {"date" : todayFilter, "propertyid" : propertyIdService.propertyid})
                .success(function (data) {
                    $scope.data = data;
                    console.log(data.msg);

                    if(data.msg == "Inspection Case created") {
                        var alertPopup = $ionicPopup.show({
                            title: 'Success',
                            template: data.msg,
                            buttons:[{
                                text: 'OK',
                                type: 'button-positive',
                                onTap: function(e) {
                                    $state.go($state.current, {}, {reload: true});
                                }
                            }]
                        });

                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Fail',
                            template: data.msg
                        })
                    }


                })

        }

        $scope.goInspection = function(x){
            caseIdService.caseid = x.caseid;
            $state.go('inspection');
            console.log(caseIdService.caseid);
        }

})

.controller("AddHouseCtrl", function($scope, $http, $state, $ionicPopup, userIdService) {


        $scope.houseDetail = {};
        $scope.url = 'https://fieldagent.js-dev.co/addProperty.php';


        $scope.addHouse = function() {

            $http.post($scope.url, {
                "housetype" : $scope.houseDetail.htype,
                "address_1" : $scope.houseDetail.address1,
                "address_2" : $scope.houseDetail.address2,
                "city" : $scope.houseDetail.city,
                "state" : $scope.houseDetail.state,
                "postcode" : $scope.houseDetail.zip,
                "owner" : $scope.houseDetail.owner,
                "tenant": $scope.houseDetail.tenant,
                "userid": userIdService.userid})
                .success(function(data, status) {

                    $scope.status = status;
                    $scope.data = data;



                    if(data.msg == "Property created"){
                        console.log(data.prop_details);

                        $state.go('home');

                    } else {

                        var alertPopup = $ionicPopup.alert({
                            title: 'Task Failed!',
                            template: data.msg
                        })

                    }


                })

                .error(function() {
                    console.log("connection fail");

                })
        }



    })


.controller("inspectionCtrl", function($scope, $http, $state, $ionicPopup, caseIdService, propertyIdService, areaService, areaIdService, areaDetailService) {


        $scope.goInspectionDetail = function(){

            $state.go('inspectionDetail');

        }

        $scope.goAddPhoto = function() {
            $state.go('addPhoto');

        }

        $scope.area={};
        $scope.url = 'https://fieldagent.js-dev.co/addArea.php';
        $scope.addArea = function() {
            if ($scope.area.name == null) {

                var alertPopup = $ionicPopup.alert({
                    title: 'Area cannot be empty',
                    template: 'Please fill area name'
                })

            } else {
                $http.post($scope.url, {
                    "propertyid": propertyIdService.propertyid,
                    "area_name": $scope.area.name,
                    "active": "1",
                    "caseid": caseIdService.caseid
                })
                    .success(function (data) {
                        $scope.data = data;

                        if (!data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Task Faield',
                                template: 'Cannot connect to server'
                            })
                        } else {
                            $state.go($state.current, {}, {reload: true});
                        }


                    })
                    .error(function () {
                        console.log("connection to create area failed.")
                    })
            }
        }


        var vm = this;
        vm.areaList = [];
        vm.getArea = function() {
            areaService.getArea()
                .then(function(areaList) {
                    vm.areaList = areaList;
                    $scope.areas = areaList;
                    //console.log($scope.areas[0]);
                },
            function(data) {
               console.log('getArea method is failed')
            });
        };
        vm.getArea();


        vm.areaDetail = [];
        vm.getAreaDetail = function() {
            areaDetailService.getAreaDetail()
                .then(function(areaDetail) {
                    vm.areaDetail = areaDetail;
                    $scope.areaInspectionDetail = areaDetail;
                    //console.log(areaIdService.areaid);
                    //console.log(caseIdService.caseid);
                    //console.log($scope.areaInspectionDetail);
                },
                function(data) {
                    console.log('getAreaDetail method failed.')
                });
        };




        /*
         * if given area is the selected area, deselect it
         * else, select the given area
         */
        $scope.toggleArea = function(area) {

            if (areaIdService.areaid=area.areaid){

                $scope.url = 'https://fieldagent.js-dev.co/addInspectedArea.php';
                $http.post($scope.url, {"caseid" : caseIdService.caseid,
                    "areaid" : areaIdService.areaid,
                    "imageurl": "",
                    "note" : "",
                    "status" : ""})
                    .success(function(data) {
                        $scope.data = data;
                        //console.log(data.msg);
                        //console.log(data.inspected_area_details);

                        if(data.msg == "Inspected Area created"){

                            vm.getAreaDetail();

                        } else {

                            var alertPopup = $ionicPopup.alert({
                                title: 'Update Failed!',
                                template: data.msg
                            })

                        }


                    })

                    .error(function() {
                        console.log("connection fail");

                    })

                //vm.getAreaDetail();
            } else {
                console.log("Faield to assign areaid for getAreaDetail()")
            }

            if ($scope.isAreaShown(area)) {
                $scope.shownArea = null;
            } else {
                $scope.shownArea = area;
            }
        };
        $scope.isAreaShown = function(area) {
            return $scope.shownArea === area;
        };



    })

.controller("inspectionDetailCtrl", function($scope, $http, $state, $ionicPopup, caseIdService, propertyIdService, areaService, $ionicModal, areaIdService, areaDetailService) {


        var vm = this;
        vm.areaDetail = [];
        vm.getAreaDetail = function() {
            areaDetailService.getAreaDetail()
                .then(function(areaDetail) {
                    vm.areaDetail = areaDetail;
                    $scope.areaInspectionDetail = areaDetail;
                    //$scope.areaStatus = areaDetail.status;
                },
                function(data) {
                    console.log('getAreaDetail method failed.')
                });
        };
        vm.getAreaDetail();


        //$scope.areaStatus="Good";
        $scope.pushNotificationChange = function() {
            console.log('Push Notification Change', $scope.pushNotification.checked);
            if($scope.pushNotification.checked){
                $scope.areaInspectionDetail.status="Good";
            }else{
                $scope.areaInspectionDetail.status="Bad";
            }
        };

        $scope.pushNotification = { checked: false };

        $scope.url = 'https://fieldagent.js-dev.co/updateInspectedArea.php';


        $scope.saveDetail = function() {

            $http.post($scope.url, {"caseid" : $scope.areaInspectionDetail.caseid,
                                    "areaid" : $scope.areaInspectionDetail.areaid,
                                    "note" : $scope.areaInspectionDetail.note,
                                    "status" : $scope.areaInspectionDetail.status})
                .success(function(data) {


                    $scope.data = data;
                    console.log(data.msg);


                    if(data.msg == "Update Inspected Area successful"){

                        $state.go('inspection');

                    }
                })

                .error(function() {
                    console.log("connection fail");

                })
        }








    })


.controller("addPhotoCtrl", function($scope, $http, $state, $ionicPopup, $cordovaCamera, $cordovaFileTransfer, caseIdService, propertyIdService, areaService, $ionicModal, areaIdService, areaDetailService) {

        $scope.takePicture = function() {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            };

            $cordovaCamera.getPicture(options).then(function(imageURI) {
                $scope.lastPhoto = imageURI;
            }, function(err) {
                // An error occured. Show a message to the user
                console.log(err);
            });
        }

        $scope.savePhoto = function(imageURI) {
            var ftoptions = new FileUploadOptions();
            ftoptions.fileKey = "file";
            ftoptions.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            ftoptions.mimeType = "image/jpeg";
            ftoptions.httpMethod = 'POST';
            var params = new Object();
            params.caseid = caseIdService.caseid;
            params.areaid = areaIdService.areaid;

            ftoptions.params = params;
            console.log(params);

            $cordovaFileTransfer.upload("https://fieldagent.js-dev.co/uploadImage.php", imageURI, ftoptions)
                .then(function (result) {
                    console.log('success: ' + angular.toJson(result));
                    $state.go('inspection')
                },
                function (err) {
                    // Error
                    console.log('error: ' + err);
                },
                function (progress) {
                    // constant progress updates
                });

        }

})



//var MAX_WIDTH = 50;
//var MAX_HEIGHT = 50;
//var width = img.width;
//var height = img.height;
//
//if (width > height) {
//    if (width > MAX_WIDTH) {
//        height *= MAX_WIDTH / width;
//        width = MAX_WIDTH;
//    }
//} else {
//    if (height > MAX_HEIGHT) {
//        width *= MAX_HEIGHT / height;
//        height = MAX_HEIGHT;
//    }
//}
//canvas.width = width;
//canvas.height = height;
//var ctx = canvas.getContext("2d");
//ctx.drawImage(imageURI, 0, 0, width, height);
//$scope.resizedPhoto = ctx.toDataURL();