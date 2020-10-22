var LoginViewModel = function () {
  var self = this;

  self.emailAddress = ko.observable();
  self.userPassword = ko.observable();

  self.login = () => {
    auth
      .signInWithEmailAndPassword(self.emailAddress(), self.userPassword())
      .then((token) => {
        setCookie('TokenFromFirebase', token.user.l);
        window.location.replace('catalog-page.html');
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
var form = document.querySelector('#formId');
ko.applyBindings(new LoginViewModel(), form);

// heler function

function setCookie(cname, cvalue) {
  document.cookie = cname + '=' + cvalue + ';' + ';path=/';
}

function getCookie(cname) {
  var cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
  return cookies[cname];
}
