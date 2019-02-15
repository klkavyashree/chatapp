app.service('userServices', function ($http, $location) {
try{
    this.registerUser = function (data, $scope) {
        console.log('register in client user service ',data);
        $http({
            method: 'POST',//assigning value to http proprties 
            url: 'http://localhost:3000/register',//assigning value to http proprties 
            data: data

        }).then(
            function successCallback(response) {//caling call back functipn in http
                console.log("register successfull ");
                console.log(response);
                $scope.message = "register successfull";
                $location.path('login');

            },
            function errorCallback(response) {//caling call back functipn in http
                 console.log("register Unsuccessfull ");
                 $scope.message = "enter valid data"; 
             $scope.message =response.data.message.message;
            }
        );
    }}
    catch(err)
    {
        console.log("err while register")
    }

try{
    this.login = function (data, $scope) {
        $http({
            method: 'POST',//assigning value to http proprties 
            url: 'http://localhost:3000/login',//assigning value to http proprties 
            data: data,
        }).then(
            function successCallback(response) {
                console.log("Login successfull ");
                var userid=response.data.message[0]._id;
                var name=response.data.message[0].firstname;
                var token=response.data.token;
                localStorage.setItem('userid',userid)//setting values to localstorage
                localStorage.setItem('name',name)
                localStorage.setItem('token',token)//setting values to localstorage
                 $location.path('singleChat');
                $scope.loginMessage = "login successfull";
            },
            function errorCallback(response) {//if error occur in response

                console.log("register Unsuccessfull ");
                console.log(response);
                $scope.loginMessage = 'EmailId or Password Incorrect ';
            }
        );
    }}
    catch(err)
    {
        console.log("err found")
    }

});














// var userid = response.data.message[0]._id;
                // var name = response.data.message[0].firstname;
                // var token = response.data.token;
                // localStorage.setItem("userid", userid);
                // localStorage.setItem("name", name);
                // localStorage.setItem("token",token);