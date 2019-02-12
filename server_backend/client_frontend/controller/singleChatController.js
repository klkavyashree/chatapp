app.controller('singleChatControl', function ($scope, SocketService, $state, chatServices) {
    $scope.message = '';
    $scope.allUserArr = [];
    $scope.currUserName = localStorage.getItem('name');
    $scope.currUser = localStorage.getItem('userid');
    $scope.recieverUserName = localStorage.getItem('rusername');
    var token = localStorage.getItem("token");
    console.log(token.exp);
    if (token === null) {
        $state.go('login');
    }
    SocketService.on('newMessageSingle', (message) => {
        if (localStorage.getItem('userid') == message.senderUserId || (localStorage.getItem('userid') == message.recieverUserId && localStorage.getItem('ruserId') == message.senderUserId)) {
            if ($scope.allUserArr === undefined) {
                $scope.allUserArr = message;
            } else {
                $scope.allUserArr.push(message);
            }
        }
    })
    $scope.getAllUsers = function () {
        chatServices.getAllUsers($scope,token);
    }
    $scope.getAllUsers(); 
    $scope.person = function (userData) {//select person from list
        $scope.allUserArr = '';

        localStorage.setItem('rusername', userData.firstname);
        localStorage.setItem('ruserId', userData._id);
        $scope.recieverUserName = localStorage.getItem('rusername');
        $scope.getUserMsg();
    }
    //get all message
    $scope.getUserMsg = function () {
        console.log("i am called");
        chatServices.getUserMsg($scope);
    }
    $scope.getUserMsg();
    $scope.sendmessage = function () {
        var msg = {
            'senderUserId': localStorage.getItem('userid'),
            'senderName': localStorage.getItem('name'),
            'recieverUserId': localStorage.getItem('ruserId'),
            'recieverName': localStorage.getItem('rusername'),
            'message': $scope.message
        };
        $scope.message = '';
        SocketService.emit('createMessage', msg);
    }
    $scope.logout = function () {
        localStorage.clear();
        $state.go('login')
    }
});