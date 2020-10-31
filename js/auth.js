// Register
const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = registerForm['email'].value;
  const password = registerForm['userPassword'].value;
  //console.log(email, password, 'hereeeeee');

  // sign up the user
  var tag = generateTag(self.firstName(), self.emailAddress());

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    cred = cred.user.l;
    console.log(cred);
    db.collection('UserInfo').add({
      firstName: self.firstName(),
      emailAddress: self.emailAddress(),
      title: self.title(),
      phoneNumber: self.phoneNumber(),
      tag: tag,
    });
    // close the signup modal & reset form
    const modal = document.querySelector('#knockout-app');
    M.Modal.getInstance(modal).close();
    registerForm.reset();
  });
});

function generateTag(firstName, email) {
  var tag = '';
  // to remove any space from user name
  var firstName = firstName.toString('').split(' ').join('');

  // to get the first part from email before @
  var email = email.toString().split('@');

  tag += firstName + email[0];
  return tag;
}

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['email'].value;
  const password = loginForm['userPassword'].value;

  // log the user in
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
      // close the signup modal & reset form
      const modal = document.querySelector('#knockout-app');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch((err) => {
      console.log(err, 'errrrrrrrrrr');
    });
});
