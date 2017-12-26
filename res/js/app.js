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
        loaded: false,
        e1: true,
        valid: false,
        emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
            (v) => !!v || 'Password is required',
            (v) => v.length > 6 || 'Password is short'
        ],
        sent: false,
        drawer: false,
        passwordDialog: false,
        oldPassword: '',
        newPassword: '',
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
                    console.log(error);
                });
        },

        forgotPassword: function (event) {
            /**
             * Sends a message with a link for resetting the password
             */
            var vm = this;

            if (vm.auth.email === '') {
                vm.auth.message = "Please provide the email first";
                vm.auth.hasErrors = true;
                return;
            }

            firebase.auth().sendPasswordResetEmail(vm.auth.email).then(function () {
                vm.auth.message = "Email sent, check your email, maybe junkmail";
                vm.auth.hasErrors = false;
            }).catch(function (error) {
                vm.auth.message = "Failed to send password reset email, try again later";
                vm.auth.hasErrors = true;
                console.log(error);
            });

        },

        changePassword: function () {
            /**
             * Changes the password of a logged in user
             */
            var vm = this;

            if (vm.newPassword === '') {
                vm.auth.message = "Please provide the password first";
                vm.auth.hasErrors = true;
                return;
            }

            if (vm.newPassword.length < 6) {
                vm.auth.message = "Password most be longer than that";
                vm.auth.hasErrors = true;
                return;
            }

            if (vm.newPassword === vm.oldPassword) {
                vm.auth.message = "New password is the same as the old one!";
                vm.auth.hasErrors = true;
                return;
            }

            credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, vm.oldPassword);

            firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function () {
                firebase.auth().currentUser.updatePassword(vm.newPassword).then(function () {
                    vm.auth.message = 'Password changed successfully';
                    vm.auth.hasErrors = false;
                }).catch(function (error) {
                    vm.auth.message = 'Failed to change password, try again later';
                    vm.auth.hasErrors = true;
                    console.log(error);
                });
            }).catch(function (error) {
                vm.auth.message = 'The old password is wrong, check again!';
                vm.auth.hasErrors = true;
                console.log(error);
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
                    this.auth.userName = "";
                    this.auth.type = "";
                    this.auth.message = 'User signed out Successfully';
                    this.auth.hasErrors = false;
                }.bind(this), function (error) {
                    this.auth.message = 'Failed to signout user, try again later';
                    this.auth.hasErrors = true;
                    console.log(error);
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
                    if (user.emailVerified) {
                        console.log('Email is verified');
                        userId = user.email.split(".").join(" ");

                        firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
                            app.auth.type = snapshot.val() && snapshot.val().type;
                            firebase.database().ref(app.auth.type.toLowerCase() + "s/" + userId + "/name").once('value').then(function (snapshot2) {
                                app.auth.userName = snapshot2.val();
                            });
                        });
                    }
                    else {
                        console.log('Email is not verified');
                        if (!this.sent) {
                            user.sendEmailVerification();
                            this.sent = true;
                        }
                    }
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
    // }, 0);
}, 1500);