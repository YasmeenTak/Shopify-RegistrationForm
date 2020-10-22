// Register
const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['email'].value;
  const password = signupForm['userPassword'].value;
  console.log(email, password, 'hereeeeee');

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#register-form');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});