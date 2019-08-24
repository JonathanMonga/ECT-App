function uib_w_14_popup_controller($scope, $ionicPopup) {

  // A confirm dialog
  $scope.show = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: '<img src="kjk" >'+'Are you sure you want to eat this ice cream?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

};