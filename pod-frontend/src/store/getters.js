import data from '../data/data.json';

export default {
    getTotalAssets(state) {
        data.map(asset => {
            var total;

            console.log(asset)

            asset.holdings.forEach(item => total = state.totalAssets += Number(item.assets.value));
            asset.pension.forEach(item => total = state.totalAssets += Number(item.value));
            console.log(total);
       
            return total;
        })
    },
    getTotalDebts(state) {
        data.map(asset => {
            let total;
            asset.holdings.forEach(item => total = state.totalDebts += Number(item.debts.value));
            return total;
        })
    }
}