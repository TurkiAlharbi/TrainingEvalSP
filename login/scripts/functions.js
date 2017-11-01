function write2DB(record, json) {
    firebase.database().ref(record).set(json);
};


var secondaryApp = firebase.initializeApp(config, "Secondary");
function createUser(email, password, type) {
    secondaryApp.auth().createUserWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
            json = {
                type: type,
            };
            record = 'users/' + email.split(".").join(" ");
            write2DB(record, json)
            console.log('Successfully created ' + email)
        })
        .catch(
        function (error) {
            console.log(error);
        });
}

function getUserType() {
    var user = firebase.auth().currentUser;
    if (user == null)
        return;
    var userId = user.email;
    userId = userId.split(".").join(" ");
    firebase.database().ref('/users/' + userId).once('value').then(
        function (snapshot) {
            app.auth.type = snapshot.val() && snapshot.val().type;
        });
};

function newLogin() {
    app.login();
    setTimeout(getUserType, 2000);
};

setTimeout(getUserType, 1000);