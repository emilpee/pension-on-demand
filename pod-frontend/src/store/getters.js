import data from '../data/data.json';

export default {
    getTotalAssets(state) {
        return data.filter(asset => {
            let total;

            asset.holdings.forEach(item => {
                total = state.totalAssets += Number(item.assets.value);
           })

           asset.pension.forEach(item => {
               total = state.totalAssets += Number(item.value);
           })

           return total;
        })
    },
    getTotalDebts(state) {
        return data.filter(asset => {
            asset.holdings.forEach(item => {
            let total = state.totalDebts += Number(item.debts.value);
            return total;
           })
        })
    },
}