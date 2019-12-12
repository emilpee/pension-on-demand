import data from '../data/data.json';

export default {
    getTotalDebts(state) {
        return data.map(asset => {
            let total;

            asset.debts.forEach(item => total = state.totalDebts += Number(item.value));
            state.totalDebts = total;

            return state.totalDebts;
        })
    }, 
    getSettingItems(state) {
        let arr = []; 
        let items = data[0].settingsData;
        items.forEach(item => {
            arr.push(item.choices);
            console.log(item.choices);
        })
        state.settingItems = arr;
        return state.settingItems;
    }
}