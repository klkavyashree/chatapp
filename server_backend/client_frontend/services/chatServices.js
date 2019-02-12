app.service('chatServices', function ($http) {

    this.getAllUsers = function ($scope, usertoken) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/auth/getAllUser',
            headers: {
                'token': usertoken,
            }
        }).then(
            function successCallback(response) {
                console.log("Users get successfull ");
                $scope.allUser = response.data.message;
            },
            function errorCallback(response) {
                console.log("register Unsuccessfull ");
                console.log(response);
            }
        );
    }

    this.getUserMsg = function ($scope) {
        var arr = [];
        var usertoken=localStorage.getItem('token');
        $http({
            method: 'GET',
            url: 'http://localhost:3000/auth/getUserMsg',
            headers: {
                'token': usertoken,
            }
        }).then(
            function successCallback(response) {
                console.log(response.data.message[0]);

                for (var i = 0; i < (response.data.message).length; i++) {
                    a = response.data.message[i];

                    if (((localStorage.getItem('userid') == a.senderUserId) && (localStorage.getItem('ruserId') == a.recieverUserId)) || ((localStorage.getItem('userid') == a.recieverUserId && localStorage.getItem('ruserId') == a.senderUserId))) {
                        console.log("local user is ", localStorage.getItem('userid'), "a user is ", a.senderUserId, " local rcvrid is ", localStorage.getItem('ruserId'), "  reciver is ", a.recieverUserId);
                        arr.push(a);
                    }

                }
                $scope.allUserArr = arr;
                console.log("Users msg successfull ", arr);

            },
            function errorCallback(response) {
                console.log("Unsuccessfull ");
                console.log(response);

            }
        );
    }

})