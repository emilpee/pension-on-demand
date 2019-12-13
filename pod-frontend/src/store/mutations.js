export default {
    hasSignedIn(state, signedIn) {
        state.signedIn = signedIn;
    },
    setUser(state, user) {
        state.user = user;
    },
    setGoal(state, goal) {
        state.wantedPension = goal;
    }, 
    setPensionData(state, data) {
        state.pensionData = data;
    },
    setUserData(state, data) {
        state.userData = data;
    },
    setPersonalNr(state, payload) {
        state.personalNr = payload;
    },
    setTotal(state, payload){
        state.totalAssets = payload
    },
    setChoices(state, choices) {
        state.choices = choices;
    }
}