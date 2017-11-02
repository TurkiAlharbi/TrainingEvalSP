function write2DB(record, json) {
    firebase.database().ref(record).set(json);
};

function update2DB(record, json) {
    firebase.database().ref(record).update(json);
};


var secondaryApp = firebase.initializeApp(config, "Secondary");
function createUser(email, password, type) {
    secondaryApp.auth().createUserWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
            record = 'users/' + email.split(".").join(" ");
            write2DB(record, { type: type, })
            alert('Successfully created ' + email)
        })
        .catch(
        function (error) {
            alert(error);
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