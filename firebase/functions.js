function write2DB(reference, json) {
    // Creates reference if it dosent exist
    // Sets the value for reference as json
    // Removes the old json attributes
    firebase.database().ref(reference).set(json);
}

function update2DB(reference, json) {
    // Creates reference if it dosent exist
    // updates the value for reference as json
    // keeps the old json attributes if not updated
    firebase.database().ref(reference).update(json);
}

function moveRecord(from, to) {
    firebase.database().ref(from).once('value', function (snapshot) {
        write2DB(to, snapshot.val());
        firebase.database().ref(from).remove();
    });
}


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