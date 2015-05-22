/**
 * Created by reolee on 19/04/15.
 */
angular.module('fieldAgent.controllers', [])


.controller("LoginCtrl", function($scope, $http, $state, $ionicPopup, userIdService, propertyListService) {


        $scope.user = {};
        $scope.url = '//fieldagent.js-dev.co/login.php';



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
        $scope.url = 'http://fieldagent.js-dev.co/register.php';


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
            $scope.url = 'http://fieldagent.js-dev.co/addInspectCase.php';

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
        $scope.url = 'http://fieldagent.js-dev.co/addProperty.php';


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


.controller("inspectionCtrl", function($scope, $http, $state, $ionicPopup, caseIdService, propertyIdService, areaService) {


        $scope.area={};
        $scope.url = 'http://fieldagent.js-dev.co/addArea.php';
        $scope.addArea = function() {
            $http.post($scope.url, {
                "propertyid": propertyIdService.propertyid,
                "area_name": $scope.area.name,
                "active": "1",
                "caseid": caseIdService.caseid})
                .success(function(data) {
                    $scope.data = data;

                    if(!data){
                        var alertPopup = $ionicPopup.alert({
                            title: 'Task Faield',
                            template: 'Cannot connect to server'
                        })
                    } else {
                        $state.go($state.current, {}, {reload: true});
                    }


                })
                .error(function() {
                    console.log("connection to create area failed.")
                })
        }


        var vm = this;
        vm.areaList = [];
        vm.getArea = function() {
            areaService.getArea()
                .then(function(areaList) {
                    vm.areaList = areaList;
                    $scope.area = areaList;
                },
            function(data) {
               console.log('getArea method is failed')
            });
        };
        vm.getArea();
    })
