// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  INDEX
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getRoot(req, res) {
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  LOGIN
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function getLogin(req, res) {
  var user = req.user;
  console.log(user)
  if (req.isAuthenticated()) {
    res.send({login: 'ok'});
  }
  else {
    console.log('user NO logueado');
    res.send({login: 'ERROR'});
  }
}

function getSignup(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
}


function postLogin (req, res) {
  var user = req.user;
  res.send({login: 'ok'});
}

function postSignup (req, res) {
  var user = req.user;
  res.send({signup: 'ok'});
}

function getFaillogin (req, res) {
  console.log('error en login');
  res.send({login: 'ERROR'});
}

function getFailsignup (req, res) {
  console.log('error en signup');
  res.send({signup: 'ERROR'});
}



function getLogout (req, res) {
  req.logout();
  res.send({logout: 'ok'});

}

function failRoute(req, res){
  res.redirect('/')
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup
}
