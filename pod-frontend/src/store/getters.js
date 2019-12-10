import data from '../data/data.json';

export default {
    getTotalAssets(state) {
        return data.map(asset => {
            var total;

            console.log(asset)

            asset.holdings.forEach(item => total = state.totalAssets += Number(item.assets.value));
            asset.pension.forEach(item => total = state.totalAssets += Number(item.value));

            state.totalAssets = total;

            return state.totalAssets;
        })
    },
    getTotalDebts(state) {
        return data.map(asset => {

            let total;
            
            asset.holdings.forEach(item => total = state.totalDebts += Number(item.debts.value));
            state.totalDebts = total;

            return state.totalDebts;
        })
    }
}