function CreateAccountViewModel() {
  var self = this;

  self.firstName = ko.observable('').extend({
    required: true,
    minLength: 2,
  });

  self.userPassword = ko.observable('').extend({
    required: true,
    minLength: 8,
  });

  self.phoneNumber = ko.observable('').extend({
    required: true,
    minLength: 6,
  });

  self.title = ko.observable('').extend({
    required: true,
  });

  self.emailAddress = ko.observable('').extend({
    required: true,
    email: true,
  });
  self.hasBeenSubmitted = ko.observable(false);

  window.firstName = self.firstName;

  self.handleSubmit = () => {
    //Check for errors
    var errors = ko.validation.group(self);
    if (errors().length > 0) {
      errors.showAllMessages();
      return;
    }
    // auth
    //   .createUserWithEmailAndPassword(self.emailAddress(), self.userPassword())
    //   .then((token) => {
    //     token = token.user.l;
    //     db.collection('UserInfo').add({
    //       name: self.firstName(),
    //       email: self.emailAddress(),
    //       mobile: self.phoneNumber(),
    //     });
    //     setCookie('tokenFromFirebase', token);
    //     self.firstName = '';
    //     self.userPassword = '';
    //     self.emailAddress = '';
    //     self.phoneNumber = '';
    //     window.location.replace('catalog-page.html');
    //   })
    //   .catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     if (errorCode == 'auth/weak-password') {
    //       alert('The password is too weak.');
    //     } else {
    //       alert(errorMessage);
    //     }
    //     console.log(error);
    //   });

    self.hasBeenSubmitted(true);

    //Form is valid
    console.log('submit the form!');
    //Api call would go here
    //
    //
    console.log({
      firstName: self.firstName(),
      emailAddress: self.emailAddress(),
      //subscriptionType: self.subscriptionType(),
    });
  };
}

const knockoutApp = document.querySelector('#knockout-app');
ko.applyBindings(new CreateAccountViewModel(), knockoutApp);
