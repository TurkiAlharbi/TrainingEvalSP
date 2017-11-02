function write2DB(record, json) {
    // Creates record if it dosent exist
    // Sets the value for record as json
    // Removes the old json attributes
    firebase.database().ref(record).set(json);
};

function update2DB(record, json) {
    // Creates record if it dosent exist
    // updates the value for record as json
    // keeps the old json attributes if not updated
    firebase.database().ref(record).update(json);
};


var secondaryApp = firebase.initializeApp(config, "Secondary");
function createUser(email, password, type) {

    // Creates user account 
    secondaryApp.auth().createUserWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
            /* If created */

            // Inserts a record containing the user type
            record = 'users/' + email.split(".").join(" ");
            write2DB(record, { type: type, })

            //temp // Informs about creation
            alert('Successfully created ' + email)
        })
        .catch(
        function (error) {
            /* If not created */

            //temp // Informs about failure of creation
            alert(error);
        });
}

function getUserType() {
    // Gets the current logged in user
    var user = firebase.auth().currentUser;
    if (user == null)
        return;

    // Gets the email (unique identifier)
    var userId = user.email;
    userId = userId.split(".").join(" ");

    // Gets the type of the account
    firebase.database().ref('/users/' + userId).once('value').then(
        function (snapshot) {
            app.auth.type = snapshot.val() && snapshot.val().type;
        });
};