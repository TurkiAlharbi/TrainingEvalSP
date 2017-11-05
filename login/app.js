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
        }
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

        updateProfile: function () {
            /**
             * Update the user profile details.
             */
            if (this.auth.userName === '') {
                alert('Please provide a username to update.');
                return;
            }

            var user = firebase.auth().currentUser;
            var vm = this;

            user.updateProfile({
                "type": vm.auth.type
            }).then(function () {
                vm.auth.message = 'Successfully udpated user profile.';
            }, function (error) {
                vm.auth.message = 'Failed to update user profile.';
                vm.auth.hasErrors = true;
            });
        },

        dismissAlert: function () {
            /**
             * Dismiss the alert message
             */
            this.auth.message = '';
            this.auth.hasErrors = false;
        },

        displayName: function () {
            /**
             * Display name computed property
             */
            return this.auth.user.displayName ? this.auth.user.displayName : this.auth.user.email;
        }

    },

    computed: {

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