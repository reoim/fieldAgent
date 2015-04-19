/**
 * Created by reolee on 19/04/15.
 */
angular.module('fieldAgent.controllers', [])


.controller("LoginController", function($scope, $http) {

        $http.get("htttp://www.ourdb.com/db/user.php")
            .success(function (response) {
                $scope.userid = response.users.username
                $scope.userpw = response.users.password

            })


    })