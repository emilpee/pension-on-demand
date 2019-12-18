export default {
    hasSignedIn(state, signedIn) {
        state.signedIn = signedIn;
    },
    setUser(state, user) {
        state.user = user;
    },
    setPrivateSavings(state, savings) {
        state.privateSavings = savings;
    }, 
    setPensionAge(state, age) {
        state.pensionAge = age;
    },
    setRisk(state, risk) {
        state.risk = risk;
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
    },
    setSalary(state, salary) {
        state.salary = salary;
    },
    setSettingItems(state, payload) {
        state.settingItems = payload;
    },
    setUserAge(state, age) {
        state.userAge = age;
    }
}