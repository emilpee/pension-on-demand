export default {
    hasSignedIn(state, signedIn) {
        state.signedIn = signedIn;
    },
    setUser(state, user) {
        state.user = user;
    },
    setGoal(state, goal) {
        state.wantedPension = goal;
    }
}