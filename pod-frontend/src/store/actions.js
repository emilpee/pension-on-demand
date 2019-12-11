import axios from 'axios';
import { db } from '../../firebase-config';

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
        return doc;
    },
    async updateUserData({ state }, data) {
        let doc = await db.collection("pensiondata").doc(state.personalNr);
        doc.set(data);
        console.log(doc);
        console.log(data);
    }
}