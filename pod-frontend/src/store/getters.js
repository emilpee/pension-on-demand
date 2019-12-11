import data from '../data/data.json';

export default {

    /*
    getTotalAssets(state){
        
        const reducer = (accumulator, currentValue) => accumulator.value + currentValue.value;
        let pension = data[0].pension.reduce(reducer);

        // TODO - blir undefined
        
        let income = state.userData.income.reduce((acc, obj) => acc + obj.value, 0);
        console.log(income);
        
        let merge = Number(pension + income);
        
        return merge;
        
    },
    */
    getTotalDebts(state) {
        return data.map(asset => {
            let total;

            asset.holdings.forEach(item => total = state.totalDebts += Number(item.debts.value));
            state.totalDebts = total;

            return state.totalDebts;
        })
    }
}