/**
 * Created by reolee on 19/04/15.
 */
angular.module('fieldAgent.controllers', [])


.controller("LoginCtrl", function($scope, $http, $state, $ionicPopup) {


        $scope.user = {};
        $scope.url = 'http://fieldagent.js-dev.co/login.php';



        $scope.login = function() {

             $http.post($scope.url, {"username" : $scope.user.username, "password" : $scope.user.password})
                .success(function(data, status) {
                    $scope.status = status;
                    $scope.data = data;

                    if(data.msg == "Success"){

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


.controller("HomeCtrl", function($scope, $http, $state, propertyListService) {


        propertyListService.getPropertyList().then(function(property_list) {
           //property_list is an arrary of property object
        });



        $scope.goAdd = function(){
            $state.go('addhouse');




        }

    })



.controller("AddHouseCtrl", function($scope, $http, $state, $ionicPopup) {

        $scope.housetypes = [{type: 'House'},{type:'Town house'}, {type:'Apartment'}, {type:'Studio'}, {type:'Unit'}]
        $scope.houseDetail = {};
        $scope.url = 'http://fieldagent.js-dev.co/addProperty.php';


        $scope.addHouse = function() {

            $http.post($scope.url, {"housetype" : $scope.houseDetail.htype, "address_1" : $scope.houseDetail.address1,
                "address_2" : $scope.houseDetail.address2, "city" : $scope.houseDetail.city,
                "state" : $scope.houseDetail.state, "postcode" : $scope.houseDetail.zip, "owner" : $scope.houseDetail.owner,
                "tenant": $scope.houseDetail.tenant})
                .success(function(data, status) {

                    $scope.status = status;
                    $scope.data = data;
                    console.log(data.msg);


                    if(data.msg == "Property created"){

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

