var LoginViewModel = function () {
  var self = this;

  self.emailAddress = ko.observable('').extend({
    required: true,
    email: true,
  });

  self.userPassword = ko.observable('').extend({
    required: true,
  });

  self.login = () => {
    var errors = ko.validation.group(self);
    if (errors().length > 0) {
      errors.showAllMessages();
      return;
    }
  };
};
//   self.hasBeenSubmitted = ko.observable(false);

//   window.firstName = self.firstName;

//   self.handleSubmit = () => {
//     //Check for errors
//     var errors = ko.validation.group(self);
//     if (errors().length > 0) {
//       errors.showAllMessages();
//       return;
//     }

//     self.hasBeenSubmitted(true);

//     //Form is valid
//     console.log('submit the form!');
//     //Api call would go here
//     //
//     //
//     console.log({
//       emailAddress: self.emailAddress(),
//       userPassword: self.userPassword(),
//       //subscriptionType: self.subscriptionType(),
//     });
//   };
// };

// const knockoutApp = document.querySelector('#knockout-app');
// ko.applyBindings(new LoginViewModel(), knockoutApp);
