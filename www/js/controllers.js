/**
 * Created by reolee on 19/04/15.
 */
angular.module('fieldAgent.controllers', [])


.controller("LoginController", function($scope, $http) {


        $scope.user = {};
        $scope.url = 'http://fieldagent.js-dev.co/test.php';



        $scope.login = function() {

             $http.post($scope.url, {"username" : $scope.user.username, "password" : $scope.user.password})
                .success(function(data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    /* if(data.msg = "Success"){

                     }
*/

                })

                .error(function(data, status) {
                    $scope.status = status;
                    $scope.data = data ||  "Request Fail";

                })
        }



        /*$http.get("htttp://www.ourdb.com/db/user.php")
            .success(function (response) {
                $scope.userid = response.users.username
                $scope.userpw = response.users.password

            })*/




    })


/*
$http({
    url: "api/getUserData",
    method: "POST",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: $.param({user_id:app.user_id})
}).success(function(data, status, headers, config) {
    $scope.data = data;
}).error(function(data, status, headers, config) {
    $scope.status = status;
});
*/
