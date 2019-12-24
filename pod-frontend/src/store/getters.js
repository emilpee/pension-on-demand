import data from '../data/data.json';

let jsonData = data[0];

export default {
    getTotalDebts: state => {

        let total;

        jsonData.debts.forEach(item => total = state.totalDebts += Number(item.value));
        state.totalDebts = total;

        return state.totalDebts;
     
    },
    filterTypes: state => {
        return state.choices.map(choice => choice.type);
    },
    getPensionValues: state => {
        return state.userData.pension.map(val => val.value);
    }
}