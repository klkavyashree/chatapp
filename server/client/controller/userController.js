app.controller('userControl', function ($scope, userServices) {
    try {
        $scope.register = function () {//function register
            var user = {//assigning all values to the user obj
                'firstname': $scope.firstname,
                'lastname': $scope.lastname,
                'email': $scope.email,
                'password': $scope.password,
                'confirmPassword': $scope.confirmPassword

            }
            console.log("register calling", user);
            if ($scope.password != $scope.confirmPassword) {//checking for the password 
                $scope.message = "password and confirm password not match ";
            } else {
                userServices.registerUser(user, $scope);//sending data of uer to the services
            }
        }
    }
    catch (err) {
        console.log("error found while register")
    }
    try {
        $scope.login = function () {//function login
            var data = {
                'email': $scope.email,
                'password': $scope.password
            }
            userServices.login(data, $scope);//sending data of uer to the services
        }
    }
    catch (err) {
        console.log("error in login")
    }

});
