var app = new Vue({
    el: '#app',

    data: {
        auth: {
            user: null,
            email: '',
            password: '',
            message: '',
            userName: '',
            type: '',
            hasErrors: false
        },
        loaded: false
    },

    methods: {

        login: function (event) {
            /**
             * Authenticate the user
             *
             * @param object event
             */
            var vm = this;
            vm.auth.message = '';
            vm.auth.hasErrors = false;

            if (vm.auth.email === '' || vm.auth.password === '') {
                alert('Please provide the email and password');
                return;
            }
            // Sign-in the user with the email and password
            firebase.auth().signInWithEmailAndPassword(vm.auth.email, vm.auth.password)
                .then(function (data) {
                    vm.auth.user = firebase.auth().currentUser;
                }).catch(function (error) {
                    vm.auth.message = error.message;
                    vm.auth.hasErrors = true;
                });
        },

        signOut: function () {
            /**
             * Signout the currently logged-in user
             */
            // Signout the user using firebase
            firebase.auth().signOut()
                .then(function (error) {
                    this.auth.user = firebase.auth().currentUser;
                    this.auth.message = 'User signed out Successfully';
                }.bind(this), function (error) {
                    alert('Failed to signout user, try again later');
                });
        },
        dismissAlert: function () {
            /**
             * Dismiss the alert message
             */
            this.auth.message = '';
            this.auth.hasErrors = false;
        },

    },

    computed: {
        loadAuth: function () {
            /**
             * Determines if the user is authenticated and the page is loaded
             *
             * @return boolean
             */
            return !this.isAuthenticated && this.loaded;
        },
        isAuthenticated: function () {
            /**
             * Determines if the user is authenticated
             *
             * @return boolean
             */
            // This function changes the auth.user state when the auth status of user changes.
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    this.auth.user = user;
                    userId = user.email.split(".").join(" ");

                    firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                        app.auth.type = snapshot.val() && snapshot.val().type;
                    });
                } else {
                    this.auth.user = null;
                    this.auth.type = null;
                }
            }.bind(this));

            return (this.auth.user !== null);
        }

    }

});

// Allows the page to load without showing login transtion
setTimeout(function () {
    app.loaded = true;
}, 1500);