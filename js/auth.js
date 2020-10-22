// Register
const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = registerForm['email'].value;
  const password = registerForm['userPassword'].value;
  //console.log(email, password, 'hereeeeee');

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#knockout-app');
    M.Modal.getInstance(modal).close();
    registerForm.reset();
  });
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['email'].value;
  const password = loginForm['userPassword'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#knockout-app');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
