import axios from 'axios';
import { db } from '../../firebase-config';
import data from '../data/data.json';

const url = 'https://hfzn51rqf2.execute-api.eu-west-1.amazonaws.com/Prod/bankid';

export default {
    async signInWithBankID(ctx, params) {
        let fetchedUrl = await axios.post(url, params);
        return fetchedUrl;
    },
    async checkStatus(ctx, status) {
        let fetchedStatus = await axios.post(url, status);
        return fetchedStatus;
    },
    async getUserData({ commit }, personalNr) {
        let doc = await db.collection("pensiondata").doc(`${personalNr}`).get();
        commit('setUserData', doc.data());
        commit('setTotal', calcTotal( doc.data() ))
        return doc;
    },
    async updateUserData({ state }, data) {
        var batch = db.batch();
            
        let ref = db.collection("pensiondata").doc(state.personalNr);

        ref.get().then(() => {
            batch.update(ref, data);
            batch.commit();
        })
    }
}

function calcTotal(doc){
    const reducer = (accumulator, currentValue) => accumulator.value + currentValue.value;
    let pension = data[0].pension.reduce(reducer);

    let arr = [];

    doc.choices.forEach(item => {
        arr.push(Number(item.value));
    })

    let income = arr.reduce((acc, obj) => acc + Number(obj), 0);
    
    return Number(pension + income);
}
