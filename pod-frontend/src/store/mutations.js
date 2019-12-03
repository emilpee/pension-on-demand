export default {
    hasSignedIn(state, signedIn) {
        state.signedIn = signedIn;
    },
    updateUser(state, user) {
        state.user = user;
    }
}